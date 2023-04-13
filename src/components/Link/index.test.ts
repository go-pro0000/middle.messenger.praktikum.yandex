import { expect } from 'chai';
import sinon from 'sinon';
import Link from '.';

describe('Link', () => {
    it('should render', () => {
        new Link({ text: 'link' });
    });

    it('element should return a', () => {
        const link = new Link({ text: 'link' });
        const { element } = link;

        expect(element).to.be.instanceof(window.HTMLAnchorElement);
    });

    it('should call function on click', () => {
        const f = sinon.fake();

        const link = new Link(
        {
            text: 'link',
            events: {
                click: f,
            },
        },
);
        const { element } = link;

        element?.click();

        expect(f.calledOnce).to.eq(true);
    });
});
