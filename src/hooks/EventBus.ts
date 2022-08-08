export class EventBus {
  private _events: Map<string, Function | Function[]> = new Map();

  on(type: string, fn: Function) {
    const handler = this._events.get(type);
    if (!handler) {
      this._events.set(type, fn);
    } else if (typeof handler === 'function') {
      this._events.set(type, [handler, fn]);
    } else {
      handler.push(fn);
    }
  }
  ons(types: string[], fun: Function) {
    types.forEach((type) => this.on(type, fun));
  }

  emit(type: string, ...args: any[]) {
    console.log('emit:', type, ...args);
    const handler = this._events.get(type);

    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; ++i) {
        if (args.length > 0) {
          handler[i].apply(this, args);
        } else {
          handler[i].call(this);
        }
      }
    } else {
      if (args.length > 0) {
        handler?.apply(this, args);
      } else {
        handler?.call(this);
      }
    }
    return true;
  }

  off(type: string, fn: Function) {
    const handler = this._events.get(type);
    if (typeof handler === 'function') {
      this._events.delete(type);
    } else {
      handler?.splice(
        handler.findIndex((e) => e === fn),
        1
      );
    }
  }

  once(type: string, fn: Function) {
    const _self = this;
    function handler() {
      _self.off(type, handler);
      fn.apply(null, arguments);
    }
    this.on(type, handler);
  }
}

export const AppEvent = new EventBus();
