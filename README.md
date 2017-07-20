## Installation

`npm install koa-hooks`

## Tests

`npm test`

## Examples :

```bash
/**
 * 1 ctx: koa上下文 next: 中间件控制 cb: 回调函数 返回前端信息
 * 2 执行对应的方法前触发before after进行链式调用 hooks函数命名需要约定含有'before' 'after' 
 * 3 根据返回值data的boolean状态值确定是否终止中间件
 * 4 执行流程: sendMessageCode -> beforeSendMessageInvokeValidate -> beforeSendMessageInvokeValidate -> cb
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

/**
 * cb函数: ctx: koa上下文 data: 接口返回数据
 */
const response = (ctx, data = {}) => {
  switch (data.code ? data.code : 0) {
    case 0:
      ctx.response.status = 200
      break
    default:
      ctx.response.status = 400
      break
  }

  ctx.body = {
    code: data.code ? data.code : 0,
    message: data.message ? data.message : '请求成功',
    data: data.data || {} 
  }
}
```

## Contributors

 - qian.zhang

## MIT Licenced

