// ---------------------------
//    track time validator
// ---------------------------

const validator = (req, res, next) => {
  //   if (req.body.drug_name === undefined) {
  //     let err = new Error(JSON.stringify({ validator: "drug_name is undefined" }));
  //     err.statusCode = 400;
  //     return next(err);
  //   }

  if (typeof req.body.time_start !== 'string') {
    let err = new Error(
      JSON.stringify({ validator: 'time_start must be text format' }),
    );
    err.statusCode = 400;
    return next(err);
  }

  //   if (req.body.quantity_mg === undefined) {
  //     let err = new Error(JSON.stringify({ validator: "quantity_mg is undefined" }));
  //     err.statusCode = 400;
  //     return next(err);
  //   }

  //   if (typeof req.body.quantity_mg !== "number") {
  //     let err = new Error(JSON.stringify({ validator: "quantity_mg must be a  float" }));
  //     err.statusCode = 400;
  //     return next(err);
  //   }
};

module.exports = validator;
