import Block from '../../utils/Block';
import Button from '../Button';
import Input from '../Input';
import template from './popupMessage.hbs';
import * as style from './style.module.scss';
import ChatsController from '../../controllers/ChatController'
import store from '../../utils/Store';

export interface PopupMesageProps {
    label: string,
    placeholder: string,
    buttonText: string,
}

export default class PopupMesage extends Block {
    constructor(props: any) {
        super(props);

        this.props.events = {
            click: (e: Event) => {
                e.stopPropagation();
            }
        }
    }

    init() {
        this.children.confirmButton = new Button({
            text: this.props.buttonText,
            events: {
                click: () => {
                    if (store.getState().createChatPopupVisible) {
                        ChatsController.create((this.children.input as Input).getValue());
                    }
                    if (store.getState().addUserInChatPopupVisible) {
                        ChatsController.addUserToChat(store.getState().selectedChatId, Number((this.children.input as Input).getValue()));
                    }
                }
            }
        });

        this.children.input = new Input({
            value: '',
            type: 'text',
            placeholder: this.props.placeholder,
        })
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
