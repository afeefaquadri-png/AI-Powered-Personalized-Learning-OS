interface MarksheetUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function MarksheetUpload({ file, onChange }: MarksheetUploadProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
      {file ? (
        <div className="space-y-2">
          <div className="text-3xl">📄</div>
          <p className="font-medium text-gray-700">{file.name}</p>
          <button
            onClick={() => onChange(null)}
            className="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="text-3xl mb-2">📤</div>
          <p className="text-sm text-gray-600">Click to upload a marksheet / report card</p>
          <p className="text-xs text-gray-400 mt-1">PDF, JPEG, PNG — max 10 MB</p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
    </div>
  );
}
