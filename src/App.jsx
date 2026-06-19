import React, { useState } from 'react';
import OpenAI from "openai"; 
import SearchForm from './components/SearchForm';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Initialize Groq client (OpenAI compatible)
const client = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY, 
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true // Use only for local/personal projects
});

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (word, sourceLang, targetLang) => {
    if (!word.trim()) {
      setError("Please enter a word to translate.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile", 
        messages: [{ 
          role: "user", 
          content: `Translate "${word}" from ${sourceLang} to ${targetLang}. 
          Return ONLY valid JSON with keys: "translatedText", "definition", "example".` 
        }],
        response_format: { type: "json_object" }
      });

      const text = response.choices[0].message.content;
      setResult(JSON.parse(text));
    } catch (err) {
      console.error("Groq API Error:", err);
      setError("Failed to fetch translation. Please check your API key and network.");
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
        {!loading && !error && !result && (
          <p className="placeholder-text">Search for a word to see its translation here.</p>
        )}
      </div>
    </div>
  );
}

export default App;