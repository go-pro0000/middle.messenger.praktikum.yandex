import Input from '../../components/Input';
import Block from '../Block';
import Validation from './Validation';

interface SubmitPageProps {
    checkInput?: Array<Input>,
    events?: {
        submit?: (event: FormDataEvent) => void;
    };
}

export abstract class SubmitPage extends Block {
    protected constructor(func: (formData: FormData) => void, className = '') {
        const props: SubmitPageProps = {
            events: {
                submit: (evt) => {
                    console.log("submit");
                    evt.preventDefault();
                    let isValid = true;
                    for (const item of this.props.checkInput) {
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

                            default:
                                break;
                        }

                        isValid = isValid && item!.isValid();
                    }
                    console.log("valid", isValid);
                    if (isValid) {
                        func.call(this, new FormData(this.getContent()!.querySelector('form')!));
                    }
                    return false;
                },
            },
        };
        super(props);
    }
}

export default SubmitPage;
