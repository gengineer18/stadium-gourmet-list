const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
const db = admin.firestore()

const postRef = db.collection('posts')
const userRef = db.collection('users')

exports.updateUserName = functions.firestore
  .document('users/{userId}/credentials/{credentialId}')
  .onUpdate((change: any, context: any) => {
    const afterCredential = change.after.data();
    const beforeCredential = change.before.data();
    if (afterCredential.displayName === beforeCredential.displayName) return 0;
    // post
    postRef.where('user.id', '==', `${afterCredential.userId}`)
      .get()
      .then(function (querySnapshot: any) {
        querySnapshot.forEach(function (doc: any) {
          console.info('postdocId', doc.id)
          postRef.doc(doc.id).set({ user: { name: afterCredential.displayName }}, { merge: true })
        })
      })
      .catch ((error: any) => {
        console.error('error', error)
      })
    // user
    userRef.doc(afterCredential.userId).collection('posts').where('user.id', '==', `${afterCredential.userId}`)
      .get()
      .then(function (querySnapshot: any) {
        querySnapshot.forEach(function (doc: any) {
          console.info('userdocId', doc.id)
          userRef.doc(afterCredential.userId).collection('posts').doc(doc.id).set({ user: { name: afterCredential.displayName }}, { merge: true })
        })
      })
      .catch ((error: any) => {
        console.error('error', error)
      })
    return 0
  });
