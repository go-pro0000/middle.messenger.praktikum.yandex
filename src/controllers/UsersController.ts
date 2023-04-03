import API, { UsersAPI, UsersProfileData } from "../api/UsersAPI"
import Router from "../utils/Router"
import store from '../utils/Store'


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
}

export default new UsersController();
