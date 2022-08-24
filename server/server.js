const express = require('express')
const app = express()
app.use(express.json()) // accessing the JSON body on req.body
  
// POST method used
app.post("/validate-credit-card", (req, res) => {
  
  // global variables
  const { body } = req
  let resJSON = {}
  const expiryDate = body.expiryDate
  const cvv = body.cvv
  const pan = body.pan

  // Calling functions which validate CC categories
  resJSON = validateExpiryDate(expiryDate, resJSON)
  resJSON = validateCVV(pan, cvv, resJSON)
  resJSON = validatePan(pan, resJSON)

  // create isValid property on resJSON object and set to true or false
  if(resJSON.expiryError || resJSON.cvvError || resJSON.panError) {
    resJSON.isValid = false
  } else {
    resJSON.isValid = true
  }

  res.json(resJSON)
})

// TODO 1. The expiry date of the credit card (year and month) must be AFTER present time
const validateExpiryDate = (expiryDate, resJSON) => {
  if(expiryDate.length === 4) {
    const month = expiryDate.slice(0, 2)
    const year = expiryDate.slice(2, 4)
    const currentDate = Date.now()
    const ccDate = new Date(`20${year}-${month}-01`)

    if (ccDate.toString() === 'Invalid Date') {
      resJSON.expiryError = 'expiryDate must be 4 digits in format mmyy'
    }
    if(currentDate >= ccDate){
      resJSON.expiryError = 'expiryDate must be in the future'
    }
  } else {
    resJSON.expiryError = 'expiryDate must be four digits'
  }

  return resJSON
}

// TODO 2. The CVV (security code) of the credit card must be exactly 3 digits long
// Unless it’s an American Express card, in which case the CVV must be exactly 4 digits long
// American Express are cards whose PAN (card numbers) starts with either “34” or “37”
// function checks pan length and that it is a digit
const validateCVV = (pan, cvv, resJSON) => {
  const panFirstTwoDigits = pan.slice(0, 2)
  if(panFirstTwoDigits === '34' || panFirstTwoDigits === '37') {
    if(cvv.length !== 4 || isNaN(cvv)) {
      resJSON.cvvError = 'CVV must be four digits'
    }
  } else if(cvv.length !== 3 || isNaN(cvv)) {
    resJSON.cvvError = 'CVV must be three digits'
  }

  return resJSON
}

// TODO 3. The PAN (card number) is between 16 and 19 digits long
// function checks pan length and that it is a digit
const validatePan = (pan, resJSON) => {
  if(pan.length < 16 || pan.length > 19 || isNaN(pan)) {
    resJSON.panError = 'Credit card number must be between 16 and 19 digits long'
  }

  return resJSON
}

// TODO 4. Last digit of the PAN (card number) is checked using Luhn’s algorithm

app.listen(5003, () => { console.log("server started on port 5003") })