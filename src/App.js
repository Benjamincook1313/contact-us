import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [consent, setConsent] = useState(false)

  const handleClear = () => {
    setName('')
    setEmail('')
    setDate('')
    setConsent(false)
  };

  const checkEmail = () => {
    const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(regx.test(email)){
      return true
    }else{
      alert('not a valid email')
    }
  };

  const checkDate = () => {
    const arr = date.split('-')
  
    const month = parseInt(arr[1])
    const day = parseInt(arr[2])
    const year = parseInt(arr[0])
    console.log(month)
    if(date === ''){
      return true
    }else if(month <= 12 && day < 31 && year < 2022 && year > 1900){
      return true
    }else{
      alert('date invalid')
    }
  };

  const handleSubmit = async () => {
    const json = JSON.stringify({name, email, birthDate: date, emailConsent: consent})
    // console.log(json)

    if(name && checkEmail() && checkDate() && consent){
      const res = await axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', json)
      if(res){
        console.log(res)
        alert(res.status)
      }
    }
  };

  // console.log(name, email, date, consent)

  return (
    <div className="App">
      <h1>Contact Us</h1>
      <div>
        <h4> * name</h4>
        <input type='text' value={name} onChange={e => setName(e.target.value)}/>
      </div>
      <div>
        <h4>* email</h4>
        <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <h4>Birth Date</h4>
        <input type='date' value={date} onChange={e => setDate(e.target.value)}/>
      </div>
      <div>
        <h4>* I agree to be contacted via email </h4>
        <input type='checkbox' checked={consent} onChange={() => setConsent(!consent)}/>
      </div>
      <br/>
      <div>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <p>* required to submit</p>
    </div>
  );
}

export default App;
