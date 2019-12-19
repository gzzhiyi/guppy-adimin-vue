const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const appMockDB = jsonServer.router(require('../mock/db/app.json'))
const exampleMockDB = jsonServer.router(require('../mock/db/example.json'))

server.use(middlewares)
server.use(
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json({ limit: '10mb', extended: true })
)

server.post('/index.php', function (req, res) {
  switch (req.body._m) {
    case 'login':
      res.jsonp(appMockDB.db.get('login'))
      break
    case 'get_user_info':
      res.jsonp(appMockDB.db.get('get_user_info'))
      break
    case 'add':
      res.jsonp(exampleMockDB.db.get('add'))
      break
    case 'update':
      res.jsonp(exampleMockDB.db.get('update'))
      break
    case 'list':
      res.jsonp(exampleMockDB.db.get('list'))
      break
  }
})

server.listen(3000, function () {
  console.log('JSON-Server is running...')
})
