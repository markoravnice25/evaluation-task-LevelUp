import React, { useState } from 'react'

import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col'
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
        setStatus('✅')
      } else {
        setStatus('❌')
      }
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  }

  return (
    <div>
      <Form className='auth-login' onSubmit={handleSubmit}>
        <Row className="mb-3 form-label">
          <Row>
            <h3 className='login-heading'>Credit card check</h3>
          </Row>
          <Form.Group as={Col}>
            <Form.Label>CC number</Form.Label>
            <Form.Control type="text" name='pan' value={formData.pan} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control type="text" name='expiryDate' value={formData.expiryDate} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>CVV</Form.Label>
            <Form.Control type="text" name='cvv' value={formData.cvv} onChange={handleChange} />
            {errors && <p className='text-danger'>{errors}ERROR</p>}
          </Form.Group>
          <Form.Group>
            <Button className='button-login' type="submit">
              Submit{status}
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  )
}

export default App