// pages.tsx
"use client"
import { useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import WordDetails from "@/app/components/WordDetails";
import Button from "@/app/components/Button";

import { supabase } from "@/lib/supabaseClient";
const Home = () => {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const saveWordToSupabase = async () => {
    if (!wordData) return;
    setIsSaving(true);
    const { word, phonetic, meanings } = wordData;
    const formattedMeanings = meanings.map((meaning: any) => ({
      partOfSpeech: meaning.partOfSpeech,
      definitions: meaning.definitions.map((d: any) => d.definition),
      examples: meaning.definitions.map((d: any) => d.example || ""),
      synonyms: meaning.synonyms || [],
      antonyms: meaning.antonyms || []
    }));

    const { error } = await supabase.from("words").insert([
      { word, phonetic, meanings: formattedMeanings }
    ]);

    setIsSaving(false);
    if (error) console.error("Error saving word:", error.message);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center">Dictionary App</h1>
      <SearchBar onSearch={fetchWordDetails} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {wordData && (
        <>
          <WordDetails
            word={wordData.word}
            phonetic={wordData.phonetic}
            meanings={wordData.meanings}
          />
          <Button onClick={saveWordToSupabase}>
            {isSaving ? "Saving..." : "Save Word"}
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
