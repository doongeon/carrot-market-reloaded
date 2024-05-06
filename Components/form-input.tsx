interface FormInputProps {
  type: string;
  placeholder: string;
  errors?: string[];
  name: string;
}

export default function FormInput({
  type,
  placeholder,
  errors,
  name,
}: FormInputProps) {
  return (
    <div className="flex h-28 flex-col gap-2">
      <label htmlFor={`input_${name}`}>{placeholder}</label>
      <input
        id={`input_${name}`}
        className="bg-neutral-900 w-full h-12 px-3 ring-2 ring-neutral-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-600 placeholder:text-lg transition"
        type={type}
        placeholder={placeholder}
        name={name}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-600">
          {error}
        </span>
      ))}
    </div>
  );
}
