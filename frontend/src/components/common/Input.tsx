interface InputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: 'text' | 'password';
  multiline?: boolean;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
}: InputProps) {
  const finalType = type ?? 'text';
  return (
    <div className="input-wrapper">
      <span className="hover-label">{placeholder}</span>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={finalType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
