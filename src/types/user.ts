export type UserCreateRequest = {
  username: string, 
  password: string
}

export type UserUpdateRequest = {
  nickname: string, 
  gender: "MALE" | "FEMALE" | "UNKNOWN"
}