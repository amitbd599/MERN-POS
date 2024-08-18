const jwt = require("jsonwebtoken");

exports.EncodeToken = (data) => {
  let key = process.env.JWT_KEY;
  let expire = process.env.JWT_Expire_Time;
  let payload = { email: data.email, user_id: data._id };
  return jwt.sign(payload, key, { expiresIn: expire });
};
exports.DecodeToken = (token) => {
  try {
    let key = process.env.JWT_KEY;
    let decoded = jwt.verify(token, key);

    return decoded;
  } catch (err) {
    return null;
  }
};
