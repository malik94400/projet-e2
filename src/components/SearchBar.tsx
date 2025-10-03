interface Props {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}
export default function SearchBar({ value, onChange, placeholder }: Props){
    return (
        <div className="search-wrap">
        <label className="sr-only" htmlFor="search">Rechercher</label>
        <input
    id="search"
    className="input"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder || "Rechercher..."}
    />
    </div>
);
}