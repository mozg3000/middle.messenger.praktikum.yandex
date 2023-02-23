import { mergeDeep } from '../utiles/mergeDeep';
import { TransportInterface } from '../../interfaces';

class Client {
  public request: (path: string, options: {}) => Promise<Object>; // eslint-disable-line no-unused-vars
  private transport: TransportInterface;
  private opt: {
    method: 'GET'|"POST"|"PUT"|"PATCH"|"DELETE"
    headers: {
      [key:string]:string,
    },
    isMultiPart: boolean
  }
  constructor(transport: TransportInterface) {
    this.transport = transport;
    this.opt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application-json'
      },
      isMultiPart: false
    }
    this.request = this.createRequest(
      String(process.env.API_ENDPOINT), // eslint-disable-line no-undef
      this.opt
    )
  }

  createRequest (baseUrl: string, baseOptions: {} = {}) {
    return  (path: string, options: {} = {}) => {
      //@ts-ignore
      this.opt = mergeDeep(baseOptions, options)
      const { isMultiPart } = this.opt
      if (isMultiPart) {
        delete this.opt.headers['Content-Type']
      }
      return this.transport.send(`${baseUrl}${path}`, this.opt)
    }
  }
}

export { Client }
