import { Link } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

// Import images
import blogFeatured from "@/assets/blog-featured.jpg";
import spitiValley from "@/assets/spiti-valley.jpg";
import chandratallLake from "@/assets/chandratal-lake.jpg";
import trekkersImage from "@/assets/trekkers-camp.jpg";
import kashmirHouseboat from "@/assets/kashmir-houseboat.jpg";
import himachaliVillage from "@/assets/himachali-village.jpg";

const Blog = () => {
  const featuredArticle = {
    title: "Complete Guide to High-Altitude Trekking in Spiti Valley",
    excerpt: "Discover everything you need to know about trekking in one of India's most spectacular high-altitude regions. From preparation tips to cultural insights, this comprehensive guide will help you plan the perfect Spiti adventure.",
    image: blogFeatured,
    category: "Trekking Guides",
    readTime: "12 min read",
    date: "October 25, 2024",
    author: "Rajesh Kumar",
    slug: "spiti-valley-trekking-guide"
  };

  const articles = [
    {
      title: "Best Time to Visit Chandratal Lake",
      excerpt: "Planning your trip to the Moon Lake? Here's everything you need to know about the best seasons, weather conditions, and what to expect.",
      image: chandratallLake,
      category: "Travel Tips",
      readTime: "6 min read",
      date: "October 20, 2024",
      author: "Priya Sharma",
      slug: "chandratal-lake-best-time"
    },
    {
      title: "Essential Gear for Himalayan Treks",
      excerpt: "A comprehensive checklist of must-have equipment for safe and comfortable trekking in the Himalayas.",
      image: trekkersImage,
      category: "Gear Guide",
      readTime: "8 min read",
      date: "October 15, 2024",
      author: "Tenzin Norbu",
      slug: "himalayan-trekking-gear"
    },
    {
      title: "Cultural Etiquette in Himalayan Villages",
      excerpt: "Learn about local customs, traditions, and respectful practices when visiting mountain communities.",
      image: himachaliVillage,
      category: "Culture",
      readTime: "5 min read",
      date: "October 10, 2024",
      author: "Priya Sharma",
      slug: "himalayan-village-etiquette"
    },
    {
      title: "Photography Tips for Mountain Landscapes",
      excerpt: "Capture the breathtaking beauty of the Himalayas with these expert photography techniques and tips.",
      image: spitiValley,
      category: "Photography",
      readTime: "7 min read",
      date: "October 5, 2024",
      author: "Rajesh Kumar",
      slug: "mountain-photography-tips"
    },
    {
      title: "Kashmir: Paradise Rediscovered",
      excerpt: "Explore the stunning beauty and rich culture of Kashmir through our latest expedition reports and travel insights.",
      image: kashmirHouseboat,
      category: "Destinations",
      readTime: "10 min read",
      date: "September 30, 2024",
      author: "Dr. Amit Patel",
      slug: "kashmir-travel-guide"
    },
    {
      title: "Acclimatization Tips for High-Altitude Treks",
      excerpt: "Essential advice for safely adjusting to high altitudes and preventing altitude sickness during your trek.",
      image: trekkersImage,
      category: "Health & Safety",
      readTime: "9 min read",
      date: "September 25, 2024",
      author: "Dr. Amit Patel",
      slug: "high-altitude-acclimatization"
    }
  ];

  const categories = [
    "All Articles",
    "Trekking Guides", 
    "Travel Tips",
    "Gear Guide",
    "Culture",
    "Photography",
    "Destinations",
    "Health & Safety"
  ];

  const recentPosts = [
    "Complete Guide to High-Altitude Trekking in Spiti Valley",
    "Best Time to Visit Chandratal Lake",
    "Essential Gear for Himalayan Treks",
    "Cultural Etiquette in Himalayan Villages",
    "Photography Tips for Mountain Landscapes"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Featured Article */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredArticle.image}
            alt={featuredArticle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/60 to-secondary/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="bg-primary text-primary-foreground mb-4">
              Featured Article
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {featuredArticle.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-body mb-8 leading-relaxed max-w-3xl">
              {featuredArticle.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-body mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {featuredArticle.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {featuredArticle.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {featuredArticle.readTime}
              </div>
            </div>
            
            <Link 
              to={`/blog/${featuredArticle.slug}`}
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Read Full Article
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
              More Inspiration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <Link key={index} to={`/blog/${article.slug}`} className="group">
                  <Card className="overflow-hidden hover:shadow-elevation-2 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-body">
                          {article.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                        <span>{article.author}</span>
                        <span>{article.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    Article Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-body py-1 text-sm"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    Recent Posts
                  </h3>
                  <div className="space-y-3">
                    {recentPosts.map((post, index) => (
                      <Link
                        key={index}
                        to="#"
                        className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm leading-relaxed"
                      >
                        {post}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    Stay Updated
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-4">
                    Subscribe to our newsletter for the latest trekking tips and adventure stories.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold py-2 text-sm rounded-lg transition-colors">
                      Subscribe
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;