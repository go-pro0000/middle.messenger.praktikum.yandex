import { renderDOM } from './utils/renderDOM';
import Router from './utils/Router';
import SignInPage from './pages/auth/signin';
import { NavPage } from './pages/navPage';

// window.addEventListener('DOMContentLoaded', () => {
//     renderDOM('navPage');
// });

const router = new Router("#app");
router
    .use('/', NavPage)
    .use('/signin', SignInPage)
    .start()
