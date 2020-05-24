/*
  What about the remaining conditionals?
  It would help if we could go ahead and destructure the payload’s user property.
  Then the following code could be less defensive about the shape of payload.

  Well if a TokenExpiredError/JsonWebTokenError is thrown,
  swallow() will return null, which isn’t an object and can’t be destructured.
  So what if instead of returning null,
  we returned a benign value that has the shape of a valid payload,
  such as an object with a user property?
  Then even if an exception is thrown, 
  we can be sure that the payload will have the right shape.

  This refactor has helped us discover the boundary 
  we should have seen all along: all that try…catch and if…else nonsense
  was just about making a version of jwt.verify()
  that behaved a little differently — 
  just the sort of thing higher-order functions do so well.

  With all the noise out of the way, we can confidently reason
  that next() will only be called if there’s a user, 
  so we can move it into the if clause and eliminate the early return in the else.
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

  const rescueWith = (type) => (fallback) => swallow(type)(() => fallback);

  const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

  // ----------------- Null Object --------------------
  class User {
    constructor({ id, name, email }) {
      this.name = name;
      this.email = email;
      this.id = id || generateId();
    }
  }
  
  class NullUser extends User {
    constructor() {
      super({
        id: '00000000',
        name: 'NullUser',
        email: 'null@app.com'
      });
    }
  }

  const nullPayload = { user: null };
  // -------------------------------------------

  const safeVerifyJWT = compose(
    rescueWith(JsonWebTokenError)(nullPayload),
    rescueWith(TokenExpiredError)(nullPayload),
  )(jwt.verify);

  const checkToken = (req, res, next) => {
    const { user } = safeVerifyJWT(req.token, 's3cr3t');

    return user
      ? (req.user = user, next())
      : res.status(401).send('Bad token.');
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
