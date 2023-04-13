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
    protected constructor(func: (formData: FormData) => void, options = '') {
        const props: SubmitPageProps = {
            options: options,
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
                                Validation.checkTwoPassword(this.props.checkInput.find(item => item.props.name === 'password'), item);
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
                    console.log("valid:", isValid);
                    if (isValid) {
                        func.call(this, new FormData(this.getContent()!.querySelector('form')!));

                        if (options === 'profilePage') {
                            this.children.saveButton.props.disabled = true;

                            this.children.emailInput.props.disabled = true;
                            this.children.loginInput.props.disabled = true;
                            this.children.firstNameInput.props.disabled = true;
                            this.children.secondNameInput.props.disabled = true;
                            this.children.displayNameInput.props.disabled = true;
                            this.children.phoneInput.props.disabled = true;

                            this.children.oldPasswordInput.props.disabled = true;
                            this.children.passwordInput.props.disabled = true;
                            this.children.passwordRepeatInput.props.disabled = true;

                            this.children.emailInput.props.hide = false;
                            this.children.loginInput.props.hide = false;
                            this.children.firstNameInput.props.hide = false;
                            this.children.secondNameInput.props.hide = false;
                            this.children.displayNameInput.props.hide = false;
                            this.children.phoneInput.props.hide = false;

                            this.children.oldPasswordInput.props.hide = true;
                            this.children.passwordInput.props.hide = true;
                            this.children.passwordRepeatInput.props.hide = true;
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
