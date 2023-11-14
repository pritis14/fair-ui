

import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function Questions() {
  const navigate = useNavigate(); 

// Function to handle form submission 
const submit = (e) => { 
	navigate('/addBasicData'); 
	} 
  const [answer, setAnswer, desc, no] = React.useState('yes');

  const handleChange = (event) => {
    setAnswer(event.target.value)
  }

  const resetRadioState = () => {
    setAnswer('');
  }
  return (
    <form>
      <div className="form-group m-2" onChange={handleChange}>
        <label htmlFor="q1">
          <b>1.</b> Can the dataset be shared?
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
        <label htmlFor="no"> No:</label>
        <input
          type="text"
          id="descForno"
          autoComplete="off"
          className="form-control m-2"
          value={no}
          onChange={(e) => { setAnswer(e.target.value) }}
        />

        <button type="submit" className="btn btn-success mx-3"> 
				Next 
				</button> 

      </div>
    </form>
  )
}




export default Questions;
