import React from "react";

function QuestionItem({ question,onDeleteQuestion, onUpdateCorrectAnswer}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteQuestion(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"DELETE",
    })
      .then((res)=> res.json())
      .then(()=> onDeleteQuestion(question))
  }

  function handleCorrectAnswerChange(event){
    const newCorrectIndex= parseInt(event.target.value);

    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex:newCorrectIndex,
      }),
    })
      .then ((res)=> res.json())
      .then((updatedQuestion)=>{
        onUpdateCorrectAnswer(updatedQuestion)
      })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}>{options}</select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
