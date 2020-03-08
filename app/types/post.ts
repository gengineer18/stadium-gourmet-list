export type NewPost = {
  gourmet: string,
  club: Club,
  shop: string,
  comment: string,
  date: Date | null,
  postImage: Image,
  imagePath: string,
  user: {
    id: string
    name: string
  }
}

export type PostData = {
  gourmet: string,
  club: Club,
  shop: string,
  comment: string,
  date: Date | null
  imagePath: string,
  user: {
    id: string
    name: string
  }
}

export type CompletePost = {
  docRefId: string,
  gourmet: string,
  clubId: string,
  clubName: string,
  shop: string,
  comment: string,
  date: string,
  imagePath: string
  userName: string
  color1: string
  color2: string
  color3: string
}

export type Club = {
  id: string,
  name: string
}

export type Image = {
  path: string
  width: number
  height: number
}
