
type IUserRequest = {
    id: number,
    email: string
}

declare namespace Express {
    export interface Request {
        user?: IUserRequest
    }
 }