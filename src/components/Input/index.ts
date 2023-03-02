import Block from "../../utils/Block"
import template from "./input.hbs"
import styles from "./styles.module.scss"

interface InputProps {
    type: string,
    name: string,
    placeholder: string,
    validationError: boolean,
    validationErrorMessage: string,
    events?: {
        click: (name: string) => void;
      };
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    public getValue() {
        return ((this.element as HTMLInputElement).getElementsByTagName('input')[0]).value;
    }

    public setValue(value: string) {
        return ((this.element as HTMLInputElement).getElementsByTagName('input')[0]).value = value;
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
