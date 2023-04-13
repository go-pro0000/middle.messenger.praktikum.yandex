import Block from '../../utils/Block';
import template from './fileInput.hbs';

interface FileInputProps {
    events: {
        change: (input: any) => void,
    }
}

export default class FileInput extends Block<FileInputProps> {
    constructor(props: FileInputProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
