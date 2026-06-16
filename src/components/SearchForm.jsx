import React, { useState } from 'react';
// Assuming you have your language list constant
import { languages } from '../constants/languages'; 

const SearchForm = ({ onSearch }) => {
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Prevent empty searches
    
    // Pass all three values to the App.jsx function
    onSearch(text, sourceLang, targetLang);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a word..."
        required
      />

      <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>

      <span>to</span>

      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>

      <button type="submit">Translate</button>
    </form>
  );
};

export default SearchForm;