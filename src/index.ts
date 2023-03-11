import Router from './utils/Router';
import { NavPage } from './pages/navPage';
import SignInPage from './pages/auth/signin';
import { SignUpPage } from './pages/auth/signup';
import { DialogsPage } from './pages/dialogsPage';
import ProfilePage from './pages/profilePage';
import PageNotFound from './pages/pageNotFound';
import ServerError from './pages/serverError';

// window.addEventListener('DOMContentLoaded', () => {
//     renderDOM('navPage');
// });

const router = new Router("#app");
router
    .use('/', NavPage)
    .use('/signin', SignInPage)
    .use('/signup', SignUpPage)
    .use('/dialogs', DialogsPage)
    .use('/profile', ProfilePage)
    .use('/404', PageNotFound)
    .use('/500', ServerError)
    .start()
