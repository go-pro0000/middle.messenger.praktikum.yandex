import Block from '../../utils/Block'
import Link from '../../components/Link';
import { renderDOM } from '../../utils/renderDOM';
import template from './navPage.hbs'
import * as style from './styles.module.scss'

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

    this.children.dialogsLink = new Link({
      text: 'Диалоги',
      events: {
        click: () => {
          renderDOM('dialogsPage');
        },
      }
    })

    this.children.profileLink = new Link({
      text: 'Профиль',
      events: {
        click: () => {
          renderDOM('profile');
        },
      }
    })

    this.children.pageNotFound = new Link({
      text: '404',
      events: {
        click: () => {
          renderDOM('pageNotFound');
        },
      }
    })

    this.children.serverError = new Link({
      text: '500',
      events: {
        click: () => {
          renderDOM('serverError');
        },
      }
    })
  }

  render() {
    return this.compile(template, { style });
  }
}
