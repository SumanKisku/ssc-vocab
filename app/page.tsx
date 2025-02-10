// pages.tsx
"use client"
import { useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import WordDetails from "@/app/components/WordDetails";

const Home = () => {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWordDetails = async (word: string) => {
    setError(null);
    setWordData(null);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data = await response.json();
      setWordData(data[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center">Dictionary App</h1>
      <SearchBar onSearch={fetchWordDetails} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {wordData && (
        <WordDetails
          word={wordData.word}
          phonetic={wordData.phonetic}
          meanings={wordData.meanings}
        />
      )}
    </div>
  );
};

export default Home;
