import Block from '../../utils/Block';
import template from './dialogMessages.hbs';
import * as style from './style.module.scss';
import checkedMessage from '../../../static/img/dialogsPage/checkedMessage.svg';
import uncheckedMessage from '../../../static/img/dialogsPage/uncheckedMessage.svg';

export interface dialogMessagesProps {
    you: boolean,
    type: string,
    time: string,
    text: string,
    checked: boolean,
    checkedMessage?: string,
    uncheckedMessage?: string,
}

export default class dialogMessages extends Block {
    constructor(props: dialogMessagesProps) {
        props.checkedMessage = checkedMessage;
        props.uncheckedMessage = uncheckedMessage;

        super(props);
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
