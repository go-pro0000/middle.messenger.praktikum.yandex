import Block from '../../utils/Block';
import template from './li.hbs';

interface LiProps {
    text: string;
    events: {
      click: (route: string) => void,
    }
  }

export default class Li extends Block {
    constructor(props: LiProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
