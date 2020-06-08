import { ToastProgrammatic as Toast } from 'buefy'

export const defaultImagePath = 'https://firebasestorage.googleapis.com/v0/b/stadium-gourmet-list.appspot.com/o/assets%2Fdefault-photo.png?alt=media&token=4e9d7eab-2f73-4472-8f9e-404db32a18e4'

export const guestUserImagePath = 'https://firebasestorage.googleapis.com/v0/b/stadium-gourmet-list.appspot.com/o/assets%2FGuestUser.png?alt=media&token=312760c5-b572-478d-b2e8-2e8d777b7d46'

export const toastSuccess = (message: string) => {
  Toast.open({
    message,
    type: 'is-success'
  })
}

export const toastFail = (message: string) => {
  Toast.open({
    message,
    type: 'is-danger'
  })
}
