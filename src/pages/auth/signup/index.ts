import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Link from '../../../components/Link';
import template from './signup.hbs';
import SubmitPage from '../../../utils/validation/SubmitPage';
import Validation from '../../../utils/validation/Validation';
import * as rootStyles from '../../../styles/root.module.scss';
import * as authStyles from '../styles.module.scss';
import * as styles from './styles.module.scss';
import Router from '../../../utils/Router';
import { SignUpData } from '../../../api/AuthAPI';
import AuthController from '../../../controllers/AuthController';

export default class SignUpPage extends SubmitPage {
    router: Router;

    constructor() {
        super((formData) => {
            const data = {
                email: formData.get('email') as string,
                login: formData.get('login') as string,
                first_name: formData.get('first_name') as string,
                second_name: formData.get('second_name') as string,
                phone: formData.get('phone') as string,
                password: formData.get('password') as string,
            }
            AuthController.signup(data as SignUpData);
        }, 'SignUp');
        this.router = new Router('#app');
    }

    init() {
        this.children.emailInput = new Input({
            value: '',
            type: 'text',
            name: 'email',
            placeholder: 'Почта',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    ;
                    (this.children.emailInput as Input).removeError();
                },
                blur: () => {
                    
                    Validation.isEmail(this.children.emailInput as Input);
                },
            },
        });

        this.children.loginInput = new Input({
            value: '',
            type: 'text',
            name: 'login',
            placeholder: 'Логин',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    ;
                    (this.children.loginInput as Input).removeError();
                },
                blur: () => {
                    
                    Validation.isEmptyInput(this.children.loginInput as Input);
                },
            },
        });

        this.children.firstNameInput = new Input({
            value: '',
            type: 'text',
            name: 'first_name',
            placeholder: 'Имя',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    ;
                    (this.children.firstNameInput as Input).removeError();
                },
                blur: () => {
                    
                    Validation.isEmptyInput(this.children.firstNameInput as Input);
                },
            },
        });

        this.children.secondNameInput = new Input({
            value: '',
            type: 'text',
            name: 'second_name',
            placeholder: 'Фамилия',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    ;
                    (this.children.secondNameInput as Input).removeError();
                },
                blur: () => {
                    
                    Validation.isEmptyInput(this.children.secondNameInput as Input);
                },
            },
        });

        this.children.phoneInput = new Input({
            value: '',
            type: 'text',
            name: 'phone',
            placeholder: 'Телефон',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    ;
                    (this.children.phoneInput as Input).removeError();
                },
                blur: () => {
                    
                    Validation.isPhone(this.children.phoneInput as Input);
                },
            },
        });

        this.children.passwordInput = new Input({
            value: '',
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    ;
                    (this.children.passwordInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.passwordInput as Input);
                    // Validation.checkFirstPassword(this.children.passwordInput as Input, this.children.passwordRepeatInput as Input);
                },
            },
        });

        this.children.passwordRepeatInput = new Input({
            value: '',
            type: 'password',
            name: 'password_repeat',
            placeholder: 'Пароль (еще раз)',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    ;
                    (this.children.passwordRepeatInput as Input).removeError();
                },
                blur: () => {
                    
                    Validation.checkTwoPassword(this.children.passwordInput as Input, this.children.passwordRepeatInput as Input);
                },
            },
        });

        this.children.registrationButton = new Button({
            text: 'Зарегистрироваться',
            type: 'submit',
        });

        this.children.registrationLink = new Link({
            text: 'Войти',
            events: {
                click: () => {
                    this.router.go('/signin')
                },
            },
        });

        this.props.checkInput = [
            this.children.emailInput,
            this.children.loginInput,
            this.children.firstNameInput,
            this.children.secondNameInput,
            this.children.phoneInput,
            this.children.passwordInput,
            this.children.passwordRepeatInput,
        ];
    }

    render() {
        return this.compile(template, {
            ...this.props, rootStyles, styles, authStyles,
        });
    }
}
