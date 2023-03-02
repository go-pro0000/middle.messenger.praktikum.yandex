import { SignUpPage } from "../pages/auth/signup"
import { SignInPage } from "../pages/auth/signin"

const ROUTES = {
    signUp: SignUpPage,
    signIn: SignInPage, 
}

export function renderDOM(route: keyof typeof ROUTES) {
    const root = document.querySelector('#app');

    root!.innerHTML = '';

    const PageComponent = ROUTES[route];
    const page = new PageComponent({});

    root!.appendChild(page.element);

    page.dispatchComponentDidMount();
}
