import React, { useState } from "react";

const Demo = () => {
  const [act, setAct] = useState("");
  const [acts, setActs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [priority, setPriority] = useState("");
  const [category, setcategory] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (!act.trim()) {
      setError("Please enter an activity");
      return;
    }
    if (!priority) {
      setError("Please select a priority");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }

    setError(""); // Clear error on success

    if (editingIndex !== null) {
      const updated = [...acts];
      updated[editingIndex] = {
        ...updated[editingIndex],
        text: act,
        priority: priority,
        category: category,
      };
      setActs(updated);
      setEditingIndex(null);
    } else {
      setActs([...acts, { text: act, priority, category, checked: false }]);
    }
    setAct("");
    setPriority("");
    setcategory("");
  }

  function handleEdit(index) {
    setAct(acts[index].text);
    setPriority(acts[index].priority);
    setcategory(acts[index].category);
    setEditingIndex(index);
  }

  function handleToggle(index) {
    const updated = [...acts];
    updated[index] = { ...updated[index], checked: !updated[index].checked };
    setActs(updated);
  }

  function filter(index) {
    setActs(() => acts.filter((_, i) => i != index));
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6">
        {/* ===== HEADER ===== */}
        <h1 className="text-2xl font-bold text-white text-center mb-1">
          Daily Activities
        </h1>
        <p className="text-sm text-gray-400 text-center mb-5">
          Stay on track with your daily goals
        </p>

        {/* ===== PROGRESS BAR ===== */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>2 of 5 completed</span>
            <span>40%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-purple-500 h-1.5 rounded-full transition-all"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>

        {/* ===== ADD TASK FORM ===== */}
        <form onSubmit={handleSubmit} className="mb-5 space-y-2">
          {/* Row 1: Input + Add */}
          <div className="flex gap-2">
            <input
              value={act}
              onChange={(e) => setAct(e.target.value)}
              type="text"
              placeholder="Add a new activity..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Add
            </button>
          </div>

          {/* Row 2: Priority + Category */}
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 cursor-pointer text-sm"
            >
              <option value="">Priority</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <select
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 cursor-pointer text-sm"
            >
              <option value="">Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="health">Health</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
        </form>

        {/* ===== SEARCH & FILTERS ===== */}
        <div className="flex gap-2 mb-5 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-3 py-1.5 rounded-lg bg-gray-700 text-white text-sm placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <button className="px-3 py-1.5 text-xs rounded-full bg-purple-600 text-white cursor-pointer">
            All
          </button>
          <button className="px-3 py-1.5 text-xs rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer">
            Active
          </button>
          <button className="px-3 py-1.5 text-xs rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer">
            Done
          </button>
        </div>

        {/* ===== CATEGORY TAGS ===== */}
        <div className="flex gap-2 mb-5 flex-wrap">
          <button className="px-2.5 py-1 text-xs rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500/20 transition-colors cursor-pointer">
            All
          </button>
          <button className="px-2.5 py-1 text-xs rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer">
            Work
          </button>
          <button className="px-2.5 py-1 text-xs rounded-full border border-green-500 text-green-400 hover:bg-green-500/20 transition-colors cursor-pointer">
            Personal
          </button>
          <button className="px-2.5 py-1 text-xs rounded-full border border-yellow-500 text-yellow-400 hover:bg-yellow-500/20 transition-colors cursor-pointer">
            Health
          </button>
          <button className="px-2.5 py-1 text-xs rounded-full border border-pink-500 text-pink-400 hover:bg-pink-500/20 transition-colors cursor-pointer">
            Shopping
          </button>
        </div>

        {/* ===== TASK LIST ===== */}
        <ul className="space-y-2">
          {acts.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 bg-gray-700 px-4 py-3 rounded-lg"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(i)}
                className="w-4 h-4 accent-purple-500 cursor-pointer"
              />
              <span
                className={`flex-1 text-white text-sm ${item.checked ? "line-through opacity-50" : ""}`}
              >
                {item.text}
              </span>

              {/* Priority Badge */}
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  item.priority === "high"
                    ? "bg-red-500/20 text-red-400"
                    : item.priority === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {item.priority}
              </span>

              {/* Category Badge */}
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  item.category === "work"
                    ? "bg-blue-500/20 text-blue-400"
                    : item.category === "personal"
                      ? "bg-green-500/20 text-green-400"
                      : item.category === "health"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-pink-500/20 text-pink-400"
                }`}
              >
                {item.category}
              </span>

              <button
                onClick={() => handleEdit(i)}
                className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => filter(i)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* ===== EMPTY STATE ===== */}
        {acts.length === 0 && (
          <p className="text-center text-gray-500 py-8 text-sm">
            No activities yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
};

export default Demo;
