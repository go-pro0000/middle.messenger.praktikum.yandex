import { SignUpPage } from '../pages/auth/signup';
import SignInPage from '../pages/auth/signin';
import { NavPage } from '../pages/navPage';
import { DialogsPage } from '../pages/dialogsPage';
import ProfilePage from '../pages/profilePage';
import PageNotFound from '../pages/pageNotFound';
import ServerError from '../pages/serverError';

const ROUTES = {
    signUp: SignUpPage,
    signIn: SignInPage,
    navPage: NavPage,
    dialogsPage: DialogsPage,
    profile: ProfilePage,
    pageNotFound: PageNotFound,
    serverError: ServerError,
};

export function renderDOM(route: keyof typeof ROUTES) {
    const root = document.querySelector('#app');

    root!.innerHTML = '';

    const PageComponent = ROUTES[route];

    const page = new PageComponent({});

    root!.appendChild(page.element as HTMLElement);

    page.dispatchComponentDidMount();
}
