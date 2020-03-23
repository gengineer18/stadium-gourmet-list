const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
const db = admin.firestore()

const postRef = db.collection('posts')
const userRef = db.collection('users')
const clubRef = db.collection('clubs')
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
    let batch = db.batch();
    const snapshots = await postColGroup.where('user.id', '==', `${afterCredential.userId}`).get()
    await snapshots.docs.map((doc: any, index: any) => {
      //500件毎にcommitしてbatchインスタンスを初期化
      if ((index + 1) % 500 === 0) {
        batch.commit(); //新しいインスタンス
        batch = db.batch(); //新たにインスタンスを生成。
      }
      console.info('document ID:',doc.id)
      batch.update(doc.ref, { 'user.name': afterCredential.displayName })
    })
    // 最終コミット
    await batch.commit()
    return 0
  });
