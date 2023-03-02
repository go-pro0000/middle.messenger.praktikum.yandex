import Block from "../../../utils/Block"
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import template from "./signin.hbs"
import rootStyles from "../../../styles/root.module.scss"
import authStyles from "../styles.module.scss"
import styles from "./styles.module.scss"


export class SignInPage extends Block {
    constructor() {
        super({});
    }

    data: {
        login: string,
        password: string,
    } = {}

    validators = ['validateLogin', 'validatePassword']

    init() {
        this.children.loginInput = new Input({
            type: "text",
            name: "login",
            placeholder: "Логин",
            validationError: false,
            validationErrorMessage: '',
            events: {
                click: () => this.deleteValidationErrorMessage("login"),
            },
        });
        this.children.passwordInput = new Input({
            type: "password",
            name: "password",
            placeholder: "Пароль",
            validationError: false,
            validationErrorMessage: '',
            events: {
                click: () => this.deleteValidationErrorMessage("password"),
            },
        });
        this.children.registrationButton = new Button({
            text: "Авторизоваться",
            type: "submit",
            events: {
                click: (e) => this.onSubmit(e),
            },
        });
    }

    validateLogin() {
        let login = (this.children.loginInput as Input).getValue();
        if (login == null || login.length == 0) {
            (this.children.loginInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Логин"' });
        } else {
            this.data.login = login;
            return true;
        }
    }

    //Пароль должен быть не менее 8 символов, содержать только латинские буквы, цифры и не менее одной заглавной буквы!
    validatePassword() {
        let password = (this.children.passwordInput as Input).getValue();
        if (password == null || password.length == 0) {
            (this.children.passwordInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Пароль"' });
        } else if ((password.length > 7) && (password.match(/\d/)) && (password.match(/[A-Z]/)) && (password.match(/[A-z]/))) {
            this.data.password = password;
            return true;
        } else {
            (this.children.passwordInput as Input).setProps({ validationError: true, validationErrorMessage: 'Неверный формат пароля' });
        }
    }

    deleteValidationErrorMessage(name: string) {
        if ((this.children[name + 'Input'] as Input).getProps().validationError) {
            (this.children[name + 'Input'] as Input).setProps({ validationError: false });
        }
    }

    onSubmit(e: SubmitEvent) {
        e.preventDefault();

        let sendForm = true;
        this.validators.forEach(item => {
            if (!this[item]()) {
                sendForm = false;
            }
        });

        if (sendForm) {
            console.log(this.data);
        }
    }

    render() {
        return this.compile(template, { rootStyles, styles, authStyles });
    }

    test() {
        console.log("work");
    }
}
