import Block from "../../../utils/Block"
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import template from "./signup.hbs"
import styles from "../styles.module.scss"
import rootStyles from "../../../styles/root.module.scss"


export class SignUpPage extends Block {
    constructor() {
        super({});
    }

    init() {
        this.children.emailInput = new Input({
            type: "text",
            name: "email",
            placeholder: "Почта",
            validationError: false,
            validationErrorMessage: '',
        });
        this.children.loginInput = new Input({
            type: "text",
            name: "login",
            placeholder: "Логин",
            validationError: false,
            validationErrorMessage: '',
        });
        this.children.firstNameInput = new Input({
            type: "text",
            name: "first_name",
            placeholder: "Имя",
            validationError: false,
            validationErrorMessage: '',
        });
        this.children.secondNameInput = new Input({
            type: "text",
            name: "second_name",
            placeholder: "Фамилия",
            validationError: false,
            validationErrorMessage: '',
        });
        this.children.phoneInput = new Input({
            type: "text",
            name: "phone",
            placeholder: "Телефон",
            validationError: false,
            validationErrorMessage: '',
        });
        this.children.passwordInput = new Input({
            type: "password",
            name: "password",
            placeholder: "Пароль",
            validationError: false,
            validationErrorMessage: '',
        });
        this.children.passworRepeatdInput = new Input({
            type: "password",
            name: "password",
            placeholder: "Пароль (еще раз)",
            validationError: false,
            validationErrorMessage: '',
        });
        this.children.registrationButton = new Button({
            text: "Зарегистрироваться",
            type: "submit",
            events: {
                click: (e) => this.onSubmit(e),
            },
        });
    }

    validateEmail() {
        let email = (this.children.emailInput as Input).getValue();
        if (email == null || email.length == 0) {
            (this.children.emailInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Email"' });
        } else if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            return true;
        } else {
            (this.children.emailInput as Input).setProps({ validationError: true, validationErrorMessage: 'Неверный формат электронной почты' });
        }
    }

    validateLogin() {
        let login = (this.children.loginInput as Input).getValue();
        if (login == null || login.length == 0) {
            (this.children.loginInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Логин"' });
        } else {
            return true;
        }
    }

    validateName() {
        let name = (this.children.firstNameInput as Input).getValue();
        if (name == null || name.length == 0) {
            (this.children.firstNameInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Имя"' });
        } else {
            (this.children.firstNameInput as Input).setValue(name[0].toUpperCase() + name.substring(1, name.length));
            return true
        }
    }

    validateSurname() {
        let name = (this.children.firstNameInput as Input).getValue();
        if (name == null || name.length == 0) {
            (this.children.firstNameInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Имя"' });
        } else {
            (this.children.firstNameInput as Input).setValue(name[0].toUpperCase() + name.substring(1, name.length));
            return true
        }
    }

    onSubmit(e: SubmitEvent) {
        e.preventDefault();
        this.validateEmail();
        this.validateLogin();
        this.validateName();
    }

    render() {
        return this.compile(template, { styles, rootStyles });
    }
}
