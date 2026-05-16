export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  full = false,
}) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-3 rounded-xl font-bold transition-all active:scale-95 ${
        styles[variant]
      } ${full ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}