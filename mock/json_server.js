const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const appMockDB = jsonServer.router(require('../mock/db/app.json'))
const projectMockDB = jsonServer.router(require('../mock/db/project.json'))
const sourceMockDB = jsonServer.router(require('../mock/db/source.json'))

server.use(middlewares)
server.use(
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json({ limit: '10mb', extended: true })
)

server.post('/index.php', function (req, res) {
  switch(req.body._m) {
    case 'gologin':
      res.jsonp(appMockDB.db.get('login'))
      break
    case 'get_token':
      res.jsonp(appMockDB.db.get('get_token'))
      break
    case 'get_user_info':
      res.jsonp(appMockDB.db.get('get_user_info'))
      break
    case 'get_my_depart_list':
      res.jsonp(appMockDB.db.get('get_my_depart_list'))
      break
    case 'proj_add':
      res.jsonp(projectMockDB.db.get('project_add'))
      break
    case 'proj_update':
      res.jsonp(projectMockDB.db.get('project_update'))
      break
    case 'proj_list':
      res.jsonp(projectMockDB.db.get('project_list'))
      break
    case 'source_upload':
      res.jsonp(sourceMockDB.db.get('source_upload'))
      break
    case 'source_list':
      res.jsonp(sourceMockDB.db.get('source_list'))
      break
  }
})

server.listen(3000, function () {
  console.log('JSON-Server is Running')
})
