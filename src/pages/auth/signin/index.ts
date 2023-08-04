import Input from '../../../components/Input';
import Button from '../../../components/Button';
import template from './signin.hbs';
import SubmitPage from '../../../utils/validation/SubmitPage';
import Validation from '../../../utils/validation/Validation';
import rootStyles from '../../../styles/root.module.scss';
import authStyles from '../styles.module.scss';
import styles from './styles.module.scss';
import Link from '../../../components/Link';
import Router from '../../../utils/Router';
import { SignInData } from '../../../api/AuthAPI';
import AuthController from '../../../controllers/AuthController';

export default class SignInPage extends SubmitPage {
    router: Router;

    constructor() {
        super((formData) => {
            const data = {
                login: formData.get('login') as string,
                password: formData.get('password') as string,
            };
            AuthController.signin(data as SignInData);
        }, 'SignInPage');
        this.router = new Router('#app');
    }

    init() {
        this.children.loginInput = new Input({
            value: '',
            type: 'text',
            name: 'login',
            placeholder: 'Логин',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    (this.children.loginInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.loginInput as Input);
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
                    (this.children.passwordInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.passwordInput as Input);
                },
            },
        });

        this.children.registrationButton = new Button({
            text: 'Авторизироваться',
            type: 'submit',
        });

        this.children.registrationLink = new Link({
            text: 'Нет аккаунта?',
            events: {
                click: () => {
                    this.router.go('/sign-up');
                },
            },
        });

        this.props.checkInput = [
            this.children.loginInput,
            this.children.passwordInput,
        ];
    }

    render() {
        return this.compile(template, {
            ...this.props, rootStyles, styles, authStyles,
        });
    }
}
