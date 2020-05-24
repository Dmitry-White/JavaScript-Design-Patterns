/*
  We should never allow a known exception to go uncaught,
  otherwise the backend’s response will just hang.
  So instead, we need to catch any JWT-related errors
  and respond with a 401 status code.

  We can wrap try…catch around the verify() call,
  but an unqualified catch is almost always a bug.
  We must only catch error types we intend to handle.
  We’ll use an if…else statement to rethrow the error
  if it isn’t a TokenExpiredError or JsonWebTokenError.

  This is the correct way to handle all these edge cases,
  but now checkToken() is swimming in flow control constructs:
  early returns, try…catch, throw, 
  and an unhealthy dose of if…else statements too.
*/

(() => {
  const checkToken = (req, res, next) => {
    let payload;
    try {
      payload = jwt.verify(req.token, 's3cr3t');
    } catch (error) {
      if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
        /* Suppress the error */
      } else {
        throw error;
      }
    }

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