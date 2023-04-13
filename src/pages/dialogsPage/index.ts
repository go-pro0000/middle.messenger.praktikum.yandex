import template from './dialogsPage.hbs';
import * as style from './styles.module.scss';
import DialogCard from '../../components/dialogCard';
import ChatsController from '../../controllers/ChatController';
import store, { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsAPI';
import Link from '../../components/Link';
import Router from '../../utils/Router';
import ButtonWithImage from '../../components/ButtonWithImage';
import MessagesController, { Message } from '../../controllers/MessagesController';
import DialogMessages from '../../components/dialogMessages';
import Popup from '../../components/Popup';
import createChatIcon from '../../../static/img/dialogsPage/createChat.svg'
import Button from '../../components/Button';
import Input from '../../components/Input';
import Validation from '../../utils/validation/Validation';
import SubmitPage from '../../utils/validation/SubmitPage';

import FileInput from '../../components/FileInput';


export default class BaseDialogsPage extends SubmitPage {
    router: Router

    constructor() {
        super(() => {
            MessagesController.sendMessage(store.getState().selectedChat, document.getElementsByTagName('input')[0].value);
        });

        ChatsController.fetchChats();

        this.router = new Router('#app');
        this.props.userId = store.getState().user.id;
    }

    init() {
        this.children.profileLink = new Link({
            text: 'Профиль',
            events: {
                click: () => {
                    this.router.go('/settings')
                },
            },
        });

        this.children.createChatButton = new ButtonWithImage({
            src: `${createChatIcon}`,
            events: {
                click: () => {
                    store.set('createChatPopupVisible', true);
                    // this.props.popupVisible = true;
                },
            },
        })

        this.children.sendMessageInput = new Input({
            value: '',
            type: 'text',
            name: 'sendMessage',
            placeholder: 'Сообщение',
            validationError: false,
            validationErrorMessage: '',
            events: {
                focus: () => {
                    (this.children.sendMessageInput as Input).removeError();
                },
                blur: () => {
                    Validation.isEmptyInput(this.children.sendMessageInput as Input);
                },
            },
        })

        this.children.sendButton = new Button({
            type: 'submit',
            text: 'Отправить',
        });

        this.props.checkInput = [
            this.children.sendMessageInput,
        ]
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (this.props?.createChatPopupVisible) {
            this.children.confirmPopup = new Popup({
                label: 'Название чата',
                placeholder: 'Введите название чата',
                buttonText: 'Создать',
                events: {
                    click: () => {
                        store.set('createChatPopupVisible', false);
                    }
                }
            })
        }

        if (this.props?.addUserInChatPopupVisible) {
            this.children.confirmPopup = new Popup({
                label: 'Id пользователя',
                placeholder: 'Введите Id пользователя',
                buttonText: 'Добавить пользователя',
                events: {
                    click: () => {
                        store.set('addUserInChatPopupVisible', false);
                    }
                }
            })
        }

        if (this.props?.deleteChatPopupVisible) {
            this.children.confirmPopup = new Popup({
                empty: true,
                buttonText: 'Удалить чат',
                events: {
                    click: () => {
                        store.set('deleteChatPopupVisible', false);
                    }
                }
            })
        }

        if (this.props?.deleteUserFromChatPopupVisible) {
            this.children.confirmPopup = new Popup({
                label: 'Id пользователя',
                placeholder: 'Введите Id пользователя',
                buttonText: 'Удалить пользователя',
                events: {
                    click: () => {
                        store.set('deleteUserFromChatPopupVisible', false);
                    }
                }
            })
        }

        if (this.props?.messages) {
            this.children.dialogMessages = (this.props.messages[store.getState().selectedChat] || []).map((item: Message) => new DialogMessages({ ...item, isMine: store.getState().user.id == item.user_id }));
        }

        if (this.props?.chats)
            this.children.dialogsCards = this.props.chats.map((item: ChatInfo) => new DialogCard({ ...item, isSelected: store.getState().selectedChatId === item.id }));

        return true;
    }

    render() {
        return this.compile(template, { ...this.props, style, createChatIcon });
    }
}

const withSelectedChatMessages = withStore(state => {
    return {
        messages: state.messages || [],
        chats: state.chats || [],
        selectedChatId: state.selectedChatId || '',
        createChatPopupVisible: state.createChatPopupVisible || false,
        addUserInChatPopupVisible: state.addUserInChatPopupVisible || false,
        deleteChatPopupVisible: state.deleteChatPopupVisible || false,
        deleteUserFromChatPopupVisible: state.deleteUserFromChatPopupVisible || false,
    }
})

export const DialogsPage = withSelectedChatMessages(BaseDialogsPage);
