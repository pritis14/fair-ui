import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Question3() {
  const [answer, setAnswer] = useState('Y');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [placeholder, setPlaceholder] = useState("Please enter reason - it should be a good reason");
  const [counter, setCounter] = useState(0);
  const fileInputRef = useRef(null);
  const [resetInput, setResetInput] = useState(false);
  const [count, setCount] = useState(1);
  const [fairresult, setFairesult] = useState(0);
  const options = [{ id: 'Y' }, { id: 'N' }]
  const [answers, setAnswers] = useState([]);
  const [quesDetails, setQuesDetails] = useState([]);
  const [quesNo, setQuesNo] = useState(0);
  const [isFinish, setFinish] = useState(false);
  const [labelstate, setLabelstate] = useState(false);
  const [yeslabel, setYeslabel] = useState(false);

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
 
  const [files, setFiles] = useState(Array(10).fill(null));

  const handleFileChange = (questionNumber, event) => {
    const newFiles = [...files];
    const file = event.target.files[0];

    if (file) {
      // Store file reference or identifier in sessionStorage
      sessionStorage.setItem(`3question${questionNumber}`, file.name);
      newFiles[questionNumber - 1] = file;
    } else {
      // If no file is present, set sessionStorage to empty
      sessionStorage.setItem(`3question${questionNumber}`, '');
      newFiles[questionNumber - 1] = null;
    }

    setFiles(newFiles);

    if (fileInputRef.current) {
      console.log("priti")
      fileInputRef.current.value = null;
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

    if (answer === 'Y')
      setFairesult(value => value + 1)

    fetchQuestions(answer)
    setReason("")

    if (isFinish) {
        sessionStorage.setItem('answers3', JSON.stringify(answers));
        sessionStorage.setItem('fairresult3', JSON.stringify(fairresult));
        navigate('/question4');
    }

    const fileInput = document.getElementById(`fileInput${quesDetails.quesId}`);
  if (fileInput) {
    fileInput.value = null;
  }
  setPlaceholder("Please enter reason - it should be a good reason");

  }

  

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = (quesType = "") => {
    fetch(`http://localhost:8080/bySurvey2AndQuestionType/3/${quesNo}${quesType}`)
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

  
  return  (<>

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
              onChange={e => { setLabelstate(id === "N"); setAnswer(id); setYeslabel(id === "Y") }}
            />
            <label htmlFor={id}>{id === "Y" ? "Yes" : "No"} </label>

            <p style={{ width: "80em" }}>{id === "Y" ? quesDetails.quesYesLabel : quesDetails.quesNoLabel}</p>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group files color">
                    <form ref={formRef}>
                    <input type={quesDetails.quesId > 1 ? "file" : "hidden"} id={`fileInput${quesDetails.quesId}`}   onChange={(e) => handleFileChange(quesDetails.quesId, e)}/>
                    </form>
                  </div>
                </div>

              </div>
            </div>

            
      {quesDetails.quesId > 1 && id === "Y" && yeslabel && (
        <>
          <textarea
            style={{ width: "80em", height: "5em" }}
            placeholder={placeholder}
            onChange={handleReasonChange}
            value={reason} 
          />
        </>
      )}
      
      {quesDetails.quesId > 1 && id === "N" && labelstate && (
        <>
          <textarea
            style={{ width: "80em", height: "5em" }}
            placeholder={placeholder}
            onChange={handleReasonChange}
            value={reason} 
          />
        </>
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

export default Question3;
