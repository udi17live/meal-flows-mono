interface FormFieldErrors {
  error: string;
}

export default function FormFieldErrors({ error }: FormFieldErrors) {
  return <p className="text-red-400 text-sm">{error}</p>;
}
