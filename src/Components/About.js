// About.js 

import React from 'react'
import { useNavigate } from 'react-router-dom';



export const About = () => {

	// Navigation function for programmatic routing 
	const navigate = useNavigate();

	// Function to handle form submission 
	const submit = (e) => {
		navigate('/addBasicData');
	}
	return (
		<form className='aboutForm' onSubmit={submit}>
			<div className='text-center card'>
				<h3>Welcome to the Fair Survey</h3>
				<p>Lets make your data more fair.</p>

				<button type="submit" >
					Start Survey
				</button>
			</div>
		</form>
	)
}
