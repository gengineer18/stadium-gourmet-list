export default function ({ store, redirect, route }) {
  // /user/{28文字のuserId}/config
  const userId = route.path.substr(6, 28)
  if (store.state.user.uid !== userId) {
    redirect('/')
  }
}
