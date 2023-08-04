import Block from '../../utils/Block';
import template from './link.hbs';

interface LinkProps {
  text: string;
  events?: {
    click: (route: string) => void,
  }
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
