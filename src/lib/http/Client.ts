import { mergeDeep } from '../utiles/mergeDeep';
import { TransportInterface } from '../../interfaces';

class Client {
  public request: (path: string, options: {}) => Promise<Object>; // eslint-disable-line no-unused-vars
  private transport: TransportInterface;
  constructor(transport: TransportInterface) {
    this.transport = transport;
    this.request = this.createRequest(
      process.env.API_ENDPOINT, // eslint-disable-line no-undef
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application-json'
        }
      }
    )
  }

  createRequest (baseUrl: string, baseOptions: {} = {}) {
    return  (path: string, options: {} = {}) => {
      return this.transport.send(`${baseUrl}${path}`, mergeDeep(baseOptions, options))
    }
  }
}

export { Client }
