import http from 'http';
http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('hello world this is nodemon');
    res.end();
  })
  .listen(8080);
