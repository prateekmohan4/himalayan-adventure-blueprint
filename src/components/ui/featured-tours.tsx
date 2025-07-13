import { TourCard } from "@/components/ui/tour-card";
import spitiValley from "@/assets/spiti-valley.jpg";
import kashmirHouseboat from "@/assets/kashmir-houseboat.jpg";
import himachaliVillage from "@/assets/himachali-village.jpg";

export const FeaturedTours = () => {
  const tours = [
    {
      image: spitiValley,
      title: "Spiti Valley Odyssey",
      description: "Journey through the moonscapes of Spiti, visiting ancient monasteries and experiencing the unique high-altitude desert culture of this trans-Himalayan region.",
      duration: "10 Days",
      difficulty: "Moderate"
    },
    {
      image: kashmirHouseboat,
      title: "Kashmir Paradise Trek",
      description: "Explore the breathtaking beauty of Kashmir's meadows and valleys, staying in traditional houseboats and experiencing the rich culture of this paradise on earth.",
      duration: "7 Days",
      difficulty: "Easy"
    },
    {
      image: himachaliVillage,
      title: "Himachali Heritage Trail",
      description: "Immerse yourself in traditional mountain villages, discovering ancient customs, local crafts, and the warm hospitality of Himachali communities.",
      duration: "5 Days",
      difficulty: "Easy"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Signature Journeys
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Carefully crafted adventures that showcase the best of Himalayan culture and landscapes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <TourCard
              key={index}
              image={tour.image}
              title={tour.title}
              description={tour.description}
              duration={tour.duration}
              difficulty={tour.difficulty}
            />
          ))}
        </div>
      </div>
    </section>
  );
};