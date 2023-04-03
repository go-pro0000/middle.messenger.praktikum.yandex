import BaseAPI from "./BaseAPI";

export interface UsersProfileData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    phone: string,
}

export class UsersAPI extends BaseAPI {
    constructor() {
        super('/user')
    }

    changeInfo(data: UsersProfileData) {
        return this.http.put('/profile', data);
    }

    read = undefined;
    update = undefined;
    create = undefined;
    delete = undefined;
}

export default new UsersAPI();
