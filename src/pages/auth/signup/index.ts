import Block from "../../../utils/Block"
import { Input } from "../../../components/Input"
import template from "./signup.hbs"
import { Button } from "../../../components/Button";


export class SignUpPage extends Block {
    constructor() {
        super({});
    }

    init() {
        this.children.emailInput = new Input({
            type: "text",
            name: "email",
            placeholder: "Почта",
        });
        this.children.loginInput = new Input({
            type: "text",
            name: "login",
            placeholder: "Логин",
        });
        this.children.firstNameInput = new Input({
            type: "text",
            name: "first_name",
            placeholder: "Имя",
        });
        this.children.secondNameInput = new Input({
            type: "text",
            name: "second_name",
            placeholder: "Фамилия",
        });
        this.children.phoneInput = new Input({
            type: "text",
            name: "phone",
            placeholder: "Телефон",
        });
        this.children.passwordInput = new Input({
            type: "password",
            name: "password",
            placeholder: "Пароль",
        });
        this.children.passworRepeatdInput = new Input({
            type: "password",
            name: "password",
            placeholder: "Пароль (еще раз)",
            validationError: true,
            validationErrorMessage: 'Пароли не совпадают',
        });
    }

    render() {
        return this.compile(template, {});
    }
}
