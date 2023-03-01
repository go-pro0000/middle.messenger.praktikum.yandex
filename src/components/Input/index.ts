import Block from "../../utils/Block"
import template from "./input.hbs"
// import styles from "./styles.scss"

interface InputProps {
    type: string,
    name: string,
    placeholder: string,
    validationError?: boolean,
    validationErrorMessage?: string,
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
