import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { TourCard } from "@/components/ui/tour-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import images
import trekBanner from "@/assets/trek-listing-banner.jpg";
import spitiValley from "@/assets/spiti-valley.jpg";
import kashmirHouseboat from "@/assets/kashmir-houseboat.jpg";
import himachaliVillage from "@/assets/himachali-village.jpg";
import chandratallLake from "@/assets/chandratal-lake.jpg";
import trekkersImage from "@/assets/trekkers-camp.jpg";

const TrekListing = () => {
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample trek data
  const allTreks = [
    {
      image: chandratallLake,
      title: "Chandratal Lake Trek",
      description: "Experience the mesmerizing beauty of the 'Moon Lake' nestled in the high-altitude desert landscape of Spiti Valley.",
      duration: "7 Days",
      difficulty: "Moderate",
      price: "₹25,000",
      slug: "chandratal-lake-trek"
    },
    {
      image: spitiValley,
      title: "Spiti Valley Odyssey",
      description: "Journey through the moonscapes of Spiti, visiting ancient monasteries and experiencing the unique high-altitude desert culture.",
      duration: "10 Days",
      difficulty: "Moderate",
      price: "₹35,000",
      slug: "spiti-valley-odyssey"
    },
    {
      image: kashmirHouseboat,
      title: "Kashmir Paradise Trek",
      description: "Explore the breathtaking beauty of Kashmir's meadows and valleys, staying in traditional houseboats.",
      duration: "7 Days",
      difficulty: "Easy",
      price: "₹28,000",
      slug: "kashmir-paradise-trek"
    },
    {
      image: himachaliVillage,
      title: "Himachali Heritage Trail",
      description: "Immerse yourself in traditional mountain villages, discovering ancient customs and local crafts.",
      duration: "5 Days",
      difficulty: "Easy",
      price: "₹18,000",
      slug: "himachali-heritage-trail"
    },
    {
      image: trekkersImage,
      title: "Hampta Pass Adventure",
      description: "Cross the famous Hampta Pass connecting Kullu and Lahaul valleys through diverse landscapes.",
      duration: "6 Days",
      difficulty: "Moderate",
      price: "₹22,000",
      slug: "hampta-pass-adventure"
    },
    {
      image: spitiValley,
      title: "Pin Parvati Pass Trek",
      description: "Challenge yourself with this demanding high-altitude trek through pristine Himalayan wilderness.",
      duration: "12 Days",
      difficulty: "Strenuous",
      price: "₹45,000",
      slug: "pin-parvati-pass-trek"
    },
    {
      image: chandratallLake,
      title: "Malana Village Trek",
      description: "Discover the mysterious village of Malana with its unique culture and ancient democratic system.",
      duration: "4 Days",
      difficulty: "Easy",
      price: "₹15,000",
      slug: "malana-village-trek"
    },
    {
      image: kashmirHouseboat,
      title: "Great Lakes of Kashmir",
      description: "Trek through the stunning alpine lakes of Kashmir including Vishansar, Krishansar, and Gadsar.",
      duration: "9 Days",
      difficulty: "Strenuous",
      price: "₹38,000",
      slug: "great-lakes-kashmir"
    },
    {
      image: himachaliVillage,
      title: "Beas Kund Trek",
      description: "A perfect beginner trek to the source of river Beas with stunning views of Hanuman Tibba.",
      duration: "3 Days",
      difficulty: "Easy",
      price: "₹12,000",
      slug: "beas-kund-trek"
    }
  ];

  const filteredTreks = allTreks.filter(trek => {
    const difficultyMatch = difficultyFilter === "all" || trek.difficulty.toLowerCase() === difficultyFilter;
    const durationMatch = durationFilter === "all" || 
      (durationFilter === "short" && parseInt(trek.duration) < 5) ||
      (durationFilter === "medium" && parseInt(trek.duration) >= 5 && parseInt(trek.duration) <= 10) ||
      (durationFilter === "long" && parseInt(trek.duration) > 10);
    
    return difficultyMatch && durationMatch;
  });

  // Pagination logic
  const treksPerPage = 9;
  const totalPages = Math.ceil(filteredTreks.length / treksPerPage);
  const startIndex = (currentPage - 1) * treksPerPage;
  const currentTreks = filteredTreks.slice(startIndex, startIndex + treksPerPage);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={trekBanner}
            alt="Himalayan Treks"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-secondary/40 to-primary/20"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Explore Our <span className="text-primary-muted">Treks</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-body font-light max-w-3xl mx-auto leading-relaxed">
            Discover breathtaking adventures across the majestic Himalayas of Himachal Pradesh
          </p>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="bg-card border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-1">
                <label className="text-sm font-body font-medium text-muted-foreground">Difficulty</label>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="strenuous">Strenuous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            <div className="space-y-1">
              <label className="text-sm font-body font-medium text-muted-foreground">Duration</label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Durations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">&lt; 5 Days</SelectItem>
                  <SelectItem value="medium">5-10 Days</SelectItem>
                  <SelectItem value="long">&gt; 10 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-body font-medium text-muted-foreground">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Trek Grid */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <p className="text-muted-foreground font-body">
              Showing {currentTreks.length} of {filteredTreks.length} treks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentTreks.map((trek, index) => (
              <Link key={index} to={`/trek/${trek.slug}`} className="block">
                <div className="group">
                  <TourCard
                    image={trek.image}
                    title={trek.title}
                    description={trek.description}
                    duration={trek.duration}
                    difficulty={trek.difficulty}
                  />
                  <div className="mt-4 px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display font-bold text-primary">
                        {trek.price}
                      </span>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrekListing;