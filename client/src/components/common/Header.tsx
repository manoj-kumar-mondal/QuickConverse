import React from "react";

interface HeaderProps {
    children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div className="flex w-full py-3 max-h-14 md:max-h-16 h-16 bg-headerBg shadow-sm shadow-gray-700 px-4 z-10">
            {children}
        </div>
    );
}

export default Header;