import Block from '../../utils/Block';
import template from './dialogCard.hbs';
import * as style from './style.module.scss';
import { ChatInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatController';

export default class DialogCard extends Block {
    constructor(props: ChatInfo) {
        super(props);

        this.props.events = {
            click: () => {
                ChatsController.selectChat(this.props.id);
            }
        }

    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
