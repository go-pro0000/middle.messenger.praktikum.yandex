import Block from '../../utils/Block';
import template from './link.hbs';
import * as styles from './styles.module.scss';

interface LinkProps {
  text: string;
  events: {
    click: (route: string) => void,
  }
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
