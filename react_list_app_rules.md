# React List App — Thumb Rules & Best Practices

A reference guide for building any list-based app in React (to-do, shopping cart, contacts, notes, etc.)

---

## 🧠 Rule #1: Separate Form State from Data State

> **Form state is temporary. Data state is permanent.**

```
Form state (what the user is typing)  →  useState per input field
                ↓ on submit
Data state (the saved list)           →  useState as array of objects
                ↓ on render
Each item reads from ITS OWN object, not the form
```

**Why?** If your list items read from form state (`priority`), they all change when the form changes. Each item must carry its own data.

```js
// ❌ BAD — items stored as strings, shared state for properties
const [acts, setActs] = useState([]);       // ["Buy milk", "Walk dog"]
const [priority, setPriority] = useState(""); // one value for ALL items

// ✅ GOOD — items stored as objects with their own properties
const [acts, setActs] = useState([]);
// Each item: { text: "Buy milk", priority: "high", category: "work", checked: false }
```

---

## 🧠 Rule #2: Never Mutate State Directly

> **Always create a copy before modifying.**

React only re-renders when it detects a **new** reference. If you mutate the existing array, React thinks nothing changed.

```js
// ❌ BAD — mutating the original array
acts[index].checked = true;
setActs(acts);  // React won't re-render — same reference

// ✅ GOOD — copy array, copy the object, then modify
const updated = [...acts];
updated[index] = { ...updated[index], checked: !updated[index].checked };
setActs(updated);
```

**The pattern:**
1. `[...acts]` → shallow copy of the array
2. `{ ...acts[index] }` → shallow copy of the specific object
3. Modify the copy
4. `setActs(updated)` → React sees new reference → re-renders

---

## 🧠 Rule #3: One Shared State ≠ Per-Item State

> **If each item in a list needs its own value, store it INSIDE the item object.**

```js
// ❌ BAD — one boolean for all checkboxes
const [isChecked, setIsChecked] = useState(false);

// ✅ GOOD — each item has its own checked property
{ text: "...", checked: false }

// Toggle function targets a specific index
function handleToggle(index) {
  const updated = [...acts];
  updated[index] = { ...updated[index], checked: !updated[index].checked };
  setActs(updated);
}
```

**Ask yourself:** "If I have 10 items, does each one need its own version of this value?" If yes → put it in the object.

---

## 🧠 Rule #4: Pick ONE Validation Strategy

> **Don't mix HTML `required` and JavaScript validation for the same fields.**

| Approach | How | Best For |
|---|---|---|
| **HTML only** | Add `required` to inputs, use `type="submit"` | Simple forms, browser handles everything |
| **JS only** | Check values in `handleSubmit`, use `setError()` | Custom error messages, complex rules |
| **Both** | `required` as first defense, JS as backup | Production apps (belt and suspenders) |

```js
// ❌ CONFLICT — required blocks handleSubmit from ever running
<select required> ... </select>  // browser shows tooltip FIRST
// Your setError() never executes

// ✅ PICK ONE
// Option A: HTML only
<select required> ... </select>  // browser handles it

// Option B: JS only (recommended for custom messages)
<select> ... </select>           // no required
// In handleSubmit:
if (!priority) { setError("Please select a priority"); return; }
```

---

## 🧠 Rule #5: The 4 Core CRUD Operations

Every list app needs these. Here's the pattern for each:

### Create (Add)
```js
setActs([...acts, { text: act, priority, category, checked: false }]);
```

### Read (Display)
```jsx
{acts.map((item, i) => (
  <li key={i}>{item.text}</li>
))}
```

### Update (Edit)
```js
// Step 1: Load item data into form
function handleEdit(index) {
  setAct(acts[index].text);
  setPriority(acts[index].priority);
  setEditingIndex(index);
}

// Step 2: Save changes (in handleSubmit)
if (editingIndex !== null) {
  const updated = [...acts];
  updated[editingIndex] = { ...updated[editingIndex], text: act, priority };
  setActs(updated);
  setEditingIndex(null);
}
```

