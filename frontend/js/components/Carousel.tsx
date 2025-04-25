
const Carousel = () => {
  const seasonalItems = [
    "WHAT'S ON SPECIAL THIS SEASON:",
    "KALE",
    "SILVERBEET",
    "SPINACH",
    "LETTUCE",
    "ENDIVE",
    "BROCCOLI",
    "CAULIFLOWER",
    "BRUSSELS SPROUTS",
    "CARROTS",
    "BEETROOT",
    "PARSNIPS",
    "TURNIPS",
  ];

  // Double or triple the array for seamless looping
  const doubledItems = [...seasonalItems, ...seasonalItems];

  return (
    <div className="header-carousel-container" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <div className="carousel-track">
        {doubledItems.map((item, index) => (
          <span
            key={index}
            className="carousel-item"
            style={{
              display: "inline-block",
              padding: "0 15px",
              fontSize: "1.2rem",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;