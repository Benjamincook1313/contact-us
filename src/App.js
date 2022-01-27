import React, { useState } from 'react';
import axios from 'axios';

function App() {
  
  const cd = new Date()
  const d = `${cd.getFullYear()}-${cd.getMonth()+1}-${cd.getDate()}`

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [consent, setConsent] = useState(false)


  const handleReset = () => {
    setName('')
    setEmail('')
    setDate('')
    setConsent(false)
  };

  const handleSubmit = async () => {
    const res = await axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', {name, email, birthDate: date, emailConsent: consent})
    if(res.data){
      console.log(res)
      alert('Success')
    }
  };

  console.log(name, email, date, consent)

  return (
    <div className="App" 
      style={{
        width: '100vw', height: '100vh', 
        display: 'flex', alignItems: 'center', 
        flexDirection: 'column'
      }}>
        
      <h1>Contact Us</h1>
        <p>* required to submit</p>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <label htmlFor='name'> 
          * name:
          <input id='name' type='text' value={name} onChange={e => setName(e.target.value)} required/>
        </label>
        <br/>
        <label htmlFor='email'>
          * email:
          <input id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} required/>
        </label>
        <br/>
        <label htmlFor='date'>
          birth date:
          <input id='date' type='date' value={date} onChange={e => setDate(e.target.value)} min='1900-01-01' max={d}/>
        </label>
        <br/>
        <label htmlFor='consent'>
          * I agree to be contacted via email
          <input id='consent' type='checkbox' value={consent} onChange={e => setConsent(e.target.value)} required />
        </label>
        <br/>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <button onClick={handleReset}>Clear</button>
          <button type='submit'>Submit</button>
        </div>
      </form >
    </div>
  );
}

export default App;
