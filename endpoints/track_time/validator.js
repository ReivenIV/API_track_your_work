// ---------------------------
//    track time validator
// ---------------------------

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['x-access-token'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token === undefined) {
//     res.status(404).json({ msg: 'error, token not found' });
//   } else {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         res.status(401).json({ msg: 'error token not valid' });
//       } else {
//         req.id = decoded.userId;
//         next();
//       }
//     });
//   }
// };

// module.exports = authenticateToken;
