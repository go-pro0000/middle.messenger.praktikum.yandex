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

interface DialogsPageProps {
}


export default class BaseDialogsPage extends Block {
    router: Router

    constructor(props: DialogsPageProps) {
        super({ props });

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

        this.children.sendButton = new ButtonWithImage({
            src: `${backToImage}`,
            events: {
                click: () => {
                    MessagesController.sendMessage(store.getState().selectedChat, document.getElementsByTagName('input')[0].value);
                },
            },
        });

        this.props.loaded = false;
        ChatsController.fetchChats().then(() => {
            this.children.dialogsCards = store.getState().chats.map((item: ChatInfo) => new DialogCard(item));
            this.props.loaded = true;
        });
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (this.props?.messages) {
            this.children.dialogMessages = (this.props.messages[store.getState().selectedChat] || []).map((item: Message) => new DialogMessages({...item, isMine: store.getState().user.id == item.user_id }));
        }

        return true;
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}

const withSelectedChatMessages = withStore(state => {
    return {messages: state.messages,}
})

export const DialogsPage = withSelectedChatMessages(BaseDialogsPage);
