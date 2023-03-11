import Block from '../../utils/Block';
import Li from '../../components/li';
import { renderDOM } from '../../utils/renderDOM';
import template from './navPage.hbs';
import * as style from './styles.module.scss';
import Router from '../../utils/Router';

export class NavPage extends Block {
  router: Router;

  constructor() {
    super({});
    this.router = new Router("#app");
  }

  init() {
    this.children.signInLink = new Li({
      text: 'Вход',
      events: {
        click: () => {
          this.router.go('/signin')
        },
      },
    });

    this.children.signUpLink = new Li({
      text: 'Регистрация',
      events: {
        click: () => {
          this.router.go('/signup')
        },
      },
    });

    this.children.dialogsLink = new Li({
      text: 'Диалоги',
      events: {
        click: () => {
          this.router.go('/dialogs')
        },
      },
    });

    this.children.profileLink = new Li({
      text: 'Профиль',
      events: {
        click: () => {
          this.router.go('/profile')
        },
      },
    });

    this.children.pageNotFound = new Li({
      text: '404',
      events: {
        click: () => {
          this.router.go('/404')
        },
      },
    });

    this.children.serverError = new Li({
      text: '500',
      events: {
        click: () => {
          this.router.go('/500')
        },
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
