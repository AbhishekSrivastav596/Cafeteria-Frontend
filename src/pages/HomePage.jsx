import React from "react";

function HomePage() {
  const cards = [
    {
      id: 1,
      label: "Bistro",
      title: "The Gourmet Garden",
      subtitle: "Jose Osuna",
      image: "/path/to/bistro-image.jpg",
    },
    {
      id: 2,
      label: "Cocktail & Bar",
      title: "A Mixologist's Paradise",
      subtitle: "Unwind in purple paradise",
      image: "/path/to/cocktail-image.jpg",
    },
    {
      id: 3,
      label: "Sushi Restaurant",
      title: "Nigiri Nirvana",
      subtitle: "Sushi & Sashimi, Rice & Noodles",
      image: "/path/to/sushi-image.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 md:px-16">
      <h1 className="text-center text-3xl font-bold mb-10">
        Welcome to Our Homepage
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </div>
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{card.title}</h2>
              <p className="text-sm text-gray-600">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
