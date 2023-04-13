import Block from '../../utils/Block';
import Li from '../../components/li';
import template from './navPage.hbs';
import style from './styles.module.scss';
import Router from '../../utils/Router';

export default class NavPage extends Block {
  router: Router;

  constructor() {
    super({});
    this.router = new Router('#app');
  }

  init() {
    this.children.signInLink = new Li({
      text: 'Вход',
      events: {
        click: () => {
          this.router.go('/signin');
        },
      },
    });

    this.children.signUpLink = new Li({
      text: 'Регистрация',
      events: {
        click: () => {
          this.router.go('/sign-up');
        },
      },
    });

    this.children.dialogsLink = new Li({
      text: 'Диалоги',
      events: {
        click: () => {
          this.router.go('/messenger');
        },
      },
    });

    this.children.profileLink = new Li({
      text: 'Профиль',
      events: {
        click: () => {
          this.router.go('/settings');
        },
      },
    });

    this.children.pageNotFound = new Li({
      text: '404',
      events: {
        click: () => {
          this.router.go('/404');
        },
      },
    });

    this.children.serverError = new Li({
      text: '500',
      events: {
        click: () => {
          this.router.go('/500');
        },
      },
    });
  }

  render() {
    return this.compile(template, { style });
  }
}
