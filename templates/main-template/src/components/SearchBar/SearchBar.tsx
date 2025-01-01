import { HTMLProps, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css"

export interface SearchBarProps extends HTMLProps<HTMLDivElement> {
    items: SearchItem[];
    className?: string;
}

type SearchItem = {
    label: string;
    path: string;
}

const SearchBar = ({ items, className }: SearchBarProps) => {
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null)
    const [searchInput, setSearchInput] = useState("");
    const [showItems, setShowItems] = useState(false);

    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().match(searchInput.toLowerCase())
    )

    const onClickHandle = (idx: number) => {
        navigate(filteredItems[idx].path);
        setSearchInput("");
        searchRef.current!.blur();

    };

    return (
        <div className={`${className ?? ""} search-container`}>
            <input
                ref={searchRef}
                type="search"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
                onFocus={() => setShowItems(true)}
                onBlur={() => setShowItems(false)}
            />
            {filteredItems.length > 0 && showItems && (<ul className="search-list">
                {filteredItems.map((item, idx) => (
                    <li key={idx} className="search-item"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {onClickHandle(idx)}}
                    >{item.label}</li>
                ))}
            </ul>)}
        </div>
    );
};

export default SearchBar;