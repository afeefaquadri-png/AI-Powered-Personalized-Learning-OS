interface BoardOption {
  id: string;
  name: string;
  description: string;
  flag: string;
}

interface BoardSelectorProps {
  options: BoardOption[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function BoardSelector({ options, selected, onSelect }: BoardSelectorProps) {
  return (
    <div className="space-y-2">
      {options.map((b) => (
        <button
          key={b.id}
          type="button"
          onClick={() => onSelect(b.id)}
          className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition ${
            selected === b.id
              ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
              : "border-gray-200 hover:border-blue-300"
          }`}
        >
          <span className="text-xl mt-0.5">{b.flag}</span>
          <div>
            <p className={`font-semibold text-sm ${selected === b.id ? "text-blue-700" : "text-gray-900"}`}>
              {b.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{b.description}</p>
          </div>
          {selected === b.id && (
            <span className="ml-auto text-blue-600 font-bold text-lg">✓</span>
          )}
        </button>
      ))}
    </div>
  );
}
