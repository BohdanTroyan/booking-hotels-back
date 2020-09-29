const jwt = requite("jsonwebtoken");

exports.module = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "fidfsl");
    req.user = verified;
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
