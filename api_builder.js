const hooks = require('hooks')

class ApiHooks {
  
  constructor(ctx, next, cb) {
    this._ctx = ctx
    this._next = next
    this._cb = cb
    this._listenerTree = {}
    this.addListenerTree()     
  }
  
  addListenerTree() {
    for (let fn in hooks) {
      this[fn] = hooks[fn]
    }
  }
  
  addHooks(listeners) {
    const self = this
    
    try {
      listeners.map(listener => {
        const [method, hooksFn] = listener.split('.')
        if(hooksFn.match('before')) self.addFn(method, hooksFn, 'pre')
        if(hooksFn.match('after')) self.addFn(method, hooksFn, 'post')
      })
    } catch (err) {
      console.log('err:', err)  
    }

  }
 
 addFn(method, hooksFn, hook) {
    const self = this
    self[hook](method, async (next) => {
      await self[hooksFn](self._ctx, next, self._cb)
    })
  }

}

module.exports = ApiHooks