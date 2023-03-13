import { jsonServer } from 'json-server'
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// db.json를 조작하기 위해 lowdb를 사용
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.delete('/todos/id', (req, res) => {
  // lowdb를 사용해서 db.json에서 completed: true인 todo를 제거
  db.get('posts')
    .remove({ id: 1 })
    .write();

  // todos를 응답
  res.send(db.get('posts').value());
})

// Use default router
server.use(router);

server.listen(8000, () => {
  console.log('JSON Server is running')
});