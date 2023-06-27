import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((existingItems) => [...existingItems, item]);
    //can use below also
    // setItems((existingItems) => existingItems.concat(item));
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    //we always have to return a new array to set the state remember that based on our requirment with the changes
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}

function Form({ onAddItems }) {
  //intial value is an empty string , form is empty when starting
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);
    console.log(newItem);

    // below is called making react keep in sync with the form elements
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 Trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {/* e.target.value is going to be string converting it to a number the short way using + */}
        {Array.from({ length: 20 }, (_, i) => {
          return i + 1;
        }).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItems(item.id);
        }}
      />
      {/* return empty style obejct if packed is false */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  // you need to check the length and you cant check !items because the items state is an
  // empty object at starting so empty objects are not falsy in js.

  const numItems = items.length;
  const numOfPacked = items.filter((item) => item.packed).length;
  // item.packed === true
  const percentage = Math.round((numOfPacked / numItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You got everything! Ready to go ✈️🌏</em>
      ) : (
        <em>
          💼 You have {numItems} items on your list, and you already packed{" "}
          {numOfPacked} ({percentage}%)
        </em>
      )}
      {/* you can also use a string literal template but rendering a separate tag is better */}
    </footer>
  );
}
