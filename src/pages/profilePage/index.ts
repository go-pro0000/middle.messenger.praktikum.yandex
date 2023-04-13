import Block from '../../utils/Block';
import template from './profilePage.hbs';
import Profile from '../../components/profile';

export default class ProfilePage extends Block {
    constructor() {
        super({});
    }

    init() {
        this.children.profile = new Profile({
            changeData: true,
        });
    }

    render() {
        return this.compile(template, {});
    }
}
