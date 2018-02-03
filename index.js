import http from 'http'
import request from 'request'

http.createServer((req, res) => {
  request({url: 'https://wovn.io', encoding: null}, (err, res, data) => {
    console.log(res)
  })

  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World\n')
}).listen(process.env.PORT || 4646)

console.log('http://localhost:4646')
