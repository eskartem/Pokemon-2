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
            <a href="" className="Rynok">РЫНОК</a>
            <a href="" className="Market">МАРКЕТ</a>
        </aside>
        <main>
            <img src="https://i.pinimg.com/originals/60/8e/30/608e3068f873c58776f5f5fce86d9c70.png" alt="pikachu" className="picka"/>
        </main>
        <footer>
            <a href="" className="blockleft">КАРТА</a>
            <a href="" className="blocmid">ПОКЕМОНЫ</a>
            <a href="" className="blocright">НАСТРОЙКИ</a>
        </footer>
    </body>
);
};

export default MainMenu;