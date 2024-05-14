import React, { useState, useEffect } from 'react';

const DiaryApp = () => {
  // Initialize state variables
  const [diaryEntries, setDiaryEntries] = useState(() => {
    const storedEntries = localStorage.getItem('diaryEntries');
    return storedEntries ? JSON.parse(storedEntries) : [];
  });
  const [newEntryText, setNewEntryText] = useState('');

  // Function to save entries to local storage whenever diaryEntries changes
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]); 

  // Function to handle adding a new diary entry
  const handleAddEntry = () => {
    if (newEntryText.trim() !== '') {
      const newEntry = { entry: newEntryText };
      setDiaryEntries(diaryEntries.concat(newEntry));
      setNewEntryText('');
    }
  };

  return (
    <div>
      <h1>My Diary App</h1>
      <textarea 
        value={newEntryText} 
        onChange={(e) => setNewEntryText(e.target.value)} 
        placeholder="Write your entry here..." 
      />
      <button onClick={handleAddEntry}>Add Entry</button>
      <div>
        {/* Display existing diary entries */}
        {diaryEntries.map((entry, index) => (
          <div key={index}>
            <p>{entry.date}</p>
            <p>{entry.entry}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryApp;
