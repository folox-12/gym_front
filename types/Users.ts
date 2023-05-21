export interface UserAsAuthor {
    id: number,
    name: string,
    surname: string,
    email: string,
}

export interface ProfileUser {
    name: string | null,
    surname: string | null,
    email: string,
}
export interface User extends UserAsAuthor {
    password?: string,
    isActivated?: boolean,
    is_activated?: boolean,
    activation_link: string,
}
