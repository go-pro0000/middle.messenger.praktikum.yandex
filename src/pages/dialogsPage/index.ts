import Block from '../../utils/Block';
import template from './dialogsPage.hbs';
import * as style from './styles.module.scss';
import DialogCard from '../../components/dialogCard';
import DialogDay from '../../components/dialogDay';
import cameraImage from '../../../static/img/dialogsPage/camera.svg';
import ChatsController from '../../controllers/ChatController';
import store from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsAPI';

interface DialogsPageProps {
}

export default class DialogsPage extends Block {
    constructor(props: DialogsPageProps) {
        super({ props });
    }

    init() {
        this.props.loaded = false;
        ChatsController.fetchChats().then(() => {
            console.log(store.getState().chats);
            this.children.dialogsCards = store.getState().chats.map((item: ChatInfo) => new DialogCard(item));
            this.props.loaded = true;
        });

        // this.children.dialogsDays = [
        //     {
        //         date: '19 июня',
        //         messages: [
        //             {
        //                 you: false,
        //                 type: 'text',
        //                 time: '11:56',
        //                 text: 'Привет!',
        //             },
        //             {
        //                 you: false,
        //                 type: '',
        //                 time: '11:56',
        //                 text: cameraImage,
        //             },
        //             {
        //                 you: true,
        //                 type: 'text',
        //                 time: '12:00',
        //                 text: 'Круто',
        //                 checked: true,
        //             },
        //             {
        //                 you: true,
        //                 type: '',
        //                 time: '12:00',
        //                 text: cameraImage,
        //                 checked: true,
        //             },
        //         ],
        //     },

        //     {
        //         date: '20 июня',
        //         messages: [
        //             {
        //                 you: false,
        //                 type: 'text',
        //                 time: '11:56',
        //                 text: 'Привет!',
        //             },
        //             {
        //                 you: false,
        //                 type: '',
        //                 time: '11:56',
        //                 text: cameraImage,
        //             },
        //             {
        //                 you: true,
        //                 type: 'text',
        //                 time: '12:00',
        //                 text: 'Круто',
        //                 checked: true,
        //             },
        //             {
        //                 you: true,
        //                 type: '',
        //                 time: '12:00',
        //                 text: cameraImage,
        //                 checked: false,
        //             }],
        //     },
        // ].map((item) => {
        //     const dialogDay = new DialogDay(item);
        //     return dialogDay;
        // });
    }

    render() {
        return this.compile(template, { ...this.props, style });
    }
}
