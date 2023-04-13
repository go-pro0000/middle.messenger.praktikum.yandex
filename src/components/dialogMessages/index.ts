import Block from '../../utils/Block';
import template from './dialogMessages.hbs';
import * as style from './style.module.scss';
import checkedMessage from '../../../static/img/dialogsPage/checkedMessage.svg'
import uncheckedMessage from '../../../static/img/dialogsPage/checkedMessage.svg'

export interface DialogMessagesProps {
    chat_id: number,
    time: string,
    type: string,
    user_id: string,
    content: string,
    file?: {
        id: number,
        user_id: number,
        path: string,
        filename: string,
        content_type: string,
        content_size: string,
        upload_date: string,
    },
    isMine: boolean,
}

export default class DialogMessages extends Block {
    constructor(props: DialogMessagesProps) {
        super(props);
        
        this.props.time = this.props?.time?.split('+')[0].split('T')[1].slice(0, -3);
    }

    render() {
        return this.compile(template, { ...this.props, style, checkedMessage, uncheckedMessage });
    }
}
