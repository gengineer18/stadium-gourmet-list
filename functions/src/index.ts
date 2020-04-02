const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
const db = admin.firestore()

const userRef = db.collection('users')
const clubRef = db.collection('clubs')
const postColGroup = db.collectionGroup('posts')

exports.updateUserName = functions
  .region('asia-northeast1')
  .firestore
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

exports.deleteUser = functions
  .region('asia-northeast1')
  .auth
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

exports.createClubPost = functions
  .region('asia-northeast1')
  .firestore
  .document('users/{userId}/posts/{postId}')
  .onCreate(async (snap: any, context: any) => {
    const clubId = snap.data().club.id
    const userId = snap.data().user.id
    const userSnapshot = await userRef.doc(userId).collection('clubs').doc(clubId).get()
    const userData = userSnapshot.data()
    const userPostCount = userData ? userData.count + 1 : 1
    userRef.doc(userId).collection('clubs').doc(clubId).set({ count: userPostCount }, { merge: true })

    const clubSnapshot = await clubRef.doc(clubId).get()
    const clubData = clubSnapshot.data()
    const clubPostCount = clubData ? clubData.count + 1 : 1
    clubRef.doc(clubId).set({ count: clubPostCount }, { merge: true })
    return 0
  });
