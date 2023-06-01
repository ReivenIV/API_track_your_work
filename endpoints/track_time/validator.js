// ---------------------------
//    track time validator
// ---------------------------

// const validator = (req, res, next) => {
//     if (req.body.drug_name === undefined) {
//       let err = new Error(JSON.stringify({ validator: "drug_name is undefined" }));
//       err.statusCode = 400;
//       return next(err);
//     }

//   if (typeof req.body.time_start !== 'string') {
//     let err = new Error(
//       JSON.stringify({ validator: 'time_start must be text format' }),
//     );
//     err.statusCode = 400;
//     return next(err);
//   }

//     if (req.body.quantity_mg === undefined) {
//       let err = new Error(JSON.stringify({ validator: "quantity_mg is undefined" }));
//       err.statusCode = 400;
//       return next(err);
//     }

//     if (typeof req.body.quantity_mg !== "number") {
//       let err = new Error(JSON.stringify({ validator: "quantity_mg must be a  float" }));
//       err.statusCode = 400;
//       return next(err);
//     }
// };

// module.exports = validator;

// class validatorModel {
//   static validator(req, res, next) {
//     // Perform user validation logic here
//     // You can access request body, headers, or any other relevant data
//     // Use 'req', 'res', and 'next' to handle the validation process

//     // Example: Validate if the required fields are present in the request body
//     if (!req.body.email || !req.body.password) {
//       return res.status(400).json({ msg: 'Missing required fields' });
//     }

//     // Example: Validate the email format
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     if (!emailRegex.test(req.body.email)) {
//       return res.status(400).json({ msg: 'Invalid email format' });
//     }

//     // If the validation passes, call 'next()' to proceed to the next middleware or route handler
//     next();
//   }

//   // Add more middleware functions as needed
// }
