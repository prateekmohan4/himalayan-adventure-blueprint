import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/ui/auth-modal";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: "Destinations", href: "/destinations" },
    { name: "Treks", href: "/treks" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl lg:text-2xl font-display font-bold text-foreground hover:text-primary transition-colors">
              Himalayan Adventures
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-body font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth and CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/cart")}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </Button>
                <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </>
            ) : (
              <AuthModal 
                trigger={
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Sign In
                  </Button>
                }
              />
            )}
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-6"
              onClick={() => navigate("/treks")}
            >
              Plan Your Trip
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-foreground hover:text-primary transition-colors duration-200 font-body font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold mt-4">
                Plan Your Trip
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};