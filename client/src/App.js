import React, { useEffect, useState } from 'react'

function App() {

  const [testData, setTestData] = useState([{}])

  useEffect(() => {
    fetch("/validate-credit-card").then(
      response => response.json()
    ).then(
      data => {
        setTestData(data)
      }
    )
  }, [])

  return (
    <div>

      {(typeof testData.users === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        testData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}

    </div>
  )
}

export default App