
import Hero from "../components/Hero";

const About = () => {
  return (
    <div>
       <Hero
        backgroundVideo="lovable-uploads/video_fx_undefined_2025_05_03_17_23-2.mp4"
        backgroundImage="/lovable-uploads/ad98ec17-4140-41d1-bdfe-63c993a8c1e3.png"
        title="Our Story"
        subtitle="A family tradition of growing the finest peaches in Brentwood since 1955"
      />
      
      {/* History Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <img 
                src="/lovable-uploads/509cc7c2-eecb-482d-aac4-35e622e65ab2.png" 
                alt="Historical photo of Moffatt Ranch" 
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="heading-medium mb-6">Our Beginning</h2>
              <p className="text-gray-700 mb-4">
                In 1955, Jeanne and Walter Moffatt planted their first peach trees on a small plot of land in Brentwood, California. With determination and a deep love for farming, they built Moffatt Ranch from the ground up, establishing a reputation for growing exceptional stone fruit.
              </p>
              <p className="text-gray-700 mb-4">
                Their passion for farming and commitment to quality quickly earned them recognition throughout the region. The rich soil of Brentwood, combined with its ideal climate, provided the perfect conditions for growing sweet, juicy peaches and nectarines that customers came back for year after year.
              </p>
              <p className="text-gray-700">
                What began as a small family operation has flourished over six decades into one of Brentwood's beloved U-Pick destinations, while still maintaining the personal touch and quality that the Moffatt name has come to represent.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Family Legacy Section */}
      <section className="section-padding bg-peach-light">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="heading-medium mb-6">Continuing the Legacy</h2>
              <p className="text-gray-700 mb-4">
                Today, Jim and Michele Moffatt carry on the family tradition, maintaining the same standards of excellence established by Jim's parents. Under their stewardship, Moffatt Ranch continues to thrive and evolve while honoring its rich heritage.
              </p>
              <p className="text-gray-700 mb-4">
                Jim brings decades of farming expertise to the operation, carefully tending to each variety of fruit to ensure optimal flavor and quality. Michele's warm hospitality and community involvement have helped strengthen the ranch's connection with local residents and visitors alike.
              </p>
              <p className="text-gray-700">
                Together, they've expanded the orchard to include over 15 varieties of peaches and nectarines, as well as Asian pears, providing customers with a diverse selection of delicious, farm-fresh fruit throughout the growing season.
              </p>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="/lovable-uploads/ad98ec17-4140-41d1-bdfe-63c993a8c1e3.png" 
                alt="The Moffatt family" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Philosophy Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-medium mb-8">Our Philosophy</h2>
            
            <div className="mb-10">
              <h3 className="text-xl font-serif font-semibold mb-3 text-peach">Quality Above All</h3>
              <p className="text-gray-700">
                We believe in letting our fruit ripen naturally on the tree until it reaches peak flavor. We never compromise on quality, ensuring that every peach, nectarine, and pear that leaves our ranch is bursting with sweetness and juice.
              </p>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-serif font-semibold mb-3 text-peach">Sustainable Practices</h3>
              <p className="text-gray-700">
                As stewards of the land, we implement sustainable farming practices that minimize our environmental impact while maximizing the health of our soil and trees. This approach not only produces better fruit but ensures that future generations can continue enjoying what we've built.
              </p>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-serif font-semibold mb-3 text-peach">Community Connection</h3>
              <p className="text-gray-700">
                We believe farms should be places where families create lasting memories. Our U-Pick experience allows visitors to connect with their food source and enjoy the simple pleasure of harvesting perfectly ripe fruit. We're proud to be part of the agricultural heritage of Brentwood and to share our passion with our community.
              </p>
            </div>
            
            <div>
              <img 
                src="/lovable-uploads/bff42a70-320b-4900-a939-844cee7ea426.png" 
                alt="Team member with boxes of fresh peaches" 
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
