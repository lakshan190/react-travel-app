import { useState } from "react";
import Logo from "./Logo.js";
import Stats from "./Stats.js";
import PackingList from "./PackingList.js";
import Form from "./Form.js";

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

  function handleClearItems() {
    const confirm = window.confirm("Are you sure you want to clear all items?");

    if (confirm) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
