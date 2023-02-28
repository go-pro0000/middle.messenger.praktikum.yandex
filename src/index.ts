import {Button} from './components/Button'

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;

    const button = new Button({
        label: "Click me",
        events: {
            click: () => { console.log('Clicked')},
        },
    })

    root.appendChild(button.element!);

})
   
