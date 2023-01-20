declare global {
  export type Nullable<T> = T | null

  export type Keys<T extends Record<string, unknown>> = keyof T
  export type Values<T extends Record<string, unknown>> = T[Keys<T>]

  export type AppState = {
    appIsInited: boolean
    screen: Screens | null
    isLoading: boolean
    loginFormError: string | null
    registerFormError: string | null
    profileFormError: string | null
    changePasswordFormError: string | null
    user: User | null
    chats: [],
    users: [],
    messages: []
  };

  export type User = {
    id: number
    login: string
    first_name: string
    second_name: string
    display_name: string
    avatar: string
    phone: string
    email: string
  };
}

export {}
