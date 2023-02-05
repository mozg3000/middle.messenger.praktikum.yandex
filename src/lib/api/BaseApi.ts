import {Client, HTTPTransport} from '../http';

abstract class BaseApi {
  protected client: Client = new Client(new HTTPTransport())
}

export { BaseApi }
