import sinon from 'sinon';
import { expect } from 'chai';
import RouterBase from './Router';
import Block from './Block';

describe('Router', () => {
  const originalBack = global.window.history.back;
  const originalForward = global.window.history.forward;

  // @ts-ignore
  before(() => {
    global.window.history.back = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };

    global.window.history.forward = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
  });

  after(() => {
    global.window.history.back = originalBack;
    global.window.history.forward = originalForward;
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Block;

  it('use() should return Router instance', () => {
    const routerBase: any = new RouterBase('#app');

    const res = routerBase.use('/', BlockMock);

    expect(res).to.eq(routerBase);
  });

  it('should render a page on history back action', () => {
    const routerBase: any = new RouterBase('#app');

    routerBase.use('/', BlockMock).start();

    routerBase.back();
    expect(getContentFake.callCount).to.eq(2);
  });

  it('should render a page on start', () => {
    const routerBase: any = new RouterBase('#app');

    routerBase.use('/', BlockMock).start();

    expect(getContentFake.callCount).to.eq(3);
  });
});
