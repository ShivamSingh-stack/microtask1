let tokens = ["roastking", "shivam", "shivamsingh"];

const authenticate = (req) => {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.headers["token"];
    if (!token) {
      return false;
    }
  
    if (tokens.indexOf(token) === -1) return false;
    return true;
};

module.exports = authenticate