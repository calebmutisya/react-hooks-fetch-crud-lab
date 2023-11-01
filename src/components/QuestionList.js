import React,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";
function QuestionList() {
  const [question, setQuestion]= useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
      .then((res)=> res.json())
      .then((data)=>setQuestion(data))
  },[]);
  
  const onAddQuestion = (newQuestion)=>{
    setQuestion([...question, newQuestion])
  };

  function onDeleteQuestion(deletedQuestion){
    const updateQuestions= question.filter((question)=> question.id !== deletedQuestion.id);
    setQuestion(updateQuestions)

  }

  function onUpdateCorrectAnswer(Answer){
    const updatedAnswer = question.map((answ)=>{
      if(answ.id === Answer.id){
        return Answer;
      }else{
        return answ
      }
    })
    setQuestion(updatedAnswer);
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */
      question.map((qst)=>(<QuestionItem key={qst.id} question={qst} onDeleteQuestion={onDeleteQuestion} onUpdateCorrectAnswer={onUpdateCorrectAnswer}/>))}</ul>
      {<QuestionForm onAddQuestion={onAddQuestion}/>}
    </section>
  );
}

export default QuestionList;
