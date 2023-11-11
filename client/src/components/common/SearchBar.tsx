'use client';

import { useEffect, useRef, useState } from 'react';
import { BiSearch, BiArrowBack } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const SearchBar: React.FC = () => {
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const toggleSearchBarFocus = () => {
        setSearchActive(state => !state);
    }

    const handleCrossClick = () => {
        setSearchInput('');
        setSearchActive(false);
    }

    useEffect(() => {

        if (searchActive && searchInputRef) {
            searchInputRef.current?.focus();
        }

        if (!searchActive) {
            setSearchInput('');
        }
    }, [searchActive]);

    return (
        <div className="relative flex py-4 px-5 w-full">
            <button
                className="rounded-l-md relative px-4 bg-[#202c33] text-iconLight font-semibold"
                onClick={toggleSearchBarFocus}
            >
                {searchActive ? <BiArrowBack className="text-xl" /> : <BiSearch className="text-xl" />}
            </button>
            <input
                name='search-input-box'
                ref={searchInputRef}
                className="flex-1 py-2 bg-[#202c33] outline-none font-light"
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                onFocus={toggleSearchBarFocus}
                placeholder='Search or start a new chat'
            />
            <button
                className="rounded-r-md relative px-4 bg-[#202c33] text-iconLight font-semibold"
                onClick={handleCrossClick}
            >
                {searchActive && <MdClose className="text-lg" />}
            </button>
        </div>
    );
}

export default SearchBar;