import { mergeDeep } from '../utiles/mergeDeep';
import { TransportInterface } from '../../interfaces';

class Client {
  public request: (path: string, options: {}) => Promise<Object>; // eslint-disable-line no-unused-vars
  private transport: TransportInterface;
  private opt: {}
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
      this.opt = mergeDeep(baseOptions, options)
      const { isMultiPart } = this.opt
      if (isMultiPart) {
        delete this.opt.headers['Content-Type']
      }
      return this.transport.send(`${baseUrl}${path}`, this.opt)
    }
  }

  cleanOpt() {
    this.opt = {}
  }
}

export { Client }
