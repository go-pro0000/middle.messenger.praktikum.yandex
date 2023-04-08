import Block from '../../utils/Block';
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
import backToImage from '../../../static/img/dialogsPage/buttonSend.svg';
import DialogMessages from '../../components/dialogMessages';
import Popup from '../../components/Popup';
import createChatIcon from '../../../static/img/dialogsPage/createChat.svg'

interface DialogsPageProps {
}


export default class BaseDialogsPage extends Block {
    router: Router

    constructor(props: DialogsPageProps) {
        super({ props });

        ChatsController.fetchChats();

        this.router = new Router('#app');
        this.props.userId = store.getState().user.id;
    }

    init() {
        this.children.profileLink = new Link({
            text: 'Профиль',
            events: {
                click: () => {
                    this.router.go('/profile')
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

        this.children.sendButton = new ButtonWithImage({
            src: `${backToImage}`,
            events: {
                click: () => {
                    MessagesController.sendMessage(store.getState().selectedChat, document.getElementsByTagName('input')[0].value);
                },
            },
        });
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
                        store.set('addUserInChatPopupVisible', false);
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
                        store.set('createChatPopupVisible', false);
                        store.set('addUserInChatPopupVisible', false);
                    }
                }
            })
        } 

        if (this.props?.messages) {
            this.children.dialogMessages = (this.props.messages[store.getState().selectedChat] || []).map((item: Message) => new DialogMessages({ ...item, isMine: store.getState().user.id == item.user_id }));
        }

        if (this.props?.chats)
            this.children.dialogsCards = this.props.chats.map((item: ChatInfo) => new DialogCard(item));

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
        createChatPopupVisible: state.createChatPopupVisible || false,
        addUserInChatPopupVisible: state.addUserInChatPopupVisible || false,
    }
})

export const DialogsPage = withSelectedChatMessages(BaseDialogsPage);
