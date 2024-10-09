import React from "react";
import "./MainMenu.css";

const MainMenu: React.FC = () => {
    return (
    <body className="Menu">
        <header>
            <span className="blockleft">ГЕРОЙ</span>
            <span className="blocmid">МОНЕТКИ</span>
            <span className="blocright">ЭНЕРГИЯ</span>
        </header>
        <aside>
            <nav></nav>
        </aside>
        <main></main>
        <footer>
            <span className="blockleft">ГЕРОЙ</span>
            <span className="blocmid">МОНЕТКИ</span>
            <span className="blocright">ЭНЕРГИЯ</span>
        </footer>
    </body>
);
};

export default MainMenu;