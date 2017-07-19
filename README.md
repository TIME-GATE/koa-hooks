## Installation

`npm install koa-hooks`

## Tests

`npm test`

## Examples :

```bash
/**
 * 1 ctx: koa上下文 next: 中间件控制 cb: 回调函数 返回前端信息
 * 2 执行对应的方法前触发before after
 * 3 根据返回值data的boolean值确定是否终止中间件
 */
const Api = require('koa-hooks').Api
const DemoService = require('./demo_service')

class DemoApi extends Api {
  constructor(ctx, next, cb){
    super(ctx, next, cb)
    this.addHooks([
      'sendMessageCode.beforeSendMessageInvokeValidate',
      'sendMessageCode.beforeSendMessageCheckSign'
    ])
  }

  async beforeSendMessageInvokeValidate(ctx, next, cb) {
    const data = await DemoService.beforeSendMessageInvokeValidate(ctx, next)
    data ? cb(ctx, data) : await next()  
  }
  
  async beforeSendMessageCheckSign(ctx, next, cb) {
    const data = await DemoService.beforeSendMessageCheckSign(ctx, next)
    data ? cb(ctx, data) : await next()  
  }

  async sendMessageCode(ctx, next, cb) {
    const data = await DemoService.sendMessageCode(ctx, next)
    data ? cb(ctx, data) : await next() 
  }

}

module.exports = (ctx, next, cb) => new DemoApi(ctx, next, cb)
```

## Contributors

 - qian.zhang

## MIT Licenced

