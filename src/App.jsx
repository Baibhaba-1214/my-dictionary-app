import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import SearchForm from './components/SearchForm';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Initialize API
const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (word, sourceLang, targetLang) => {
    if (!apiKey) {
      setError("API Key is missing. Check your .env file.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      // Use a standard model name
      const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
      const prompt = `Translate the word "${word}" from ${sourceLang} to ${targetLang}. 
      Provide a definition and one example sentence. 
      Return the output as a valid JSON object with these keys: "translatedText", "definition", "example".`;

      const response = await model.generateContent(prompt);
      const text = await response.response.text();
      
      // Clean and parse
      const cleanedJson = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(cleanedJson));
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch translation. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-left">
        <header><h1>Indian Dictionary</h1></header>
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="page-right">
        {loading && <LoadingSpinner />}
        {error && <p className="error">{error}</p>}
        {!loading && !error && result && <ResultDisplay data={result} />}
        {!loading && !error && !result && <p>Search for a word to see its translation here.</p>}
      </div>
    </div>
  );
}


export default App;
