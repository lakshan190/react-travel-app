export default function Stats({ items }) {
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
