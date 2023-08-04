import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../Block';
import Validation from './Validation';

interface SubmitPageProps {
    checkInput?: Array<Input>,
    events?: {
        submit: (event: FormDataEvent) => void;
    };
    options?: any,
}

export abstract class SubmitPage extends Block {
    protected constructor(func: (formData: FormData) => void, options:any = '') {
        const props: SubmitPageProps = {
            options,
            events: {
                submit: (evt) => {
                    evt.preventDefault();
                    let isValid = true;
                    for (const item of this.props?.checkInput) {
                        switch (item.props.name) {
                            case 'email':
                                Validation.isEmail(item);
                                break;

                            case 'login':
                                Validation.isEmptyInput(item);
                                break;

                            case 'first_name':
                                Validation.isEmptyInput(item);
                                break;

                            case 'second_name':
                                Validation.isEmptyInput(item);
                                break;

                            case 'phone':
                                Validation.isPhone(item);
                                break;

                            case 'old_password':
                                Validation.isEmptyInput(item);
                                break;

                            case 'password':
                                Validation.isEmptyInput(item);
                                break;

                            case 'password_repeat':
                                Validation.checkTwoPassword(this.props.checkInput.find(((item: { props: { name: string; } }) => item.props.name === 'password')), item);
                                break;

                            case 'display_name':
                                Validation.isEmptyInput(item);

                            case 'popupInput':
                                Validation.isEmptyInput(item);

                            case 'sendMessage':
                                Validation.isEmptyInput(item);

                            default:
                                break;
                        }

                        isValid = isValid && item!.isValid();
                    }
                    if (isValid) {
                        func.call(this, new FormData(this.getContent()!.querySelector('form')!));

                        if (options === 'profilePage') {
                            (this.children.saveButton as Button).props.disabled = true;

                            (this.children.emailInput as Input).props.disabled = true;
                            (this.children.loginInput as Input).props.disabled = true;
                            (this.children.firstNameInput as Input).props.disabled = true;
                            (this.children.secondNameInput as Input).props.disabled = true;
                            (this.children.displayNameInput as Input).props.disabled = true;
                            (this.children.phoneInput as Input).props.disabled = true;

                            (this.children.oldPasswordInput as Input).props.disabled = true;
                            (this.children.passwordInput as Input).props.disabled = true;
                            (this.children.passwordRepeatInput as Input).props.disabled = true;

                            (this.children.emailInput as Input).props.hide = false;
                            (this.children.loginInput as Input).props.hide = false;
                            (this.children.firstNameInput as Input).props.hide = false;
                            (this.children.secondNameInput as Input).props.hide = false;
                            (this.children.displayNameInput as Input).props.hide = false;
                            (this.children.phoneInput as Input).props.hide = false;

                            (this.children.oldPasswordInput as Input).props.hide = true;
                            (this.children.passwordInput as Input).props.hide = true;
                            (this.children.passwordRepeatInput as Input).props.hide = true;
                        }
                    }
                    return false;
                },
            },
        };
        super(props);
    }
}

export default SubmitPage;
