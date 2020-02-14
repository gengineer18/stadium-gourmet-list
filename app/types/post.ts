export type NewPost = {
  gourmet: string,
  club: Club,
  shop: string,
  comment: string,
  date: Date | null,
  file: File | null,
  docRefId: string
}

export type CompletePost = {
  gourmet: string,
  teamName: string,
  shop: string,
  comment: string,
  date: string,
}

export type Club = {
  id: string,
  name: string
}