### Delete
```js
function handleDelete(index) {
  setActs(acts.filter((_, i) => i !== index));
}
```

---

## 🧠 Rule #6: Derived Values Don't Need State

> **If a value can be calculated from existing state, don't create a new `useState` for it.**

```js
// ❌ BAD — storing computed data in state
const [completedCount, setCompletedCount] = useState(0);
// Now you have to manually keep it in sync every time acts changes

// ✅ GOOD — compute it on every render
const completedCount = acts.filter(item => item.checked).length;
const totalCount = acts.length;
const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
```

**Examples of derived values:**
- Completed count / percentage → computed from `acts`
- Filtered list (search/filter) → computed from `acts`
- Whether to show "empty state" → `acts.length === 0`

---

## 🧠 Rule #7: Filter Without Mutating

> **Search and filters should create a derived list, not modify the original.**

```js
// ❌ BAD — overwriting acts with filtered results (original data lost!)
setActs(acts.filter(item => item.text.includes(searchTerm)));

// ✅ GOOD — create a separate filtered variable for rendering
const filteredActs = acts
  .filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(item => {
    if (activeFilter === "active") return !item.checked;
    if (activeFilter === "completed") return item.checked;
    return true; // "all"
  });

// Render filteredActs, but acts stays untouched
{filteredActs.map((item, i) => ...)}
```

---

## 📋 Quick Checklist Before Building

Use this before starting any list app:

- [ ] **Define the item shape** — What properties does each item have?
  ```js
  // Example: { id, text, priority, category, checked, createdAt }
  ```
- [ ] **Identify form fields** — Each input gets its own `useState`
- [ ] **Plan the CRUD functions** — Add, Edit, Delete, Toggle
- [ ] **Identify derived values** — Counts, filters, search (no extra state needed)
- [ ] **Choose validation approach** — HTML `required` OR JS validation, not both
- [ ] **Use unique keys** — Prefer `id` over array index for keys when items are reordered/deleted

---

## 🗂️ Recommended State Structure

```js
// ===== FORM STATE (temporary, for inputs) =====
const [inputText, setInputText] = useState("");
const [priority, setPriority] = useState("");
const [category, setCategory] = useState("");
const [editingIndex, setEditingIndex] = useState(null);
const [error, setError] = useState("");

// ===== DATA STATE (permanent, the list) =====
const [items, setItems] = useState([]);
// Each item: { id: Date.now(), text: "...", priority: "...", category: "...", checked: false }

// ===== UI STATE (for filters, search, view mode) =====
const [searchTerm, setSearchTerm] = useState("");
const [activeFilter, setActiveFilter] = useState("all");       // "all" | "active" | "completed"
const [activeCategory, setActiveCategory] = useState("all");

// ===== DERIVED VALUES (no useState needed!) =====
const completedCount = items.filter(i => i.checked).length;
const percent = items.length ? Math.round((completedCount / items.length) * 100) : 0;
const filteredItems = items
  .filter(i => i.text.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(i => activeFilter === "all" ? true : activeFilter === "active" ? !i.checked : i.checked)
  .filter(i => activeCategory === "all" ? true : i.category === activeCategory);
```

---

## ⚠️ Common Mistakes to Avoid

| Mistake | Why It Breaks | Fix |
|---|---|---|
| Storing items as strings | Can't attach priority, category, checked | Use objects |
| One `useState` for all checkboxes | Toggling one toggles all | Store `checked` per item |
| Reading form state in list items | All items show current form value | Read from `item.property` |
| Mutating state directly | React doesn't re-render | Always spread copy first |
| Mixing `required` + JS validation | Browser blocks your custom error | Pick one approach |
| Storing filtered results | Original data lost | Use derived variables |
| Using array index as key when reordering | React confuses items | Use unique `id` (e.g. `Date.now()`) |
