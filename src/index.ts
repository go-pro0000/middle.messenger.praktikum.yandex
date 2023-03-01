import { SignUpPage } from "./pages/auth/signup";

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;

    const signup = new SignUpPage();

    root.appendChild(signup.element!);

    signup.dispatchComponentDidMount();

})
   
