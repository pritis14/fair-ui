import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnteredDetails from './EnteredDetails';

function Questions3() {
  //const navigate = useNavigate(); 
  const [answer, setAnswer] = useState('Y');

  const [reason, setReason] = useState('');


  // Function to handle form submission 
  const submit = (e) => {
    setLabelstate(false)
    setCount(pre => pre + 1)

    setAnswers(pre => {
      console.log(reason, pre, answer, quesDetails.quesId, "DATA");
      return [...pre, ...[{ quesId: quesDetails.quesId, answer, reason }]
      ]
    })
    console.log(answer)
    setReason("")
    fetchQuestions(answer)
  }


  const handleChange = (event) => {
    setAnswer(event.target.value)

  }

  const handleInput = (e) => {
    setReason(e.target.value);
  }

  const resetRadioState = () => {
    setAnswer('');
  }
  const [count, setCount] = useState(1);


  const options = [{ id: 'Y' }, { id: 'N' }]
  //const quesType=[{yes1:''},]
  const [answers, setAnswers] = useState([]);



  const [quesDetails, setQuesDetails] = useState([]);
  const [quesNo, setQuesNo] = useState(0);
  // const [queslabel, setQueslabel] = useState([]);
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

  return isFinish ? 
    (
      <>
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
              </ul>
            </div>)
          })
        }
      </>
    )

    : (<>

      <div className="form-group m-2" onChange={e => setAnswer(e.target.value)}>
        <label htmlFor="q1">
          <p><b>{count}</b>{quesDetails.quesDescription}</p>
        </label>
        <br />
        {options.map(({ id }) => (
          <>
            <input
              type="radio"
              name="ProfessionRadio"
              id={id}
              autoComplete="off"
              className="m-2"
              value={id}
              onChange={e => setLabelstate(id === "N" ? true : false)}
            />
            <label htmlFor={id}>{id === "Y" ? "YES" : "NO"} </label>
            <p>{id === "Y" ? quesDetails.quesYesLabel : quesDetails.quesNoLabel}</p>
            {(( quesDetails.quesId > 1 && id === "N" && labelstate) && <textarea
              placeholder="Please enter reason - it should be a good reason" onChange={e => {
                console.log(e.target.value, "textarea")
                setReason(e.target.value)
              }}>
            </textarea>
            )}
            <br />
          </>
        ))}
      </div>

      <button onClick={submit} className="btn btn-success mx-3">
        Next
      </button>
    </>
    )
}




export default Questions3;
