
const METHOD_COLOR = '#44f';
const EVENT_COLOR = '#0f0';
const ERROR_COLOR = '#f00';

const TAG_STYLE = color => `background-color: ${color}; color: #fff`;
const METHOD_STYLE = color => `color: ${color}`;
const DIRECTION_STYLE = color => `font-weight: 900; color: ${color}`;

export class WSEndpoint {
  constructor(url) {
    this.handlers = {};
    this.requests = {};
    this.requestId = 0;
    this.deffered = [];

    const l = new URL(url, window.location);
    l.protocol = l.protocol === 'https:' ? 'wss' : 'ws';
    url = l.href;

    const ws = this.ws = new WebSocket(url);
    ws.onopen = () => {
      this.deffered.forEach(args => {
        this._call(...args);
      });
      delete this.deffered;
    };
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if( msg.requestId ) {
        const hh = this.requests[msg.requestId];
        delete this.requests[msg.requestId];
        if( msg.status === 0 ) {
          if( hh.log ) {
            const c = METHOD_COLOR;
            console.log(`%c API %c < %c[${msg.requestId}] ${hh.method}`, TAG_STYLE(c), DIRECTION_STYLE(c), METHOD_STYLE(c), msg.data ?? ' ');
          }
          hh.resolve(msg.data);
        } else {
          if( hh.log ) {
            const c = ERROR_COLOR;
            console.log(`%c API %c < %c[${msg.requestId}] ${hh.method}`, TAG_STYLE(c), DIRECTION_STYLE(c), METHOD_STYLE(c), msg.error ?? ' ');
          }
          hh.reject(msg.error);
        }
      } else if( msg.event ) {
        const hh = this.handlers[msg.event];
        if( this._log(msg.event) ) {
          const c = EVENT_COLOR;
          console.log(`%c API %c < %c${!hh ? '[!]' : ''} ${msg.event}`, TAG_STYLE(c), DIRECTION_STYLE(c), METHOD_STYLE(c), msg.data ?? ' ');
        }
        if( hh ) {
          hh.forEach(func => func(msg.data));
        } else {
          console.warn(`Event '${msg.event}' not handled`);
        }
      }
    };
  }

  _log(method) {
    return this.log?.[method] ?? this.log?.__all;
  }

  reconnect() {
    const ws = new WebSocket(this.ws.url);
    ws.onopen = this.ws.onopen;
    ws.onmessage = this.ws.onmessage;
    ws.onclose = this.ws.onclose;
    ws.onerror = this.ws.onerror;
    this.ws = ws;
    this.deffered = [];
  }

  checkAlive() {
    if( this.ws.readyState > 1 ) {
      // Closing or closed --> create new connection
      this.reconnect();
    }
  }

  call(method, params) {
    const promise = new Promise((resolve, reject) => {
      this.checkAlive();

      switch( this.ws.readyState ) {
        case 0: {
          this.deffered.push([method, params, resolve, reject]);
          return;
        }

        case 1: {
          this._call(method, params, resolve, reject);
          return;
        }

        default: {
          console.error('Unexpected connection state: ' + this.ws.readyState);
        }
      }
    });
    if( this.__catch ) {
      promise.catch(e => {
        this.__catch.forEach(fn => fn(e));
      });
    }
    return promise;
  }

  _call(method, params, resolve, reject) {
    const log = this._log(method);
    const requestId = ++this.requestId;
    this.requests[requestId] = {resolve, reject, method, log};
    if( log ) {
      const c = METHOD_COLOR;
      console.log(`%c API %c > %c[${requestId}] ${method}`, TAG_STYLE(c), DIRECTION_STYLE(c), METHOD_STYLE(c), params ?? ' ');
    }
    this.ws.send(JSON.stringify({requestId, method, params}));
  }

  async on(event, func, subscribe) {
    if( func instanceof Function ) {
      (this.handlers[event] || (this.handlers[event] = [])).push(func);
      return true;
    }
    if( subscribe ) {
      return this.call('#subscribe', {event});
    }
  }

  catch(fn) {
    if( fn instanceof Function ) {
      (this.__catch || (this.__catch = [])).push(fn);
    }
  }

  log(opt) {
    this.log = typeof opt === 'boolean' ? {__all: opt} : opt;
  }
}


export function createWSProxy(endpoint) {
  if( !(endpoint instanceof WSEndpoint) ) {
    endpoint = new WSEndpoint(endpoint);
  }

  const api = {
    on: endpoint.on.bind(endpoint),
    catch: endpoint.catch.bind(endpoint),
    log: endpoint.log.bind(endpoint)
  };

  return new Proxy(api, {
    get(target, method) {
      if( method in target ) {
        return target[method];
      }

      return target[method] = (params) => {
        return endpoint.call(method, params);
      };
    }
  });
}

