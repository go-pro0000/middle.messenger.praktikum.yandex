import Block from '../../utils/Block';
import template from './dialogCard.hbs';
import * as style from './style.module.scss';

interface DialogCardProps {
    img: string,
    name: string,
    own: boolean,
    text: string,
    time: string,
    quantity: number,
}

export default class DialogCard extends Block {
    constructor(props: DialogCardProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
