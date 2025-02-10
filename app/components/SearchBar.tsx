// components/SearchBar.tsx
import { useState } from "react";
import Button from "./Button";

interface SearchBarProps {
  onSearch: (word: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [word, setWord] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word.trim()) {
      onSearch(word);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word..."
        className="border p-2 rounded w-full text-black"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;

