import template from './profile.hbs';
import SubmitPage from '../../utils/validation/SubmitPage';
import ChangeInfoData from '../../classes/ChangeInfoData';
import Input from '../Input';
import Validation from '../../utils/validation/Validation';
import * as style from './style.module.scss';
import Button from '../Button';
import Field from '../field';

interface ProfileProps {
    changeData: boolean,
}

export default class Profile extends SubmitPage {
    constructor(props: ProfileProps) {
        super((formData) => {
            const data: ChangeInfoData = new ChangeInfoData(formData);
            console.log(data); props;
        });
    }

    init() {
        this.children.emailInput = new Input({
            value: '',
            type: 'text',
            name: 'email',
            placeholder: 'Почта',
            validationError: false,
            validationErrorMessage: '',
            // active: true,
            events: {
                focus: () => {
                    console.log('focus');
                    (this.children.emailInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
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
                    console.log('focus');
                    (this.children.loginInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
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
                    console.log('focus');
                    (this.children.firstNameInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
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
                    console.log('focus');
                    (this.children.secondNameInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
                    Validation.isEmptyInput(this.children.secondNameInput as Input);
                },
            },
        });

        this.children.displayNameInput = new Input({
            value: '',
            type: 'text',
            name: 'display_name',
            placeholder: 'Имя в чате',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    console.log('focus');
                    (this.children.displayNameInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
                    Validation.isEmptyInput(this.children.displayNameInput as Input);
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
                    console.log('focus');
                    (this.children.phoneInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
                    Validation.isPhone(this.children.phoneInput as Input);
                },
            },
        });

        this.children.oldPasswordInput = new Input({
            value: '',
            type: 'password',
            name: 'old_password',
            placeholder: 'Старый пароль',
            validationError: false,
            validationErrorMessage: '',
            hide: true,
            events: {
                focus: () => {
                    console.log('focus');
                    (this.children.oldPasswordInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
                    Validation.isEmptyInput(this.children.oldPasswordInput as Input);
                },
            },
        });

        this.children.passwordInput = new Input({
            value: '',
            type: 'password',
            name: 'password',
            placeholder: 'Новый пароль',
            validationError: false,
            validationErrorMessage: '',
            hide: true,
            events: {
                focus: () => {
                    console.log('focus');
                    (this.children.passwordInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
                    Validation.checkFirstPassword(this.children.passwordInput as Input, this.children.passwordRepeatInput as Input);
                },
            },
        });

        this.children.passwordRepeatInput = new Input({
            value: '',
            type: 'password',
            name: 'password_repeat',
            placeholder: 'Новый пароль (еще раз)',
            validationError: false,
            validationErrorMessage: '',
            hide: true,
            events: {
                focus: () => {
                    console.log('focus');
                    (this.children.passwordRepeatInput as Input).removeError();
                },
                blur: () => {
                    console.log('blur');
                    Validation.checkTwoPassword(this.children.passwordInput as Input, this.children.passwordRepeatInput as Input);
                },
            },
        });

        this.children.changeInfo = new Field({
            text: 'Изменить данные',
            events: {
                click: () => {
                    this.props.checkInput[0].props.hide = false;
                    this.props.checkInput[1].props.hide = false;
                    this.props.checkInput[2].props.hide = false;
                    this.props.checkInput[3].props.hide = false;
                    this.props.checkInput[4].props.hide = false;
                    this.props.checkInput[5].props.hide = false;

                    this.props.checkInput[6].props.hide = true;
                    this.props.checkInput[7].props.hide = true;
                    this.props.checkInput[8].props.hide = true;
                },
            },
        });

        this.children.changePassword = new Field({
            text: 'Изменить пароль',
            events: {
                click: () => {
                    this.props.checkInput[0].props.hide = true;
                    this.props.checkInput[1].props.hide = true;
                    this.props.checkInput[2].props.hide = true;
                    this.props.checkInput[3].props.hide = true;
                    this.props.checkInput[4].props.hide = true;
                    this.props.checkInput[5].props.hide = true;

                    this.props.checkInput[6].props.hide = false;
                    this.props.checkInput[7].props.hide = false;
                    this.props.checkInput[8].props.hide = false;
                },
            },
        });

        this.children.saveButton = new Button({
            type: 'submit',
            text: 'Сохранить',
        });

        this.props.checkInput = [
            this.children.emailInput,
            this.children.loginInput,
            this.children.firstNameInput,
            this.children.secondNameInput,
            this.children.displayNameInput,
            this.children.phoneInput,

            this.children.oldPasswordInput,
            this.children.passwordInput,
            this.children.passwordRepeatInput,
        ];
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
