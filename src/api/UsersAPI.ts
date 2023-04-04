import BaseAPI from "./BaseAPI";

export interface UsersProfileData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    phone: string,
}

export interface UsersProfilePassword {
    oldPassword: string,
    newPassword: string,
}

export class UsersAPI extends BaseAPI {
    constructor() {
        super('/user')
    }

    changeInfo(data: UsersProfileData) {
        return this.http.put('/profile', data);
    }

    changePassword(data: UsersProfilePassword) {
        return this.http.put('/password', data);
    }

    changeAvatar(data: FormData) {
        return this.http.put('/profile/avatar', data);
    }

    read = undefined;
    update = undefined;
    create = undefined;
    delete = undefined;
}

export default new UsersAPI();
