import Block from "../../../utils/Block"
import Input from "../../../components/Input/input.hbs"
import template from "./signup.hbs"


export class SignUpPage extends Block {
    constructor() {
        super({});
    }

    init() {
        this.children.emailInput = new Input({

        })  
    }

    render() {
        return this.compile(template, {...this.props});
    }
}