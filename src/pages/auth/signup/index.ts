import Block from "../../../utils/Block"
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import template from "./signup.hbs"
import rootStyles from "../../../styles/root.module.scss"
import authStyles from "../styles.module.scss"
import styles from "./styles.module.scss"


export class SignUpPage extends Block {
    constructor() {
        super({});
    }

    data: {
        email: string,
        login: string,
        name: string,
        surname: string,
        phone: string,
        password: string,
        passwordRepeat: string,
    } = {}

    validators = ['validateEmail', 'validateLogin', 'validateName', 'validateSurname', 'validatePhone', 'validatePassword', 'validatePasswordRepeat']

    init() {
        this.children.emailInput = new Input({
            type: "text",
            name: "email",
            placeholder: "Почта",
            validationError: false,
            validationErrorMessage: '',
            events: {
                click: () => this.deleteValidationErrorMessage("email"),
            },
        });
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
        this.children.firstNameInput = new Input({
            type: "text",
            name: "first_name",
            placeholder: "Имя",
            validationError: false,
            validationErrorMessage: '',
            events: {
                click: () => this.deleteValidationErrorMessage("firstName"),
            },
        });
        this.children.secondNameInput = new Input({
            type: "text",
            name: "second_name",
            placeholder: "Фамилия",
            validationError: false,
            validationErrorMessage: '',
            events: {
                click: () => this.deleteValidationErrorMessage("secondName"),
            },
        });
        this.children.phoneInput = new Input({
            type: "text",
            name: "phone",
            placeholder: "Телефон",
            validationError: false,
            validationErrorMessage: '',
            events: {
                click: () => this.deleteValidationErrorMessage("phone"),
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
        this.children.passwordRepeatInput = new Input({
            type: "password",
            name: "password",
            placeholder: "Пароль (еще раз)",
            validationError: false,
            validationErrorMessage: '',
            events: {
                click: () => this.deleteValidationErrorMessage("passwordRepeat"),
            },
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
            this.data.email = email;
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
            this.data.login = login;
            return true;
        }
    }

    validateName() {
        let name = (this.children.firstNameInput as Input).getValue();
        if (name == null || name.length == 0) {
            (this.children.firstNameInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Имя"' });
        } else {
            (this.children.firstNameInput as Input).setValue(name[0].toUpperCase() + name.substring(1, name.length));
            this.data.name = name;
            return true
        }
    }

    validateSurname() {
        let surname = (this.children.secondNameInput as Input).getValue();
        if (surname == null || surname.length == 0) {
            (this.children.secondNameInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Фамилия"' });
        } else {
            (this.children.secondNameInput as Input).setValue(surname[0].toUpperCase() + surname.substring(1, surname.length));
            this.data.surname = surname;
            return true
        }
    }

    validatePhone() {
        let phone = (this.children.phoneInput as Input).getValue();
        if (phone == null || phone.length == 0) {
            (this.children.phoneInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Телефон"' });
        }
        else if (phone.length != 18) {
            (this.children.phoneInput as Input).setValue(phone.substring(0, 18));
        }
        if (phone.match(
            /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g
        )) {
            this.data.phone = phone;
            return true;
        } else {
            (this.children.phoneInput as Input).setProps({ validationError: true, validationErrorMessage: 'Неверный формат телефона' });
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

    validatePasswordRepeat() {
        let password = (this.children.passwordInput as Input).getValue();
        let passwordRepeat = (this.children.passwordRepeatInput as Input).getValue();
        if (passwordRepeat == null || passwordRepeat.length == 0) {
            (this.children.passwordRepeatInput as Input).setProps({ validationError: true, validationErrorMessage: 'Заполните поле "Пароль еще раз"' });
        } else if (passwordRepeat != password) {
            (this.children.passwordRepeatInput as Input).setProps({ validationError: true, validationErrorMessage: 'Пароли не совпадают' });
        } else {
            this.data.passwordRepeat = passwordRepeat;
            return true;
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
}
