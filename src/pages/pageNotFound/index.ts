import Block from '../../utils/Block';
import template from './pageNotFound.hbs';
import * as style from './style.module.scss';

export default class PageNotFound extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(template, { style });
    }
}
