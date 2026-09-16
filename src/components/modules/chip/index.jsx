import { getColorVar } from "@/utils/get-color-var";
import "./styles.css";

export function Chip({ name, color, children, onClick }) {
  return (
    <button
      type="button"
      className="chip-root"
      onClick={onClick}
      aria-label={name}
      style={{ "--chip-color": getColorVar(color) }}
    >
      {children}
    </button>
  );
}
