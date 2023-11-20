import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnteredDetails from './EnteredDetails';

function Questions3(props) {
  //const navigate = useNavigate(); 
  const [answer, setAnswer] = useState('Y');

  const [reason, setReason] = useState('');


  // Function to handle form submission 
  const submit = async (e) => {
    setLabelstate(false)
    setCount(pre => pre + 1)

    setAnswers(pre => {
      return [...pre, ...[{ quesId: quesDetails.quesId, answer: answer, reason }]
      ]
    })

    fetchQuestions(answer)
    if (isFinish) {
      await saveReport(answers)
    }
    setReason("")
  }

  const [count, setCount] = useState(1);


  const options = [{ id: 'Y' }, { id: 'N' }]
  const [answers, setAnswers] = useState([]);



  const [quesDetails, setQuesDetails] = useState([]);
  const [quesNo, setQuesNo] = useState(0);
  const [isFinish, setFinish] = useState(false);
  const [labelstate, setLabelstate] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = (quesType = "") => {
    fetch(`http://localhost:8080/bySurveyAndQuestionType/1/${quesNo}${quesType}`)
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        else {
          setFinish(true)
          saveReport(answers)
        }
      })
      .then(data => {
        if (data) {
          setQuesDetails(data)
          setQuesNo(data.quesId)
        } else {
          setFinish(true)
        }
      }

      )
      .catch(error => console.error('Error while fetching ques details', error));
    console.log(answers);
  }

  const saveReport = async (data) => {
    //e.preventDefault();
    console.log(data, answers);


    const response = await fetch('http://localhost:8080/saveReport/all', {
      method: 'POST',
      body: JSON.stringify({
        name: props.data.name,
        report: JSON.stringify(data),
        emailId: props.data.email,
        surveyId: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);


  }



  return isFinish ?
    (

      <div className='BasicForm' style={{ textAlign: "start" ,marginTop:"10em"}}>
        <p>
          <h4>SURVEY REPORT</h4>

          name:{props.data.name}

          <br />
          emailId:{props.data.emailId}
        </p>


        {
          answers.map((dt) => {
            return (<div>
              <ul>
                <li>
                  question: {dt.quesId}
                </li>
                <li>
                  answer: {dt.answer}
                </li>
                <li>
                  reason:{dt.reason}
                </li>
              </ul>
            </div>)
          })
        }
      </div>
    )

    : (<>

      <div className='Question3Form' >
        <label htmlFor="q1" style={{ textAlign: "start" }}>
          <p><b>{count}</b>{quesDetails.quesDescription}</p>
        </label>
        <br />
        {options.map(({ id }) => (
          < div className='radioButton'>
            <input
              type="radio"
              name="ProfessionRadio"
              id={id}
              autoComplete="off"
              value={id}
              onChange={e => { setLabelstate(id === "N" ? true : false); setAnswer(id) }}
            />
            <label htmlFor={id}>{id === "Y" ? "YES" : "NO"} </label>
            <p>{id === "Y" ? quesDetails.quesYesLabel : quesDetails.quesNoLabel}</p>
            {((quesDetails.quesId > 1 && id === "N" && labelstate) && <textarea
              placeholder="Please enter reason - it should be a good reason" onChange={e => {
                setReason(e.target.value)
              }}>
            </textarea>
            )}
            <br />
          </div>
        ))}
        <button onClick={submit} className="btn btn-success mx-3">
          Next
        </button>
      </div>


    </>
    )
}




export default Questions3;
