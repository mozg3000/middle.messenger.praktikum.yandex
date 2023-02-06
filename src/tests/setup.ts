import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from './apiMock';

beforeAll(() => server.listen()) //eslint-disable-line no-undef
afterEach(() => server.resetHandlers()) //eslint-disable-line no-undef
afterAll(() => server.close()) //eslint-disable-line no-undef
