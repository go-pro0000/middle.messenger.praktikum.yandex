import Input from '../../components/Input';

export class Validation {
    public static isEmail(_input: Input): void {
        const sampleRegEx = /.+@.+\.\w+/;
        const res: boolean = sampleRegEx.test(_input.getValue());
        if (res) {
            _input.removeError();
        } else {
            _input.setError('Неправильный формат почты');
        }
    }

    public static isEmptyInput(_input: Input): boolean {
        const isEmpty: boolean = this.isEmptyInputWithoutRender(_input);
        if (!isEmpty) {
            _input.removeError();
        } else {
            _input.setError('Поле не может быть пустым');
        }
        return isEmpty;
    }

    public static isEmptyInputWithoutRender(_input: Input): boolean {
        return _input.getValue() === '' || _input.getValue() === undefined || _input.getValue() === null;
    }

    public static isPhone(_input: Input): void {
        const sampleRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        const res: boolean = sampleRegEx.test(_input.getValue());
        if (res) {
            _input.removeError();
        } else {
            _input.setError('Неправильный формат телефона');
        }
    }

    public static checkFirstPassword(_input: Input, _inputRepeat: Input): void {
        const isEmptyFirst = this.isEmptyInput(_input);
        const isEmptyRepeat = this.isEmptyInputWithoutRender(_inputRepeat);
        if (!isEmptyFirst && !isEmptyRepeat) {
            if (_input.getValue() === _inputRepeat.getValue()) {
                _input.removeError();
                _inputRepeat.removeError();
            } else {
                _inputRepeat.setError('Пароли не совпадат');
            }
        }
    }

    public static checkTwoPassword(_input: Input, _inputRepeat: Input): void {
        const isEmpty = this.isEmptyInput(_input) || this.isEmptyInput(_inputRepeat);
        if (!isEmpty) {
            if (_input.getValue() === _inputRepeat.getValue()) {
                _input.removeError();
                _inputRepeat.removeError();
            } else {
                _inputRepeat.setError('Пароли не совпадат');
            }
        }
    }
}

export default Validation;
