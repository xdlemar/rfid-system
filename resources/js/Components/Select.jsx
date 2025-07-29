export default function Select({ options = [], value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="border p-2 rounded w-full">
      <option value="">Select...</option>
      {options.map(opt => (
        <option key={opt.value || opt.id} value={opt.value || opt.id}>
          {opt.label || opt.name}
        </option>
      ))}
    </select>
  );
}
