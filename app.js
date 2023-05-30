const Koa = require('koa')
const koaRouter = require('koa-router')
const json = require('koa-json')

const path = require('path')
const serve = require('koa-static')
const historyApiFallback = require('koa2-history-api-fallback')

const koaBodyparser = require('koa-bodyparser')
const routesObj = require('./server/routes.js')
/*
const StaticServer = require('./server/api/class/StaticServer')
*/

//const {access} = require('./logger')

const app = new Koa()
const router = koaRouter()

app.use(koaBodyparser())
app.use(json())

/*const server = new StaticServer()
server.run()*/

/* function writeLog(data) {
    fs.appendFile('./log.txt', data, 'utf8', e => {
    })
} */

app.use(async (ctx, next) => {
    const start = new Date()
    const result = await routesObj.verify(ctx)
    if (typeof result === 'object') {
        ctx.state.userInfo = result
        await next()
    } else {
        //access.info('【' + result + '】')
        ctx.body = {
            success: false,
            data: {},
            message: result
        }
    }
    const ms = new Date() - start
    //access.info(start.toLocaleString() + ' ' + ctx.method + ' ' + ctx.url + ' ' + ms + 'ms \r\n')
    console.log('%s %s - %s', start.toLocaleString(), ctx.method, ctx.url, ms)
})

app.on('error', function (err, ctx) {
   //access.info('server error' + err + '\n' + JSON.stringify(ctx) + '\r\n')

    ctx.body = {
        success: false,
        data: ctx,
        message: err
    }
    console.log('server error', err)
})

router.use('/api', routesObj.routes.routes())

app.use(router.routes())
app.use(historyApiFallback())
app.use(serve(path.resolve('dist')))

app.listen(3001, () => {
    console.log('Koa is listening Api port 3001')
})

module.exports = app
