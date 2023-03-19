import API, { AuthAPI, SigninData } from "../AuthAPI";
import router from "../../utils/Router";


export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    async signin(data: SigninData) {
        // try {
        //     await this.api.signin(data);


        // } catch () {
            
        // }
    }
}
