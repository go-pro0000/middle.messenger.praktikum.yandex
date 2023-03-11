import Input from '../../../components/Input';
import Button from '../../../components/Button';
import template from './signin.hbs';
import SubmitPage from '../../../utils/validation/SubmitPage';
import Validation from '../../../utils/validation/Validation';
import * as rootStyles from '../../../styles/root.module.scss';
import * as authStyles from '../styles.module.scss';
import * as styles from './styles.module.scss';
import SignInData from '../../../classes/SignInData';
import Link from '../../../components/Link';
import { renderDOM } from '../../../utils/renderDOM';

export default class SignInPage extends SubmitPage {
    constructor() {
        super((formData) => {
            const data: SignInData = new SignInData(formData);
            console.log(data);
        }, 'SignInPage');
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
                    renderDOM('signUp');
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
