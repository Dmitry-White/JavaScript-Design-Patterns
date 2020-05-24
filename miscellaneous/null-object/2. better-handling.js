/*
  Each line of code is constantly on guard, 
  as though it can’t trust the lines before it.
  So how do we nuke these flow control constructs?

  Let’s try using swallow() as a higher-order function 
  that runs some code that could potentially blow up. 
  If it does, it suppresses the error and 
  instead returns the result of another functionin place of the try…catch
  and if…else statements.
  
  If jwt.verify() throws a TokenExpiredError or JsonWebTokenError,
  we’ll catch it and instead return null to make it mirror the old behavior.
*/

(() => {
  const swallow = (type) => (fail) => (fn) => (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      if (!(error instanceof type)) { throw error; }
      return fail(error);
    }
  };

  const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

  const checkToken = (req, res, next) => {
    const payload = compose(
      swallow(JsonWebTokenError)(() => null),
      swallow(TokenExpiredError)(() => null),
    )(jwt.verify)(req.token, 's3cr3t');

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
