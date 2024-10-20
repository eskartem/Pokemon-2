export interface Seller {
    name: string;
    price: number;
  }
  
  export interface UserSellers {
    [key: string]: Seller[];
  }
  
  export const userSellers: UserSellers = {
    Pikachu: [
      { name: "Старый Леший", price: 12 },
      { name: "Мудрый Волшебник", price: 14 },
      { name: "Коллекционер Пикачу", price: 11 },
      { name: "Древний Маг", price: 13 },
    ],
    Charmander: [
      { name: "Друг Придурок", price: 16 },
      { name: "Огненный Воин", price: 18 },
      { name: "Путешественник по пустыням", price: 15 },
      { name: "Тренер Чармандеров", price: 17 },
    ],
    Bulbasaur: [
      { name: "Блогер-Тиктокер", price: 13 },
      { name: "Лесной Страж", price: 15 },
      { name: "Садовник из джунглей", price: 12 },
      { name: "Защитник Природы", price: 14 },
    ],
    Squirtle: [
      { name: "Путешественник по лесам", price: 10 },
      { name: "Морской Страж", price: 12 },
      { name: "Ловец черепах", price: 9 },
      { name: "Водяной Воин", price: 11 },
    ],
  };
  
