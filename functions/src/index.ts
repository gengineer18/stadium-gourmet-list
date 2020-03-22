const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
var db = admin.firestore()

exports.updateUserName = functions.firestore
  .document('users/{userId}/credentials/{credentialId}')
  .onUpdate((change: any, context: any) => {
    const afterCredential = change.after.data();
    const beforeCredential = change.before.data();
    if (afterCredential.displayName === beforeCredential.displayName) return 0;
    const postRef = db.collection('posts')
    postRef.where('user.id', '==', `${afterCredential.userId}`)
      .get()
      .then(function (querySnapshot: any) {
        querySnapshot.forEach(function (doc: any) {
          console.info('docId', doc.id)
          postRef.doc(doc.id).set({ user: { name: afterCredential.displayName }}, { merge: true })
        })
      })
      .catch ((error: any) => {
        console.error('error', error)
      })
    return 0
  });
