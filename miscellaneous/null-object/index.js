/*
  We’re making authenticated HTTP requests to an Express backend
  and supplying a special token called a JSON Web Token.
  As long as the token is valid, the backend lets us use any of its APIs.
  But if the token is missing some information, has expired,
  or has been tampered with, the backend halts the request in its tracks.

  The function responsible for this guard behavior is
  a middleware function called checkToken().
  It tries to decode the contents of the JSON Web Token, called the payload.
  If the token is successfully decoded, 
  it stores the user information on the request object
  and invokes next() to continue. 
  But if the token is bad, it halts the request
  and immediately responds with a 401 Unauthorized status code.

  But a lot of other things can go wrong. 
  A client could supply an expired token, or they might tamper with it;
  in either case, the jwt.verify() function throws an exception.
  Right now, the checkToken() function is completely oblivious 
  to these potential errors.
*/


(() => {
  const checkToken = (req, res, next) => {
    const payload = jwt.verify(req.token, 's3cr3t');

    if (payload && payload.user) {
      req.user = payload.user;
    } else {
      res.status(401).send('Bad token.');
      return;
    }

    next();
  };

  makeRequestWithToken('g00d_t0k3n');
  // => '200: Welcome to the backend.'
  makeRequestWithToken('3mpt1_t0k3n');
  // => '401: Bad token.'
  makeRequestWithToken('0ld_t0k3n');
  // => TokenExpiredError: jwt expired
  makeRequestWithToken('f@k3_t0k3n');
  // => JsonWebTokenError: jwt malformed
})();