import Router from './utils/Router';
import NavPage from './pages/navPage';
import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';
import {DialogsPage} from './pages/dialogsPage';
import ProfilePage from './pages/profilePage';
import PageNotFound from './pages/pageNotFound';
import ServerError from './pages/serverError';

const router = new Router("#app");

window.addEventListener('DOMContentLoaded', async () => {    
    router
        .use('/', NavPage)
        .use('/signin', SignInPage)
        .use('/sign-up', SignUpPage)
        .use('/messenger', DialogsPage, 'protected')
        .use('/settings', ProfilePage, 'protected')
        .use('/404', PageNotFound)
        .use('/500', ServerError)

        router.start();
})
