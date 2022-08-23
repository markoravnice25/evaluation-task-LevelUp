const express = require('express')
const app = express()
app.use(express.json()) // this is the reason we have access the the JSON body on req.body
  

app.post("/validate-credit-card", (req, res) => {
  const { body } = req
  let resJSON = {}
  //console.log("body:", body.expiryDate)
  const expiryDate = body.expiryDate
  const cvv = body.cvv
  const pan = body.pan


  if(expiryDate.length === 4) {
    const month = expiryDate.slice(0, 2)
    const year = expiryDate.slice(2, 4)

    const currentDate = Date.now()
    const ccDate = new Date(`20${year}-${month}-01`)
    console.log('month:', month, 'year:', year)
    console.log(currentDate < ccDate)
    if(currentDate >= ccDate){
      resJSON.expiryError = 'expiryDate must be in the future'
    }
  } else {
    resJSON.expiryError = 'expiryDate must be four digits'
  }

  const panFirstTwoDigits = pan.slice(0, 2)
  if(panFirstTwoDigits === '34' || panFirstTwoDigits === '37') {
    if(cvv.length !== 4) {
      resJSON.cvvError = 'CVV must be four digits'
    }
  } else if(cvv.length !== 3) {
    resJSON.cvvError = 'CVV must be three digits'
  }

  if(pan.length < 16 || pan.length > 19) {
    resJSON.panError = 'Credit card number must be between 16 and 19 digits long'
  }
  
  if(resJSON.expiryError || resJSON.cvvError || resJSON.panError) {
    resJSON.isValid = false
  } else {
    resJSON.isValid = true
  }

  res.json(resJSON)
})

app.listen(5003, () => { console.log("server started on port 5003") })