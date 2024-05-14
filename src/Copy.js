
import React, { useState, useEffect } from 'react';
import localForage from 'localforage';
import Story from './comps/story';
import './App.css';

const DiaryApp = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [newEntryText, setNewEntryText] = useState('');

  const [imageFile, setImageFile] = useState(null);

  // Load entries from localForage on initial load
  useEffect(() => {
    localForage.getItem('diaryEntries').then(entries => {
      if (entries) {
        setDiaryEntries(entries);
      }
    });
  }, []);

  const handleAddEntry = async () => {
    if (newEntryText.trim() !== '' && imageFile) {
      const imageAsBase64 = await convertImageToBase64(imageFile);
      const newEntry = {
        date: new Date().toISOString(),
        storyname: newEntryText,
        photoname: imageAsBase64
      };
      const newEntries = [...diaryEntries, newEntry];
      setDiaryEntries(newEntries);
      
      localForage.setItem('diaryEntries', newEntries);
      setNewEntryText('');
      setImageFile(null);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const removeItem = (index) => {
    const filteredEntries = diaryEntries.filter((_, i) => i !== index);
    setDiaryEntries(filteredEntries);
    localForage.setItem('diaryEntries', filteredEntries);
  };

  const handleDeleteAllEntries = () => {
    setDiaryEntries([]); // Clear diaryEntries state
    localStorage.removeItem('diaryEntries'); // Remove entries from local storage
  };
  

  return (
    <div>
      <div className='upper-div m-2 p-2' >
        <input type="file" accept="image/*" className='chosefile p-1' onChange={handleImageChange}></input> <br></br><br></br>

        <textarea  rows="4" cols="50" value={newEntryText} onChange={(e) => setNewEntryText(e.target.value)} placeholder='Your story' /><br></br><br></br>

        <div className='d-flex justify-content-center'>
          <button type='submit' onClick={handleAddEntry} className='mybtn me-2'>Upload</button>
          <button onClick={handleDeleteAllEntries} className='mybtn'>Delete All Entries</button>
        </div>
      </div>

      <div>
        {diaryEntries.map((entry, index) => (
          <Story
            key={index}
            index={index}
            photo={entry.photoname}
            myphotostory={entry.storyname}
            removefunc={removeItem}
            src={index}
            mydate={entry.date}
          />
        ))}
      </div>

    </div>
  );
};

export default DiaryApp;

