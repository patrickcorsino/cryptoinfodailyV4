export default function SidebarTools({ tools, selected, setSelected }) {
  return (
    <nav className="bg-card min-w-[220px] rounded-r-2xl shadow-cardGlow py-8 px-2 flex flex-col gap-2 mt-2">
      <h2 className="text-xl font-bold mb-6 px-2">Tools</h2>
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`w-full text-left py-2 px-4 rounded-lg transition font-semibold ${
            selected === tool.id ? "bg-degen text-darkBg" : "hover:bg-cardHover text-white"
          }`}
          onClick={() => setSelected(tool.id)}
        >
          {tool.name}
        </button>
      ))}
    </nav>
  );
}
