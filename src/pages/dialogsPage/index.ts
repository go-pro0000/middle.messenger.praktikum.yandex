import Block from '../../utils/Block';
import template from './dialogsPage.hbs';
import * as style from './styles.module.scss';
import DialogCard from '../../components/dialogCard';
import DialogDay from '../../components/dialogDay';
import cameraImage from '../../../static/img/dialogsPage/camera.svg';

interface DialogsPageProps {
}

export class DialogsPage extends Block {
    constructor(props: DialogsPageProps) {
        super({ props });
    }

    init() {
        this.children.dialogsCards = [
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Киноклуб',
                own: true,
                text: 'стикер',
                time: '12:00',
                quantity: 0,
            },
            {
                img: '',
                name: 'Илья',
                own: false,
                text: 'Друзья, у меня для вас особенный выпуск новостей! блаблабла',
                time: '15:12',
                quantity: 4,
            },
            {
                img: '',
                name: 'Андрей Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
            {
                img: '',
                name: 'Андрей',
                own: false,
                text: 'Изображение',
                time: '10:49',
                quantity: 2,
            },
        ].map((item) => new DialogCard(item));

        this.children.dialogsDays = [
            {
            date: '19 июня',
            messages: [
            {
            you: false,
            type: 'text',
            time: '11:56',
            text: 'Привет!',
            },
            {
            you: false,
            type: '',
            time: '11:56',
            text: cameraImage,
            },
            {
            you: true,
            type: 'text',
            time: '12:00',
            text: 'Круто',
            checked: true,
            },
            {
            you: true,
            type: '',
            time: '12:00',
            text: cameraImage,
            checked: true,
            },
                ],
            },

                {
            date: '20 июня',
            messages: [
            {
            you: false,
            type: 'text',
            time: '11:56',
            text: 'Привет!',
            },
            {
            you: false,
            type: '',
            time: '11:56',
            text: cameraImage,
            },
            {
            you: true,
            type: 'text',
            time: '12:00',
            text: 'Круто',
            checked: true,
            },
            {
            you: true,
            type: '',
            time: '12:00',
            text: cameraImage,
            checked: false,
            }],
},
        ].map((item) => {
            const dialogDay = new DialogDay(item);
            return dialogDay;
        });
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
