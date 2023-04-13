import API, { UsersAPI, UsersProfileData, UsersProfilePassword } from '../api/UsersAPI';
import Router from '../utils/Router';

export class UsersController {
    private readonly api: UsersAPI;

    router: Router;

    constructor() {
        this.api = API;
        this.router = new Router('#app');
    }

    async changeInfo(data: UsersProfileData) {
        try {
            await this.api.changeInfo(data);
        } catch (e: any) {
            console.error(e);
        }
    }

    async changePassword(data: UsersProfilePassword) {
        try {
            await this.api.changePassword(data);

            this.router.go('/profile');
        } catch (e: any) {
            console.error(e);
        }
    }

    async changeAvatar(data: FormData) {
        try {
            await this.api.changeAvatar(data);
            console.log(data);

            this.router.go('/profile');
        } catch (e: any) {
            console.error(e);
        }
    }
}

export default new UsersController();
