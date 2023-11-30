import React, { useEffect } from 'react'
import data from'../data.json' 
import { useState } from 'react';


const Questions = () => {
 
  const [index,setIndex] = useState(0);
  const [answer,setAnswer] = useState([]);

  const el = data[index];

  const handlePrev = () =>{
      setIndex(prev=>prev-1)
  }

  const handleNext = () =>{
      setIndex(prev=>prev+1)
  }

  const handleAnswer = (i,value) =>{
      const arr = answer.map((ind)=>{
        if(i==ind){
          return value
        }
        else{
          return arr[index];
        }
      })
      setAnswer(arr);
      console.log(arr);
  }

  return (
    <div className='container'>
                            <div className='question'><p>{index+1}.{el.question}?</p></div>
                            <h4>
                              {
                                el.options.map(
                                  (e,val)=>{
                                    return(
                                          <p>  
                                            <div className='container-options' key={val}>
                                                    <div className='options' onClick={(val)=>handleAnswer(index,val+1)}>
                                                      {e}
                                                    </div>                                                 
                                            </div>
                                            
                                            
                                          </p>
                                    )
                                  }
                                )
                              }  
                            </h4>
                            {/* <h5>Answer:{el.answer}</h5>              */}
                            {
                              index!=0 && (
                                <button onClick={()=>handlePrev()}>Previous</button>
                              )
                            }
                            {
                              index!=data.length-1 && (
                                <button onClick={()=>handleNext()}>Next</button>
                              )
                            }
                          <br></br>
                          <br></br>
                            <button >Submit</button>
    </div>
  )
}

export default Questions
