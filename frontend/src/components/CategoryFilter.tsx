interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selected, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('All')}
        className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 border ${
          selected === 'All'
            ? 'bg-primary/15 text-primary border-primary/40 neon-glow'
            : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-glass-border'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 border ${
            selected === cat
              ? 'bg-primary/15 text-primary border-primary/40 neon-glow'
              : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-glass-border'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
