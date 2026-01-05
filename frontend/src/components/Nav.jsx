import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [text] = useState(() => {
    const data = [
      "Stay organized and get things done.",
      "Small steps lead to big achievements.",
      "Focus on progress, not perfection.",
      "One task at a time.",
      "Start small, finish strong.",
      "Consistency builds results.",
      "Turn plans into action.",
      "Make today productive.",
    ];
    const idx = Math.floor(Math.random() * data.length);
    return data[idx];
  });
  return (
    <nav className="text-center">
      <Link to="/" className="text-teal-600 text-4xl font-extrabold mb-1 block">
        Task Management
      </Link>
      <p className="text-neutral-500">{text}</p>
    </nav>
  );
}

export default Nav;
