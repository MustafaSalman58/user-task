export class UserData{
    constructor(
        public email: string,
        public password: string,
        public name?: string,
        public address?: string,
        public tel?: string,
        public gender?: string,
        public userId?: string        
        ){}
}