import { TransportInterface } from '../../interfaces/TransportInterface';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

function queryStringify(data: { [key:string]: string }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}

type OptionsProps = {
  timeout: number,
  method: string,
  headers: {[key:string]: string},
  data: any,
  isMultiPart: boolean
}

type HTTPRequest = (url: string, options: Partial<OptionsProps>, timeout?: number) => Promise<Object> // eslint-disable-line no-unused-vars
type HTTPMethod = (url: string, options: Partial<OptionsProps>) => Promise<Object> // eslint-disable-line no-unused-vars

class HTTPTransport implements TransportInterface {
  get: HTTPMethod = (url, options) => {
    return this.send(url, {...options, method: METHODS.GET}, options.timeout);
  }

  post: HTTPMethod = (url, options) => {
    return this.send(url, {...options, method: METHODS.POST}, options.timeout);
  }

  put: HTTPMethod = (url, options) => {
    return this.send(url, {...options, method: METHODS.PUT}, options.timeout);
  }

  delete: HTTPMethod = (url, options) => {
    return this.send(url, {...options, method: METHODS.DELETE}, options.timeout);
  }

  send: HTTPRequest = (url, options , timeout = 5000) => {
    const { headers = {}, method, data, isMultiPart } = options
    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('No method')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      )

      xhr.withCredentials = true
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = function() {
        if (xhr.status === 200) {
          let r
          try {
            r = JSON.parse(xhr.response)
          } catch (e) {
            r = xhr.response
          }
          resolve(r)
        } else {
          reject(xhr)
        }
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        if (isMultiPart) {
          xhr.send(data)
        } else {
          xhr.send(JSON.stringify(data))
        }
      }
    })
  }
}

export { HTTPTransport, HTTPRequest }
