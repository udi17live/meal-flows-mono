interface FormOutputDisplayProps {
  label: string;
  value: string;
}

export default function FormOutputDisplay({
  label,
  value,
}: FormOutputDisplayProps) {
  return (
    <div className="mt-5">
      <p className="text-lg font-bold text-gray-700">{label}:</p>
      <p className="text-md indent-5 text-gray-500">{value}</p>
    </div>
  );
}
