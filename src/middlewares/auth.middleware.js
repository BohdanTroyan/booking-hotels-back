const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    res.status(401).send();
  }

  const verified = jwt.verify(token, 'secret');

  if (!verified) {
    res.status(401).send('Invalid Token');
  }

  req.user = verified;
  next();
};

module.exports = {
  verifyToken,
};
