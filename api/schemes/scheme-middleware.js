/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = () => async (req, res, next) => {
  const { scheme_id} = req.params;
  try {
    await db("schemes").where({ scheme_id}).first();
    req.schemeSearch = { scheme_id};
    next()
  } catch {
    res
      .status(404)
      .json({ message: `scheme with scheme ID ${scheme_id} not found`})
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const name = req.body.scheme_name
  if (!name || name.length === 0 || typeof name !== "string") {
    res.status(400).json({ 
      message: `invalid scheme_name`
    })
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.body.instructions
  const stepNumber = req.body.step_number

  if (!instructions || instructions.length === 0 || stepNumber <0) {
    res.status(400).json({
      message: "Invalid step"
    })
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
