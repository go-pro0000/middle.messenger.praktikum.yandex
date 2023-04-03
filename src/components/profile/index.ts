import template from './profile.hbs';
import * as style from './style.module.scss';
import Button from '../Button';
import Input from '../Input';
import Field from '../field';
import ButtonWithImage from '../../components/ButtonWithImage';
import store, { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import Validation from '../../utils/validation/Validation';
import Router from '../../utils/Router';
import backToImage from '../../../static/img/profilePage/backTo.svg';
import profileImage from '../../../static/img/profilePage/icon.svg';
import SubmitPage from '../../utils/validation/SubmitPage';
import UsersController from '../../controllers/UsersController';

// interface ProfileProps {
//     changeData: boolean,
// }

class ProfileBase extends SubmitPage {
    router: Router;

    constructor(props: any) {
        super((formData) => {
            const data = {
                email : formData.get('email') as string,
                login : formData.get('login') as string,
                first_name : formData.get('first_name') as string,
                second_name : formData.get('second_name') as string,
                display_name : formData.get('display_name') as string,
                phone : formData.get('phone') as string,
            };
            UsersController.changeInfo(data); 
        }, 'ProfilePage');
        this.router = new Router("#app");
    }

    async init() {
        await AuthController.fetchUser();

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
                    this.props.checkInput[0].props.hide = false;
                    this.props.checkInput[1].props.hide = false;
                    this.props.checkInput[2].props.hide = false;
                    this.props.checkInput[3].props.hide = false;
                    this.props.checkInput[4].props.hide = false;
                    this.props.checkInput[5].props.hide = false;

                    this.props.checkInput[0].props.disabled = false;
                    this.props.checkInput[1].props.disabled = false;
                    this.props.checkInput[2].props.disabled = false;
                    this.props.checkInput[3].props.disabled = false;
                    this.props.checkInput[4].props.disabled = false;
                    this.props.checkInput[5].props.disabled = false;

                    this.props.checkInput[6].props.hide = true;
                    this.props.checkInput[7].props.hide = true;
                    this.props.checkInput[8].props.hide = true;

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
                    this.props.checkInput[0].props.hide = true;
                    this.props.checkInput[1].props.hide = true;
                    this.props.checkInput[2].props.hide = true;
                    this.props.checkInput[3].props.hide = true;
                    this.props.checkInput[4].props.hide = true;
                    this.props.checkInput[5].props.hide = true;

                    this.props.checkInput[6].props.hide = false;
                    this.props.checkInput[7].props.hide = false;
                    this.props.checkInput[8].props.hide = false;

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
        });


        this.props.checkInput = [
        ]
    }

    render() {
        return this.compile(template, { ...this.props, style, backToImage, profileImage });
    }
}

const withUser = withStore((state) => ({...state.user}));

export default withUser(ProfileBase);
