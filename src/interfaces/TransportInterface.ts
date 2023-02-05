import { HTTPRequest } from '../lib/http/HTTPTransport';

interface TransportInterface {
  send: HTTPRequest
}

export { TransportInterface }
