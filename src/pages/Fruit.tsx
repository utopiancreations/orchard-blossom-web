
import Hero from "../components/Hero";

type FruitVariety = {
  name: string;
  description: string;
  season: string;
  image: string;
  type: "yellow-peach" | "white-peach" | "yellow-nectarine" | "white-nectarine" | "asian-pear";
};

const fruitVarieties: FruitVariety[] = [
  {
    name: "Red Haven Peach",
    description: "A classic yellow peach with excellent flavor and firmness. Great for eating fresh or canning.",
    season: "Mid-June to early July",
    image: "/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png",
    type: "yellow-peach"
  },
  {
    name: "Elegant Lady Peach",
    description: "Large, juicy yellow peach with exceptional sweetness and beautiful red blush skin.",
    season: "Mid to late July",
    image: "/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png",
    type: "yellow-peach"
  },
  {
    name: "O'Henry Peach",
    description: "A late-season favorite with rich flavor and firm texture. Perfect for fresh eating and preserves.",
    season: "Late July to early August",
    image: "/lovable-uploads/7a4769d7-643d-4a8f-84fa-4ed084f81d1f.png",
    type: "yellow-peach"
  },
  {
    name: "Snow King White Peach",
    description: "Sweet white flesh with low acidity and delicate floral notes. A melt-in-your-mouth experience.",
    season: "Mid to late July",
    image: "/lovable-uploads/7a4769d7-643d-4a8f-84fa-4ed084f81d1f.png",
    type: "white-peach"
  },
  {
    name: "Arctic Supreme White Peach",
    description: "Incredibly sweet white peach with hints of honey and almond. Customer favorite!",
    season: "Late July",
    image: "/lovable-uploads/7a4769d7-643d-4a8f-84fa-4ed084f81d1f.png",
    type: "white-peach"
  },
  {
    name: "Independence Nectarine",
    description: "Early-season yellow nectarine with excellent flavor balance and beautiful red skin.",
    season: "Late June to early July",
    image: "/lovable-uploads/7b44f342-65a3-47b7-b937-50b5ebb4b1bb.png",
    type: "yellow-nectarine"
  },
  {
    name: "Fantasia Nectarine",
    description: "Large yellow nectarine with outstanding sweet flavor and aromatic qualities.",
    season: "Mid-July",
    image: "/lovable-uploads/7b44f342-65a3-47b7-b937-50b5ebb4b1bb.png",
    type: "yellow-nectarine"
  },
  {
    name: "Arctic Rose White Nectarine",
    description: "Sweet, juicy white-fleshed nectarine with beautiful red skin and minimal acidity.",
    season: "Mid to late July",
    image: "/lovable-uploads/7b44f342-65a3-47b7-b937-50b5ebb4b1bb.png",
    type: "white-nectarine"
  },
  {
    name: "Shinko Asian Pear",
    description: "Crisp, juicy pear with light brown russet skin and sweet, refreshing flavor.",
    season: "August to September",
    image: "/lovable-uploads/972e2dff-cf65-4a68-9d46-7919f34e7fd5.png",
    type: "asian-pear"
  },
  {
    name: "Hosui Asian Pear",
    description: "Golden brown skin with exceptionally juicy, sweet flesh. Crisp like an apple but with pear flavor.",
    season: "August",
    image: "/lovable-uploads/972e2dff-cf65-4a68-9d46-7919f34e7fd5.png",
    type: "asian-pear"
  }
];

