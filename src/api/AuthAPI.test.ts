import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';
import type { AuthAPI as AuthAPIType } from './AuthAPI';
import type BaseAPIType from './BaseAPI';

const httpTransportMock = {
  get: sinon.stub(),
  post: sinon.stub(),
};

const { default: BaseApi } = proxyquire('./BaseAPI', {
  '../utils/HTTPTransport': {
    default: class {
      get = httpTransportMock.get;

      post = httpTransportMock.post;
    },
  },
}) as { default: typeof BaseAPIType};

const { AuthAPI } = proxyquire('./AuthAPI', {
  './BaseAPI': {
    default: BaseApi,
  },
}) as { AuthAPI: typeof AuthAPIType};

describe('AuthApi', () => {
  const data = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  };

  it('should call /signup on signup method with passed data', () => {
    const authApi = new AuthAPI();

    authApi.signup(data);

    expect(httpTransportMock.post.calledWith('/signup', data)).to.eq(true);
  });

  it('should call /signin on signin method with passed data', () => {
    const authApi = new AuthAPI();

    authApi.signin(data);

    expect(httpTransportMock.post.calledWith('/signin', data)).to.eq(true);
  });

  it('should call /logout on logout method', () => {
    const authApi = new AuthAPI();

    authApi.logout();

    expect(httpTransportMock.post.calledWith('/logout')).to.eq(true);
  });

  it('should call /user on get method', () => {
    const authApi = new AuthAPI();

    authApi.read();

    expect(httpTransportMock.get.calledWith('/user')).to.eq(true);
  });
});
