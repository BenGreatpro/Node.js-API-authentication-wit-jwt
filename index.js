const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        mesaage: 'Welcome the Api'
    });
});

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
      if (err) {
        res.sendStatus(403)
      } else {
        res.json({
            message: 'post created...',
            authData
        }); 
    }
    });
})

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'bright',
    email: 'bright@gmail.com'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
        token
    });
  });
});

function verifyToken(req, res, next){
const bearerHeader = req.hearders['authorization'];
if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    nexr();
} else {
    res.sendStatus(403);
}
}

app.listen(6000, () => console.log('server is active'))