const Fruit = () => {
  return (
    <div>
      <Hero
        backgroundImage="/lovable-uploads/87ed0cf3-be46-4d35-945a-8b493c437024.png"
        title="Our Fruit"
        subtitle="Discover the variety of tree-ripened peaches, nectarines, and Asian pears at Moffatt Ranch"
      />
      
      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="heading-medium mb-6">Farm Fresh Varieties</h2>
          <p className="text-gray-700 text-lg mb-6">
            At Moffatt Ranch, we grow over 15 varieties of peaches and nectarines, along with delicious Asian pears. Each variety has been carefully selected for its exceptional flavor, juiciness, and overall quality.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            Our fruit is allowed to ripen naturally on the tree, developing maximum sweetness and flavor before it's picked. Whether you're visiting for U-Pick or purchasing our pre-picked fruit, you're guaranteed the freshest, most delicious stone fruit experience.
          </p>
          <p className="text-gray-700 text-lg">
            Availability varies throughout the season, so check our social media or give us a call to find out what's currently ripe for picking!
          </p>
        </div>
      </section>
      
      {/* Yellow Peaches */}
      <section className="section-padding bg-peach-light">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">Yellow Peaches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fruitVarieties
              .filter(fruit => fruit.type === "yellow-peach")
              .map((fruit, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={fruit.image} 
                      alt={fruit.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-serif font-semibold mb-2">{fruit.name}</h3>
                    <p className="text-gray-700 mb-3">{fruit.description}</p>
                    <p className="text-sm text-peach font-medium">Season: {fruit.season}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      
      {/* White Peaches */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">White Peaches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fruitVarieties
              .filter(fruit => fruit.type === "white-peach")
              .map((fruit, index) => (
                <div key={index} className="bg-leaf rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={fruit.image} 
                      alt={fruit.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-serif font-semibold mb-2">{fruit.name}</h3>
                    <p className="text-gray-700 mb-3">{fruit.description}</p>
                    <p className="text-sm text-peach font-medium">Season: {fruit.season}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      
      {/* Yellow Nectarines */}
      <section className="section-padding bg-peach-light">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">Yellow Nectarines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fruitVarieties
              .filter(fruit => fruit.type === "yellow-nectarine")
              .map((fruit, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={fruit.image} 
                      alt={fruit.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-serif font-semibold mb-2">{fruit.name}</h3>
                    <p className="text-gray-700 mb-3">{fruit.description}</p>
                    <p className="text-sm text-peach font-medium">Season: {fruit.season}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      
      {/* White Nectarines */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">White Nectarines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fruitVarieties
              .filter(fruit => fruit.type === "white-nectarine")
              .map((fruit, index) => (
                <div key={index} className="bg-leaf rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={fruit.image} 
                      alt={fruit.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-serif font-semibold mb-2">{fruit.name}</h3>
                    <p className="text-gray-700 mb-3">{fruit.description}</p>
                    <p className="text-sm text-peach font-medium">Season: {fruit.season}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      
      {/* Asian Pears */}
      <section className="section-padding bg-peach-light">
        <div className="container mx-auto">
          <h2 className="heading-medium text-center mb-10">Asian Pears</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fruitVarieties
              .filter(fruit => fruit.type === "asian-pear")
              .map((fruit, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={fruit.image} 
                      alt={fruit.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-serif font-semibold mb-2">{fruit.name}</h3>
                    <p className="text-gray-700 mb-3">{fruit.description}</p>
                    <p className="text-sm text-peach font-medium">Season: {fruit.season}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      
      {/* Seasonal Availability */}
      <section className="section-padding bg-ranch-blue text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-medium text-center mb-10">Seasonal Availability</h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-semibold mb-4">When to Visit</h3>
              <p className="mb-4">
                Our U-Pick season typically runs from early June through August, depending on weather conditions and fruit ripening schedules.
              </p>
              <p>
                Different varieties ripen at different times, so there's always something delicious to pick throughout the season!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="text-xl font-serif font-medium mb-3 text-peach-light">Early Season</h4>
                <p className="font-medium">June - Early July</p>
                <p className="text-sm mt-2">Early peach and nectarine varieties</p>
              </div>
              
              <div>
                <h4 className="text-xl font-serif font-medium mb-3 text-peach-light">Mid Season</h4>
                <p className="font-medium">Mid July</p>
                <p className="text-sm mt-2">Peak varieties of peaches and nectarines</p>
              </div>
              
              <div>
                <h4 className="text-xl font-serif font-medium mb-3 text-peach-light">Late Season</h4>
                <p className="font-medium">Late July - August</p>
                <p className="text-sm mt-2">Late peaches, nectarines, and Asian pears</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="italic">
                For current picking availability, please check our social media pages or give us a call before your visit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fruit;
