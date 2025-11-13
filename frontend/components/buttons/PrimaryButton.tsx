interface PrimaryButtonProps {
  onClick?: () => void;
  size?: "small" | "big";
  children: React.ReactNode;
  disabled?: boolean; // ✅ add this
}

export function PrimaryButton({ onClick, size, children, disabled }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
      } bg-black text-white font-semibold rounded-md px-6 py-2 ${
        size === "big" ? "w-full text-lg" : "text-sm"
      } transition`}
    >
      {children}
    </button>
  );
}
