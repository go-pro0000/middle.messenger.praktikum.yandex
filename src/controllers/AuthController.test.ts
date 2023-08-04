import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';
import type AuthAPIType from '../api/AuthAPI';
import type BaseApiType from '../api/BaseAPI';
import type AuthControllerType from './AuthController';
import { SignUpData } from '../api/AuthAPI';
import Router from '../utils/Router';

const httpTransportMock = {
  get: sinon.stub(),
  post: sinon.stub(),
};

const state = {};
const storeMock = {
  set: sinon.stub(),
  getState: () => state,
};

const route = '';
// @ts-ignore
const router = { go: route } as typeof Router;

const { default: BaseApi } = proxyquire('../api/BaseAPI', {
  '../utils/HTTPTransport': {
    default: class {
      get = httpTransportMock.get;

      post = httpTransportMock.post;
    },
  },
}) as { default: typeof BaseApiType};

const { default: AuthAPI } = proxyquire('../api/AuthAPI', {
  '../api/BaseAPI': {
    default: BaseApi,
  },
}) as { default: typeof AuthAPIType};

const { default: AuthController } = proxyquire('./AuthController', {
  '../api/AuthAPI': {
    default: AuthAPI,
  },
  '../utils/Store': {
    Store: class {
      set = storeMock.set;

      getState = storeMock.getState();
    },
  },
  '../utils/Router': {
    Router: router,
  },
}) as { default: typeof AuthControllerType};

describe('AuthController', () => {
  const data: SignUpData = {
    first_name: 'test',
    second_name: 'test',
    login: 'test',
    email: 'test',
    password: 'test',
    phone: 'test',
  };

  describe('signup method', () => {
    it('should call api.signup method with passed data', () => {
      AuthController.signup(data);

      expect(httpTransportMock.post.calledWith('/signup', data)).to.eq(true);
    });
  });

  describe('signin method', () => {
    it('should call api.signin method with passed data', () => {
      AuthController.signin(data);

      expect(httpTransportMock.post.calledWith('/signin', data)).to.eq(true);
    });
  });

  describe('logout method', () => {
    it('should call api.logout method', () => {
      AuthController.logout();

      expect(httpTransportMock.post.calledWith('/logout')).to.eq(true);
    });
  });
});
