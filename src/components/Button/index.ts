import Block from '../../utils/Block';
import template from './button.hbs';
import * as styles from './styles.module.scss';

interface ButtonProps {
  type: string;
  text: string;
  disabled?: boolean;
  events?: {
    submit: () => void
}
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
