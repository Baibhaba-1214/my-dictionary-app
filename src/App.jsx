import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import SearchForm from './components/SearchForm';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// REMINDER: Move this to a .env file after testing
const apiKey = import.meta.env.VITE_API_KEY; 
const genAI = new GoogleGenerativeAI(apiKey);

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (word, sourceLang, targetLang) => {
    setLoading(true);
    setError(null);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" }); // Changed from gemini-3.5-flash
      const prompt = `Translate the word "${word}" from ${sourceLang} to ${targetLang}. 
      Provide a definition and one example sentence. 
      Return the output as a valid JSON object with these exact keys: 
      "translatedText", "definition", "example".`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanedJson = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(cleanedJson));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch translation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Left Page: Input */}
      <div className="page-left">
        <header><h1>Indian Dictionary</h1></header>
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* Right Page: Result */}
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