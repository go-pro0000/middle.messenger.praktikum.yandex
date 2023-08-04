import Button from '../Button';
import Input from '../Input';
import template from './popupMessage.hbs';
import style from './style.module.scss';
import ChatsController from '../../controllers/ChatController';
import store from '../../utils/Store';
import SubmitPage from '../../utils/validation/SubmitPage';
import Validation from '../../utils/validation/Validation';

export interface PopupMesageProps {
    label?: string,
    placeholder?: string,
    buttonText?: string,
    empty?: boolean,
}

export default class PopupMesage extends SubmitPage {
    constructor(props: PopupMesageProps) {
        super(() => {
            if (store.getState().createChatPopupVisible) {
                ChatsController.create((this.children.popupInput as Input).getValue());
                store.set('createChatPopupVisible', false);
            }
            if (store.getState().addUserInChatPopupVisible) {
                ChatsController.addUserToChat(store.getState().selectedChatId, Number((this.children.popupInput as Input).getValue()));
                store.set('addUserInChatPopupVisible', false);
            }

            if (store.getState().deleteChatPopupVisible) {
                ChatsController.delete(store.getState().selectedChatId);
                store.set('deleteChatPopupVisible', false);
            }

            if (store.getState().deleteUserFromChatPopupVisible) {
                ChatsController.deleteUsers([Number((this.children.popupInput as Input).getValue())], store.getState().selectedChatId);
                store.set('deleteUserFromChatPopupVisible', false);
            }
        }, props);
    }

    init() {
        this.props.events.click = (e: Event) => {
            e.stopPropagation();
        };

        this.children.confirmButton = new Button({
            text: this.props.options.buttonText,
            type: 'submit',
        });

        this.children.popupInput = new Input({
            value: '',
            type: 'text',
            name: 'popupInput',
            placeholder: this.props.options.placeholder,
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    (this.children.popupInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.popupInput as Input);
                },
            },
        });

        if (store.getState().deleteChatPopupVisible) {
            this.props.checkInput = [];
        } else {
            this.props.checkInput = [
                this.children.popupInput,
            ];
        }
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
