import Block from '../../utils/Block';
import template from './dialogCard.hbs';
import style from './style.module.scss';
import ChatsController from '../../controllers/ChatController';
import ButtonWithImage from '../ButtonWithImage';
import { User } from '../../api/AuthAPI';
import store from '../../utils/Store';
import addUserInChatIcon from '../../../static/img/dialogsPage/addUserInChat.svg';
import deleteUserFromChatIcon from '../../../static/img/dialogsPage/deleteUserFromChat.svg';
import deleteChatIcon from '../../../static/img/dialogsPage/deleteChat.svg';

export interface DialogCardProps {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: User,
        time: string,
        content: string,
    },
    isSelected: boolean,
}

export default class DialogCard extends Block {
    constructor(props: DialogCardProps) {
        super(props);

        this.props.events = {
            click: () => {
                store.set('selectedChatId', this.props.id);
                ChatsController.selectChat(this.props.id);
            },
        };

        if (store.getState().selectedChatId === this.props.id) {
        }
    }

    init() {
        this.children.addUserInChatButton = new ButtonWithImage({
            src: `${addUserInChatIcon}`,
            events: {
                click: () => {
                    store.set('addUserInChatPopupVisible', true);
                },
            },
        });

        this.children.deleteChat = new ButtonWithImage({
            src: `${deleteChatIcon}`,
            events: {
                click: () => {
                    store.set('deleteChatPopupVisible', true);
                },
            },
        });

        this.children.deleteUserFromChat = new ButtonWithImage({
            src: `${deleteUserFromChatIcon}`,
            events: {
                click: () => {
                    store.set('deleteUserFromChatPopupVisible', true);
                },
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
