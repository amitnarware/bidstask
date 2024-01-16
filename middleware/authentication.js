const jwt = require("jsonwebtoken");
const  SECRET_KEY  = "1324"; 

function authenticateUser(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
}

module.exports = { authenticateUser };
