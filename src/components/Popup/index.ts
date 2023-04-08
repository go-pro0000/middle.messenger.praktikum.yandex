import Block from '../../utils/Block';
import template from './popup.hbs';
import * as style from './style.module.scss';
import PopupMessage from '../PopupMessage';

export interface PopupProps {
    label?: string,
    placeholder?: string,
    buttonText?: string,
    empty? : boolean,
    events: {
        click: () => void,
    }
}

export default class Popup extends Block {
    constructor(props: PopupProps) {
        super(props);
    }

    init() {
        this.children.popupMessage = new PopupMessage({
            label: this.props?.label,
            placeholder: this.props?.placeholder,
            buttonText: this.props?.buttonText,
            empty: this.props?.empty,
        });
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
