import React, { useEffect } from 'react'
import Story from './comps/story'
import List2 from './comps/List2'
import { useState, useRef } from 'react';
import './App.css';
import html2pdf from 'html2pdf.js';

export default function App() {
  const myref = useRef();
  const downbutton = useRef(null);
  
  const [selectedFile, setSelectedFile] = useState([]); //initial value of file
  const [mystory, storyfunc] = useState(null);
  const [flag, flagfunc] = useState(false);

  const [diaryEntries, setDiaryEntries] = useState(()=>{
    const storedEntries = localStorage.getItem('diaryEntries');
    return storedEntries ? JSON.parse(storedEntries) : [];
  })
  
  useEffect(()=>{
    localStorage.setItem('diaryEntries',JSON.stringify(diaryEntries));
    console.log("useeffect:",diaryEntries)
  },[diaryEntries])


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    //selectedFile.push(new List(imageUrl));
    setSelectedFile([...selectedFile, imageUrl]);
    
  }

  const storyinputfunc = (e) => {
    storyfunc(e.target.value)
  }

  const onupload = ()=>{ 
      //const newEntry = { entryphoto:selectedFile, entrystory:mystory  };
      setDiaryEntries([...diaryEntries, new List2(selectedFile, mystory)])
      console.log(diaryEntries)  
    }

  const handleDeleteAllEntries = () => {
    setDiaryEntries([]); // Clear diaryEntries state
    localStorage.removeItem('diaryEntries'); // Remove entries from local storage
  };
   
 
  //-------rem-------------------
  const removeitem = (storyname) => {
    // changes doesnt get saved inside datalist variable
   flagfunc(true);
   const updated = diaryEntries.filter((e) => e.storyname !== storyname) // Thats why it is as it is !!!!!!
   setDiaryEntries(updated)
   console.log("updated",updated)

  //  const updatedItems = [...diaryEntries];
  //  updatedItems.splice(storyname, 1);
  //  setDiaryEntries(updatedItems);
  //  console.log("after removing",updatedItems)
 }
  
 //----------pdf------------
 function mylastfunc(){
  const element = myref.current;

  html2pdf().from(element).save();
   return true;
}
  return (
    <div>
      <div className='upper-div m-2 p-2' >
         <input type="file" accept="image/*" className='chosefile p-1' onChange={handleFileChange}></input> <br></br><br></br>
         <textarea  rows="4" cols="50" onChange={storyinputfunc} placeholder='Your story' /><br></br><br></br>
         <div className='d-flex justify-content-center'>
         <button type='submit' onClick={onupload} className='mybtn me-2'>Upload</button>
         <button onClick={handleDeleteAllEntries} className='mybtn'>Delete All Entries</button>
         <button id="myButton" ref={downbutton} onClick={mylastfunc} className='mybtn2 m-2'>Download PDF</button>
      </div>
      {/* {arraystate.map((e, index) => (<Story key={index} photo={e.photoname[index].myname} myphotostory={e.storyname} /> )) } */}
      </div>
      <h4 style={{textAlign:"center",color:"orange"}}>Your memories !!</h4>

      {/* {diaryEntries.map((e, index) => (<Story key={index} photo={e.entryphoto[0]} myphotostory={e.entrystory} /> )) } */}
      <div ref={myref} >
        {diaryEntries.map((e, index) =>(<Story key={e.index} src={e.storyname} photo={e.photoname[index]} myphotostory={e.storyname} removefunc={removeitem} /> )) }
      </div>
      {/* {flag == true ? diaryEntries.map((e, index) =>(<Story key={e.index} src={e.storyname} photo={e.photoname[index + 1]} myphotostory={e.storyname} removefunc={removeitem} /> )) : 
      diaryEntries.map((e, index) =>(<Story key={e.index} src={e.storyname} photo={e.photoname[index]} myphotostory={e.storyname} removefunc={removeitem} /> )) } */}

    </div>
  )
}


