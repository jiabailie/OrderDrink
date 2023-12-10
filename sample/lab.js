import express from 'express';
const app = express();
app.get('/course/:id/:name', (req, res) => {
  res.send('course id: ' + req.params.id + ' and course name: ' + req.params.name);
});
app.listen(3000);
