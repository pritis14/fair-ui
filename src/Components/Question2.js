import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom'; 

function Questions2() {
  const navigate = useNavigate(); 

// Function to handle form submission 
const submit = (e) => { 

	navigate('/details'); 
  if(answer==='yes')
  navigate('/details'); 
  else
  navigate('/about'); 
	} 
  const [answer, setAnswer] = useState('yes');

  const handleChange = (event) => {
    setAnswer(event.target.value)
  }

  const[reason,setReason]=useState('');
  const handleInput =(e)=>{
    setReason(e.target.value);
  }

  const resetRadioState = () => {
    setAnswer('');
  }

const options=[{id:'yes'},{id:'no'}]


  return (
    <form onSubmit={submit}>
      <div className="form-group m-2" onChange={e=>setAnswer(e.target.value)}>
        <label htmlFor="q1">
          <b>1.</b> Can the dataset be shared?
        </label>
        <br />
        {options.map(({id})=>(
       <>
       <input
          type="radio"
          name="ProfessionRadio"
          id={id}
          autoComplete="off"
          className="m-2"
          value={id}
          // value={
          //   id==='yes' ? '1Y':'1N'
          // }
        />
        <label htmlFor={id}> {id}</label>
        <br/>
        </>
        )) }
        </div>
        {
          answer==='no' && (<input
            value={reason}
            className="form-control m-2"
            onChange={e=> setReason(e.target.value)}
          />
  )
        }
        

        <button type="submit" className="btn btn-success mx-3"> 
				Next 
				</button> 
    </form>
  )
}




export default Questions2;
