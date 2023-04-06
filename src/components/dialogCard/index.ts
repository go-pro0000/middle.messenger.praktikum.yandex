import Block from '../../utils/Block';
import template from './dialogCard.hbs';
import * as style from './style.module.scss';
import { ChatInfo } from '../../api/ChatsAPI';

export default class DialogCard extends Block {
    constructor(props: ChatInfo) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
