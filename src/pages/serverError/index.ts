import Block from '../../utils/Block';
import template from './serverError.hbs';
import * as style from './style.module.scss';

export default class ServerError extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(template, { style });
    }
}
