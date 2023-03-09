import Block from '../../utils/Block';
import Li from '../../components/li';
import { renderDOM } from '../../utils/renderDOM';
import template from './navPage.hbs';
import * as style from './styles.module.scss';

export class NavPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.signInLink = new Li({
      text: 'Вход',
      events: {
        click: () => {
          // renderDOM('signIn');
          
        },
      },
    });

    this.children.signUpLink = new Li({
      text: 'Регистрация',
      events: {
        click: () => {
          renderDOM('signUp');
        },
      },
    });

    this.children.dialogsLink = new Li({
      text: 'Диалоги',
      events: {
        click: () => {
          renderDOM('dialogsPage');
        },
      },
    });

    this.children.profileLink = new Li({
      text: 'Профиль',
      events: {
        click: () => {
          renderDOM('profile');
        },
      },
    });

    this.children.pageNotFound = new Li({
      text: '404',
      events: {
        click: () => {
          renderDOM('pageNotFound');
        },
      },
    });

    this.children.serverError = new Li({
      text: '500',
      events: {
        click: () => {
          renderDOM('serverError');
        },
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
