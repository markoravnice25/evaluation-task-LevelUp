import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios'

function App() {

  const [formData, setFormData] = useState({
    pan: '',
    expiryDate: '',
    cvv: '',
  })

  const [errors, setErrors] = useState(false)
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
    setStatus('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/validate-credit-card', formData)
      console.log(response)
      if(response.data.isValid) {
        setStatus(' ✅')
      } else {
        setErrors(response.data)
        setStatus(' ❌')
      }
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  }

  return (
    <section className='form-page'>
      <Container>
        <Row>
          <form onSubmit={handleSubmit}>
          <h1>Credit Card Check</h1>
            {/* CC number */}
            <label htmlFor="pan">CC number</label>
            <input type="text" name='pan' className='input' placeholder='16-19 digits' value={formData.pan} onChange={handleChange} />
            {errors.panError && <p className='text-danger'>{errors.panError}</p>}
            {/* Expiry Date */}
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="text" name="expiryDate" className='input' placeholder='mmyy' value={formData.expiryDate} onChange={handleChange} />
            {errors.expiryError && <p className='text-danger'>{errors.expiryError}</p>}
            {/* CVV */}
            <label htmlFor="cvv">CVV</label>
            <input type="text" name="cvv" className='input' placeholder='CVV' value={formData.cvv} onChange={handleChange} />
            {errors.cvvError && <p className='text-danger'>{errors.cvvError}</p>}
            {/* Submit */}
            <button type="submit" className="button">Submit{status}</button>
          </form>
        </Row>
      </Container>
    </section>
  )
}

export default App