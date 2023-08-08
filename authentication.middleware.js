
const jwt = require('jsonwebtoken');

function authenticateMiddleware(req, res, next) {
    const token = req.header('Authorization');
  console.log("toke",token)
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decodedToken = jwt.verify(token, 'secret@1998');
      console.log("decodedToken",decodedToken.userId)

      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      console.log("error in err middle",error)
      res.status(401).json({ error: 'Unauthorized' });
    }
  }

  module.exports=authenticateMiddleware