export class ChangeInfoData {
    email: string | undefined;

    login: string | undefined;

    first_name: string | undefined;

    second_name: string | undefined;

    chatName: string | undefined;

    phone: string | undefined;

    constructor(data: FormData) {
        this.email = data.get('email') as string;
        this.login = data.get('login') as string;
        this.first_name = data.get('first_name') as string;
        this.second_name = data.get('second_name') as string;
        this.chatName = data.get('display_name') as string;
        this.phone = data.get('phone') as string;
    }
}

export default ChangeInfoData;
