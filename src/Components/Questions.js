

import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import  { useEffect, useState } from 'react'; 

function Questions({addQuestion1Data}) {
  const navigate = useNavigate(); 
  const [answer1, setAnswer1] = React.useState('yes');

// Function to handle form submission 
const submit = (e) => { 
  if (!answer1) { 
    alert("Please select answer"); 
    } 
    addQuestion1Data(answer1); 
    if(answer1=='yes')
    navigate('/details')
    else
    navigate('/about')
	} 
  



  const handleChange = (event) => {
    setAnswer1(event.target.value)
    sessionStorage.setItem('question1',event.target.value)
  }

  const resetRadioState = () => {
    setAnswer1('');
  }
  return (
    <form onSubmit={submit}>
      <div className="form-group m-2" onChange={handleChange}>
        <label htmlFor="q1">
          <b>1.</b> Can the dataset be shared?(if public choose yes/private choose no )
        </label>
        <br />

        <input
          type="radio"
          name="ProfessionRadio"
          id="yes"
          autoComplete="off"
          className="m-2"
          value="yes"
        />
        <label htmlFor="yes"> yes</label>
        <br />




        <input
          type="radio"
          name="ProfessionRadio"
          id="no"
          autoComplete="off"
          className="m-2"
          value="no"
        />
         <label htmlFor="no"> no</label>
        <br />

        <button type="submit" className="btn btn-success mx-3"> 
				Next 
				</button> 

      </div>
    </form>
  )
}

export default Questions;
