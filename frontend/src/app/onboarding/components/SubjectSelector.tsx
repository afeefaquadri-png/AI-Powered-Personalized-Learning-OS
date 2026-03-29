interface SubjectSelectorProps {
  options: string[];
  selected: string[];
  onToggle: (subject: string) => void;
}

export default function SubjectSelector({ options, selected, onToggle }: SubjectSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((subject) => (
        <button
          key={subject}
          type="button"
          onClick={() => onToggle(subject)}
          className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition text-left ${
            selected.includes(subject)
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
          }`}
        >
          {subject}
        </button>
      ))}
    </div>
  );
}
