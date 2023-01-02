export interface IUser {
    _id: string
    login: string,
    password: string,
    activationLink: string,
    passwordResetCode: string,
    isActivated: boolean,
    refreshToken: string,
    avatar: string,
    status: string,
    frends: [
      string
    ],
    dialogs: [
      string
    ]
}

export interface IUserList {
    users: IUser[]
}