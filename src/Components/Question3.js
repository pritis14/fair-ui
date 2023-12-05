import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

function Questions3(props) {
  //const navigate = useNavigate(); 
  const [answer, setAnswer] = useState('Y');

  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  // For Pdf
  const styles = {
    page: {
      margin :'0.5em',
      height: '100',
      width: '100',
      'page-break-after': 'always',
    },

    columnLayout: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '3rem 0 5rem 0',
      gap: '2rem',
    },

    column: {
      display: 'flex',
      flexDirection: 'column',
    },

    spacer2: {
      height: '2rem',
    },

    fullWidth: {
      width: '100%',
    },

    marginb0: {
      marginBottom: 0,
    },
  };

  const reportTemplateRef = useRef(null);

  const handleGeneratePdf= async (e) => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px',
    });

    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal');

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save('document');
      },
    });

    if (isFinish) {
      navigate('/thanks');
      await saveReport(answers);
    }

  };



  // Function to handle form submission 
  const submit = async (e) => {
    setLabelstate(false)
    setYeslabel(true)
    setCount(pre => pre + 1)

    setAnswers(pre => {
      return [...pre, ...[{ quesId: quesDetails.quesId, answer: answer, reason, details: quesDetails.quesDescription }]
      ]
    })

    if(answer==='Y')
    setFairesult(value=>value+1)

    fetchQuestions(answer)
    // if (isFinish) {
    //   navigate('/thanks');
    //   await saveReport(answers)

    // }
    setReason("")
    if (isFinish) {

    }
  }

  const [count, setCount] = useState(1);
  const[fairresult,setFairesult]=useState(0);


  const options = [{ id: 'Y' }, { id: 'N' }]
  const [answers, setAnswers] = useState([]);



  const [quesDetails, setQuesDetails] = useState([]);
  const [quesNo, setQuesNo] = useState(0);
  const [isFinish, setFinish] = useState(false);
  const [labelstate, setLabelstate] = useState(false);
  const [yeslabel, setYeslabel] = useState(false);

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
          //saveReport(answers)
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

      <div className='BasicForm' style={styles.page}>
        <div  ref={reportTemplateRef}>
          <p>
            <h4>SURVEY REPORT</h4>

            Name:     {props.data.name}

            <br />
            EmailId: {props.data.email}
          </p>


          {
            answers.map((dt) => {
              return (<div>
                <ul>
                  <li>
                    {dt.quesId} question: {dt.details}
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
          <br/>
          <p>{fairresult>6 ? 'Survey is : Fair' : fairresult<3? 'Survey is : Not Fair':'Survey is : Partial'}</p>
          
          {/* <button onClick={submit} className="btn btn-success mx-3">
          Survey Finished!!
        </button> */}

        </div>
        <div >
          <button className="button" onClick={handleGeneratePdf}>
            Generate PDF
          </button>
        </div>
      </div>
    )

    : (<>

      <div className='Question3Form' >
        <label htmlFor="q1" style={{ textAlign: "start", marginTop: "10em" }}>
          <p>{count}. {quesDetails.quesDescription}</p>
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
              onChange={e => { setLabelstate(id === "N" ? true : false); setAnswer(id); setYeslabel(id==="Y"?true:false) }}
            />
            <label htmlFor={id}>{id === "Y" ? "Yes" : "No"} </label>

            <p style={{width: "80em"}}><br/>{id === "Y" ? quesDetails.quesYesLabel : quesDetails.quesNoLabel}</p>
           
            
            {(( quesDetails.quesId>1 && id==="Y" && yeslabel) && <textarea  
              placeholder="Please enter reason - it should be a good reason" onChange={e => {
                setReason(e.target.value)
              }}>
            </textarea>
            )}

            {((quesDetails.quesId > 1 && id === "N" && labelstate) && <textarea
              placeholder="Please enter reason - it should be a good reason" onChange={e => {
                setReason(e.target.value)
              }}>
            </textarea>
            )}
            
            
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
