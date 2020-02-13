export type newPost = {
  gourmet: string,
  team: string,
  shop: string,
  comment: string,
  date: Date | null,
  file: File | null,
  docRefId: string
}

export type completePost = {
  gourmet: string,
  teamName: string,
  shop: string,
  comment: string,
  date: string,
}
