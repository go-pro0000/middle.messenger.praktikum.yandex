import Block from '../../utils/Block'
import template from './button.hbs'
import styles from './styles.module.scss'

interface ButtonProps {
  type: string;
  text: string;
  events: {
    click: (e: SubmitEvent) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
