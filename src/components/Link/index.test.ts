import Link from "."
import { expect } from "chai";
import sinon from "sinon";

describe('Link', () => {
    it('should render', () => {
        new Link({text: 'link'})
    });

    it('element should return a', () => {
        const link = new Link({text: 'link'});
        const element = link.element;

        expect(element).to.be.instanceof(window.HTMLAnchorElement);
    });

    it('should call function on click', () => {
        const f = sinon.fake();

        const link = new Link(
        {
            text: 'link',
            events: {
                click: f,
            }
        });
        const element = link.element;

        element?.click();

        expect(f.calledOnce).to.eq(true);
    });
})
