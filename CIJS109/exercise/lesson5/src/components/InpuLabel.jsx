export const InputLabel = (props) => {
  const { label, required, customClassName } = props;
  return (
    <span className={`text-gray-700 text-xs ${customClassName || ""}`}>
      {required ? <span className="text-red-500 font-bold">*</span> : ""}{" "}
      {label}
    </span>
  );
};
