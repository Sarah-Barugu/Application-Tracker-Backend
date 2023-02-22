const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');



const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: 'Authentication invalid'
    });
  }
  try {
    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    // console.log(payload);

    // Attach the user and his permissions to the req object
    req.user = payload.id
    // console.log(req.user,  payload.id);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Authentication invalid'
    });
  }
};

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const currentUser = await User.findById(req.user)
    req.user = currentUser;
    // console.log(req.user,req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: 'Unauthorized to access this route'
      });
    }
    next();
  };
};


module.exports = { authenticateUser, authorizeRoles};
