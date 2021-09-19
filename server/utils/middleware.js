const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.exp) {
        return response.status(401).json({ error: 'token missing or invalid' });
      }
    } catch {
      response.status(401).json({ error: 'token missing or invalid' });
    }
    request.token = authorization.substring(7);
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  tokenExtractor,
  unknownEndpoint
};