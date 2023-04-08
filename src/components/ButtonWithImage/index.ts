import Block from '../../utils/Block';
import template from './ButtonWithImage.hbs';
import * as styles from './styles.module.scss';

interface ButtonWithImageProps {
  src: string,

  events: {
    click: () => void,
};
}

export default class ButtonWithImage extends Block<ButtonWithImageProps> {
  constructor(props: ButtonWithImageProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
