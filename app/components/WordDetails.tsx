
// components/WordDetails.tsx
interface WordDetailsProps {
  word: string;
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
    synonyms?: string[];
    antonyms?: string[];
  }[];
}

const WordDetails: React.FC<WordDetailsProps> = ({ word, phonetic, meanings }) => {
  return (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-xl font-bold">{word}</h2>
      {phonetic && <p className="text-gray-500">/{phonetic}/</p>}
      {meanings.map((meaning, index) => (
        <div key={index} className="mt-2">
          <h3 className="font-semibold">{meaning.partOfSpeech}</h3>
          <ul className="list-disc ml-5">
            {meaning.definitions.map((def, i) => (
              <li key={i}>
                <p>{def.definition}</p>
                {def.example && <p className="text-gray-500 italic">&quot;{def.example}&quot;</p>}
              </li>
            ))}
          </ul>
          {meaning.synonyms && meaning.synonyms.length > 0 && (
            <p className="mt-2"><strong>Synonyms:</strong> {meaning.synonyms.join(", ")}</p>
          )}
          {meaning.antonyms && meaning.antonyms.length > 0 && (
            <p className="mt-2"><strong>Antonyms:</strong> {meaning.antonyms.join(", ")}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default WordDetails;
