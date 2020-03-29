const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
const db = admin.firestore()

const userRef = db.collection('users')
const postColGroup = db.collectionGroup('posts')

exports.updateUserName = functions.firestore
  .document('users/{userId}/credentials/{credentialId}')
  .onUpdate(async (change: any, context: any) => {
    const afterCredential = change.after.data();
    const beforeCredential = change.before.data();
    if (afterCredential.displayName === beforeCredential.displayName) {
      console.info('no change:', afterCredential.userId)
      return 0;
    }
    let batch = db.batch()
    const snapshots = await postColGroup.where('user.id', '==', `${afterCredential.userId}`).get()
    await snapshots.docs.map((doc: any, index: any) => {
      //500件毎にcommitしてbatchインスタンスを初期化
      if ((index + 1) % 500 === 0) {
        batch.commit() //新しいインスタンス
        batch = db.batch() //新たにインスタンスを生成。
      }
      console.info('document ID:',doc.id)
      batch.update(doc.ref, { 'user.name': afterCredential.displayName })
    })
    // 最終コミット
    await batch.commit()
    return 0
  });

exports.deleteUser = functions.auth
  .user()
  .onDelete(async (userRecord: any, _context: any) => {
    console.log(`user ${userRecord.uid} deleted.`)
    userRef.doc(userRecord.uid).collection('credentials').doc(userRecord.uid).set({ isDeleted: true }, { merge: true })
    let batch = db.batch()
    const snapshots = await postColGroup.where('user.id', '==', `${userRecord.uid}`).get()
    await snapshots.docs.map((doc: any, index: any) => {
      //500件毎にcommitしてbatchインスタンスを初期化
      if ((index + 1) % 500 === 0) {
        batch.commit() //新しいインスタンス
        batch = db.batch() //新たにインスタンスを生成。
      }
      console.info('document ID:',doc.id)
      batch.update(doc.ref, { isDeleted: true, 'user.isDeleted': true })
    })
    // 最終コミット
    await batch.commit()
    return 0
  });
