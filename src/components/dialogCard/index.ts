import Block from '../../utils/Block';
import template from './dialogCard.hbs';
import * as style from './style.module.scss';
import { ChatInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatController';
import ButtonWithImage from '../ButtonWithImage';
import store from '../../utils/Store'
import addUserInChatIcon from '../../../static/img/dialogsPage/addUserInChat.svg'


export default class DialogCard extends Block {
    constructor(props: ChatInfo) {
        super(props);

        this.props.events = {
            click: () => {
                store.set('selectedChatId', this.props.id);
                ChatsController.selectChat(this.props.id);
            }
        }

    }

    init() {
        this.children.createChatButton = new ButtonWithImage({
            src: `${addUserInChatIcon}`,
            events: {
                click: () => {
                    store.set('addUserInChatPopupVisible', true);
                },
            },  
        })
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
