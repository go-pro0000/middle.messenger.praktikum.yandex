import Router from './utils/Router';
import NavPage from './pages/navPage';
import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';
import DialogsPage from './pages/dialogsPage';
import ProfilePage from './pages/profilePage';
import PageNotFound from './pages/pageNotFound';
import ServerError from './pages/serverError';
import AuthController from './controllers/AuthController';

const router = new Router("#app");

window.addEventListener('DOMContentLoaded', async () => {
    console.log("work");

    router
        .use('/', NavPage)
        .use('/signin', SignInPage)
        .use('/signup', SignUpPage)
        .use('/dialogs', DialogsPage)
        .use('/profile', ProfilePage)
        .use('/404', PageNotFound)
        .use('/500', ServerError)

        router.start();

    // let isProtectedRoute = false;

    // switch(window.location.pathname) {
    //     case '/':
    //     case '/profile':
    //         isProtectedRoute = true;
    //         break;
    // }

    // try {
    //     await AuthController.fetchUser();

    //     router.start()

        
        
    // } catch (error) {
    //     router.start();

    //     router.go('/');
    // }
})
