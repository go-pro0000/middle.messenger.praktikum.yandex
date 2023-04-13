import template from './profile.hbs';
import * as style from './style.module.scss';
import Button from '../Button';
import Input from '../Input';
import Field from '../field';
import FileInput from '../FileInput';
import ButtonWithImage from '../../components/ButtonWithImage';
import store, { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import Validation from '../../utils/validation/Validation';
import Router from '../../utils/Router';
import backToImage from '../../../static/img/profilePage/backTo.svg';
import SubmitPage from '../../utils/validation/SubmitPage';
import UsersController from '../../controllers/UsersController';
import profileImage from '../../../static/img/profilePage/icon.svg';
import { UsersProfileData, UsersProfilePassword } from "../../api/UsersAPI"

export interface ProfileData {
    email?: string,
    login?: string,
    first_name?: string,
    second_name?: string,
    display_name?: string,
    phone?: string,
    oldPassword? : string,
    newPassword? : string,
}

class ProfileBase extends SubmitPage {
    router: Router;
    name: string = '';
    avatar: string = '';

    constructor(props: any) {
        super((formData) => {
            const data: ProfileData = {};
            if (!(this.children.emailInput as Input).props.hide) {
                data.email = formData.get('email') as string;
                data.login = formData.get('login') as string;
                data.first_name = formData.get('first_name') as string;
                data.second_name = formData.get('second_name') as string;
                data.display_name = formData.get('display_name') as string;
                data.phone = formData.get('phone') as string;

                UsersController.changeInfo(data as UsersProfileData);
            } else {
                data.oldPassword = formData.get('old_password') as string;
                data.newPassword = formData.get('password') as string;

                UsersController.changePassword(data as UsersProfilePassword);
            }
        }, 'profilePage');

        this.router = new Router("#app");
    }

    async init() {
        await AuthController.fetchUser();
        this.name = store.getState().user.first_name;
        this.avatar = store.getState().user.avatar;

        this.children.buttonWithImage = new ButtonWithImage({
            src: `${backToImage}`,
            events: {
                click: () => {
                    this.router.go('/')
                },
            },
        });

        this.children.emailInput = new Input({
            value: store.getState().user.email,
            type: 'text',
            name: 'email',
            placeholder: 'Почта',
            validationError: false,
            validationErrorMessage: '',
            disabled: true,
            events: {
                focus: () => {
                    (this.children.emailInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmail(this.children.emailInput as Input);
                },
            },
        });

        this.children.fileInput = new FileInput({
            events: {
                change: (e) => {
                    let file = e.target.files[0];
                    let formData = new FormData();
                    formData.append("avatar", file);
                    UsersController.changeAvatar(formData);
                },
            },
        })

        this.children.loginInput = new Input({
            value: store.getState().user.login,
            type: 'text',
            name: 'login',
            placeholder: 'Логин',
            validationError: false,
            validationErrorMessage: '',
            disabled: true,
            events: {
                focus: () => {
                    (this.children.loginInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.loginInput as Input);
                },
            },
        });

        this.children.firstNameInput = new Input({
            value: store.getState().user.first_name,
            type: 'text',
            name: 'first_name',
            placeholder: 'Имя',
            validationError: false,
            validationErrorMessage: '',
            disabled: true,
            events: {
                focus: () => {
                    (this.children.firstNameInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.firstNameInput as Input);
                },
            },
        });

        this.children.secondNameInput = new Input({
            value: store.getState().user.second_name,
            type: 'text',
            name: 'second_name',
            placeholder: 'Фамилия',
            validationError: false,
            validationErrorMessage: '',
            disabled: true,
            events: {
                focus: () => {
                    (this.children.secondNameInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.secondNameInput as Input);
                },
            },
        });

        this.children.displayNameInput = new Input({
            value: store.getState().user.display_name,
            type: 'text',
            name: 'display_name',
            placeholder: 'Имя в чате',
            validationError: false,
            validationErrorMessage: '',
            disabled: true,
            events: {
                focus: () => {
                    (this.children.displayNameInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.displayNameInput as Input);
                },
            },
        });

        this.children.phoneInput = new Input({
            value: store.getState().user.phone,
            type: 'text',
            name: 'phone',
            placeholder: 'Телефон',
            validationError: false,
            validationErrorMessage: '',
            disabled: true,
            events: {
                focus: () => {
                    (this.children.phoneInput as Input).removeError();
                },
                blur: () => {
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
                    (this.children.oldPasswordInput as Input).removeError();
                },
                blur: () => {
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
                    (this.children.passwordInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.passwordInput as Input);
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
                    (this.children.passwordRepeatInput as Input).removeError();
                },
                blur: () => {
                    Validation.checkTwoPassword(this.children.passwordInput as Input, this.children.passwordRepeatInput as Input);
                },
            },
        });

        this.children.changeInfo = new Field({
            text: 'Изменить данные',
            events: {
                click: () => {
                    (this.children.saveButton as Button).props.disabled = false;

                    (this.children.emailInput as Input).props.hide = false;
                    (this.children.loginInput as Input).props.hide = false;
                    (this.children.firstNameInput as Input).props.hide = false;
                    (this.children.secondNameInput as Input).props.hide = false;
                    (this.children.displayNameInput as Input).props.hide = false;
                    (this.children.phoneInput as Input).props.hide = false;

                    (this.children.oldPasswordInput as Input).props.hide = true;
                    (this.children.passwordInput as Input).props.hide = true;
                    (this.children.passwordRepeatInput as Input).props.hide = true;

                    (this.children.emailInput as Input).props.disabled = false;
                    (this.children.loginInput as Input).props.disabled = false;
                    (this.children.firstNameInput as Input).props.disabled = false;
                    (this.children.secondNameInput as Input).props.disabled = false;
                    (this.children.displayNameInput as Input).props.disabled = false;
                    (this.children.phoneInput as Input).props.disabled = false;

                    this.props.checkInput = [
                        this.children.emailInput,
                        this.children.loginInput,
                        this.children.firstNameInput,
                        this.children.secondNameInput,
                        this.children.displayNameInput,
                        this.children.phoneInput,
                    ]
                },
            },
        });

        this.children.changePassword = new Field({
            text: 'Изменить пароль',
            events: {
                click: () => {
                    (this.children.saveButton as Button).props.disabled = false;

                    (this.children.emailInput as Input).props.hide = true;
                    (this.children.loginInput as Input).props.hide = true;
                    (this.children.firstNameInput as Input).props.hide = true;
                    (this.children.secondNameInput as Input).props.hide = true;
                    (this.children.displayNameInput as Input).props.hide = true;
                    (this.children.phoneInput as Input).props.hide = true;

                    (this.children.oldPasswordInput as Input).props.hide = false;
                    (this.children.passwordInput as Input).props.hide = false;
                    (this.children.passwordRepeatInput as Input).props.hide = false;

                    (this.children.oldPasswordInput as Input).props.disabled = false;
                    (this.children.passwordInput as Input).props.disabled = false;
                    (this.children.passwordRepeatInput as Input).props.disabled = false;

                    this.props.checkInput = [
                        this.children.oldPasswordInput,
                        this.children.passwordInput,
                        this.children.passwordRepeatInput,
                    ]
                },
            },
        });

        this.children.buttonExit = new Field({
            text: 'Выйти',
            events: {
                click: () => {
                    AuthController.logout();
                },
            },
        });

        this.children.saveButton = new Button({
            text: 'Сохранить',
            type: 'submit',
            disabled: true,
        });


        this.props.checkInput = [
        ]
        this.props.name = this.name;
        this.props.avatar = this.avatar;
    }

    render() {
        return this.compile(template, { ...this.props, style, backToImage, profileImage });
    }
}

const withUser = withStore((state) => ({ ...state.user }));

export default withUser(ProfileBase);
