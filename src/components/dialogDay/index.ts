import Block from '../../utils/Block';
import template from './dialogDay.hbs';
import style from './style.modules.scss';
import DialogMessagesProps from '../dialogDay';
import DialogMessages from '../dialogMessages';

interface DialogDayProps {
    date: string,
    messages: Array<DialogMessagesProps>,
}

export default class dialogDay extends Block {
    constructor(props: DialogDayProps) {
        super(props);
    }

    init() {
        this.children.dialogMessages = this.props.messages.map((item) => new DialogMessages(item));
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
