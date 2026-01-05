import { Search } from "lucide-react";
import { useTodos } from "../provider/TodoProvider";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useTodos();
  return (
    <div className="relative mb-6 flex gap-2.5">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
      />
      <input
        type="text"
        placeholder="Search your tasks..."
        className="w-full pl-10 pr-4 py-3 border border-neutral-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link
        to="create"
        className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center gap-1"
      >
        <Plus size={20} /> Create
      </Link>
    </div>
  );
}

export default SearchBar;
