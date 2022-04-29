const jwt = require('jsonwebtoken')

const secret = "mysecretssshhhh"
const expiration ='2h'

module.exports = {
    
    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
        //console.log(token)
        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
        //console.log("=====>" ,token)
        // if no token, return request object as is
        if (!token) {
          return req;
        }
      
        try {
          //console.log("in the try block")
          // decode and attach user data to request object
          const { data } = jwt.verify(token.trim(), secret, { maxAge: expiration });
         // console.log("passed the data")
          req.user = data;
        } catch {
          console.log('Invalid token');
        }
      
        // return updated request object
        return req;
      },
      signToken : function ({username, email, _id, userType}){
        const payload  = {username, email, _id, userType}
        console.log("payload===>",payload)
        return jwt.sign({data:payload}, secret, {expiresIn:expiration})
    }

}