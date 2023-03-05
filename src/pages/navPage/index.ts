import Block from '../../utils/Block'
import Link from '../../components/Link';
import { renderDOM } from '../../utils/renderDOM';
import template from './navPage.hbs'
import style from './styles.module.scss'

export class NavPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.signInLink = new Link({
        text: 'Вход',
        events: {
            click: () => {
                renderDOM('signIn');
            },
        }
    })

    this.children.signUpLink = new Link({
        text: 'Регистрация',
        events: {
            click: () => {
                renderDOM('signUp');
            },
        }
    })
  }

  render() {
    return this.compile(template, {style});
  }
}
