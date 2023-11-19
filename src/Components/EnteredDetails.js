// EnteredDetails.js 

import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

 function EnteredDetails(props) {
	console.log(props) 
const navigate = useNavigate(); 

// Function to handle form submission 
const submit = () => { 
	console.log("HERE!")
	// console.log(props.data); // Log basicData object 
	// console.log(props.questiondData); // Log questionData object 
	// navigate('/thanks'); // Navigate to the thanks page 
}; 

const [panelsData, changePanel] = useState([]);

useEffect(() => {
	console.log(props, "PRPRP");
	changePanel(props);
  }, [props]);

return ( 
	<div className="container-fluid qform"> 
	<div className="col-md-5 m-auto"> 
		 
		 <h2>Your response here: </h2>
		
		{ panelsData && Array.isArray(panelsData) ? panelsData.map((dt) => {
			console.log(panelsData)
			return (<div>
				<ul>
				<li>
					{dt.quesId}
				</li>
				<li>
					{dt.answer}
				</li>
				</ul>
			</div>) 
		}): (<div><p>Hello</p></div>)}
	
		
		 
	</div> 
	</div> 
); 
} 

export default EnteredDetails;
