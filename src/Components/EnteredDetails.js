// EnteredDetails.js 

import { useNavigate } from 'react-router-dom'; 

export default function EnteredDetails(props) { 
const navigate = useNavigate(); 

// Function to handle form submission 
const submit = () => { 
	console.log(props.data); // Log basicData object 
	console.log(props.questiondData); // Log questionData object 
	navigate('/thanks'); // Navigate to the thanks page 
}; 

return ( 
	<div className="container-fluid qform"> 
	<div className="col-md-5 m-auto"> 
		<div className="mt-3"> 
		<div className="card text-left h-100"> 
			<div className="card-body my-3"> 
			<h4>Entered Details</h4> 

			{/* Display basicData */} 
			<p> 
				<b>Name:</b> {props.data.name} 
			</p> 
			<p> 
				<b>Email:</b> {props.data.email} 
			</p> 
			<p> 
				<b>Contact No.:</b> {props.data.contact} 
			</p> 

			<h4>Responses</h4> 

			{/* Display questionData */} 
			<p> 
				<b>Profession:</b> {props.questiondData.profession} 
			</p> 
			<p> 
				<b>Interests:</b> {props.questiondData.interest} 
			</p> 
			<p> 
				<b>Reference:</b> {props.questiondData.reference} 
			</p> 

			{/* Submit button */} 
			<button type="submit" onClick={submit} className="btn btn-success"> 
				Submit 
			</button> 

			{/* Page numbers */} 
			<center> 
				<span className="badge rounded-pill disabled">1</span> 
				<span className="badge rounded-pill disabled">2</span> 
				<span className="badge badge-pill bg-success"> 
				<b>3</b> 
				</span> 
			</center> 
			</div> 
		</div> 
		</div> 
	</div> 
	</div> 
); 
} 
