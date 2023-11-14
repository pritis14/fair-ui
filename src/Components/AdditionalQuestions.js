// AdditionalQuestions.js 

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

export default function AdditionalQuestions({ addQuestionData }) { 
// State variables to store user inputs 
const [profession, setProfession] = useState(""); 
const [interest, setInterest] = useState(""); 
const [reference, setReference] = useState(""); 
const [otherProfession, setOtherProfession] = useState(""); 
const [otherInterest, setOtherInterest] = useState(""); 
const [otherReference, setOtherReference] = useState(""); 
	
const navigate = useNavigate(); 

// Function to handle form submission 
const submit = (e) => { 
	e.preventDefault(); 

	// Check if all fields are filled 
	if (!profession || !interest || !reference) { 
	alert("All fields necessary!"); 
	} else { 
	// If the selected option is "Others", use the value from the corresponding text input 
	if (profession === "Others") { 
		profession = otherProfession; 
	} 
	if (interest === "Others") { 
		interest = otherInterest; 
	} 
	if (reference === "Others") { 
		reference = otherReference; 
	} 

	// Log the selected options and call the addQuestionData function with the data 
	console.log(profession, interest, reference); 
	addQuestionData(profession, interest, reference); 

	// Navigate to the next page 
	navigate('/details'); 
	} 
}; 

// Event handler for changes in the profession radio buttons 
const handleProfessionChange = (e) => { 
	setProfession(e.target.value); 
}; 

// Event handler for changes in the interest radio buttons 
const handleInterestChange = (e) => { 
	setInterest(e.target.value); 
}; 

// Event handler for changes in the reference radio buttons 
const handleReferenceChange = (e) => { 
	setReference(e.target.value); 
}; 

return ( 
	<div className="container-fluid qform"> 
	<div className="col-md-5 m-auto"> 
		<div className="mt-3"> 
		<div className="card text-left h-100"> 
			<div className="card-body"> 
			<form onSubmit={submit}> 
				<label htmlFor=""> 
				<h4> Questions</h4> 
				</label> 

				{/* Profession options */} 
				<div className="form-group m-2" onChange={handleProfessionChange}> 
				<label htmlFor="q1"> 
					<b>1.</b> What is your profession? 
				</label> 
				<br /> 
				<input 
					type="radio"
					name="ProfessionRadio"
					id="student"
					autoComplete="off"
					className="m-2"
					value="Student"
				/> 
				<label htmlFor="student"> Student</label> 
				<br /> 
				{/* Other options for profession with text input */} 
				<input 
					type="radio"
					name="ProfessionRadio"
					id="sde"
					autoComplete="off"
					className="m-2"
					value="Software Engineer"
				/> 
				<label htmlFor="sde"> Software Engineer</label> 
				<br /> 
				<input 
					type="radio"
					name="ProfessionRadio"
					id="teacher"
					autoComplete="off"
					className="m-2"
					value="Teacher"
				/> 
				<label htmlFor="teacher"> Teacher</label> 
				<br /> 
				<input 
					type="radio"
					name="ProfessionRadio"
					id="others"
					autoComplete="off"
					className="m-2"
					value="Others"
				/> 
				<label htmlFor="others"> Others:</label> 
				<input 
					type="text"
					id="otherProfession"
					autoComplete="off"
					className="form-control m-2"
					value={otherProfession} 
					onChange={(e) => { setOtherProfession(e.target.value) }} 
				/> 
				<hr /> 
				</div> 

				{/* Interest options */} 
				<div className="form-group m-2" onChange={handleInterestChange}> 
				<label htmlFor="q2"> 
					<b>2.</b> What are your interests? 
				</label> 
				<br /> 
				<input 
					type="radio"
					name="interestRadio"
					id="dsa"
					autoComplete="off"
					className="m-2"
					value="DSA"
				/> 
				<label htmlFor="dsa"> DSA</label> 
				<br /> 
				{/* Other options for interest with text input */} 
				<input 
					type="radio"
					name="interestRadio"
					id="fullstack"
					autoComplete="off"
					className="m-2"
					value="Full Stack Development"
				/> 
				<label htmlFor="fullstack"> Full Stack Development</label> 
				<br /> 
				<input 
					type="radio"
					name="interestRadio"
					id="dataScience"
					autoComplete="off"
					className="m-2"
					value="Data Science"
				/> 
				<label htmlFor="dataScience"> Data Science</label> 
				<br /> 
				<input 
					type="radio"
					name="interestRadio"
					id="compeProgramming"
					autoComplete="off"
					className="m-2"
					value="Competitive Programming"
				/> 
				<label htmlFor="compeProgramming"> Competitive Programming</label> 
				<br /> 
				<input 
					type="radio"
					name="interestRadio"
					id="others"
					autoComplete="off"
					className="m-2"
					value="Others"
				/> 
				<label htmlFor="others"> Others:</label> 
				<input 
					type="text"
					id="otherInterest"
					autoComplete="off"
					className="form-control m-2"
					value={otherInterest} 
					onChange={(e) => { setOtherInterest(e.target.value) }} 
				/> 
				<hr /> 
				</div> 

				{/* Reference options */} 
				<div className="form-group m-2" onChange={handleReferenceChange}> 
				<label htmlFor="q3"> 
					<b>3.</b> Where did you hear about us? 
				</label> 
				<br /> 
				<input 
					type="radio"
					name="referenceRadio"
					id="news"
					autoComplete="off"
					className="m-2"
					value="News Paper"
				/> 
				<label htmlFor="news"> News Paper</label> 
				<br /> 
				<input 
					type="radio"
					name="referenceRadio"
					id="LinkedIn"
					autoComplete="off"
					className="m-2"
					value="LinkedIn"
				/> 
				<label htmlFor="LinkedIn"> LinkedIn</label> 
				<br /> 
				<input 
					type="radio"
					name="referenceRadio"
					id="Instagram"
					autoComplete="off"
					className="m-2"
					value="Instagram"
				/> 
				<label htmlFor="Instagram"> Instagram</label> 
				<br /> 
				<input 
					type="radio"
					name="referenceRadio"
					id="others"
					autoComplete="off"
					className="m-2"
					value="Others"
				/> 
				<label htmlFor="others"> Others:</label> 
				<input 
					type="text"
					id="otherReference"
					autoComplete="off"
					className="form-control m-2"
					value={otherReference} 
					onChange={(e) => { setOtherReference(e.target.value) }} 
				/> 
				<br /> 
				</div> 

				{/* Submit button */} 
				<button type="submit" className="btn btn-success mx-3"> 
				Next 
				</button> 
			</form> 

			{/* Progress indicators */} 
			<center> 
				<span className="badge rounded-pill disabled">1</span> 
				<span className="badge badge-pill bg-success"> 
				<b>2</b> 
				</span> 
				<span className="badge rounded-pill disabled">3</span> 
			</center> 
			</div> 
		</div> 
		</div> 
	</div> 
	</div> 
); 
}
