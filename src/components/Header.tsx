
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          TechReviews
        </Link>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button onClick={toggleMenu} className="block md:hidden p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
            <Link to="/categorias" className="text-foreground/80 hover:text-foreground transition-colors">Categorias</Link>
            <Link to="/sobre" className="text-foreground/80 hover:text-foreground transition-colors">Sobre</Link>
            <Link to="/contato" className="text-foreground/80 hover:text-foreground transition-colors">Contato</Link>
            <Link to="/admin" className="text-foreground/80 hover:text-foreground transition-colors">Admin</Link>
            <ThemeToggle />
          </nav>
        )}

        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md z-50">
            <nav className="flex flex-col p-4">
              <Link to="/" className="py-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/categorias" className="py-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMenu}>Categorias</Link>
              <Link to="/sobre" className="py-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMenu}>Sobre</Link>
              <Link to="/contato" className="py-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMenu}>Contato</Link>
              <Link to="/admin" className="py-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMenu}>Admin</Link>
              <div className="py-2">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}

        {/* Theme Toggle (Mobile) */}
        {isMobile && !isMenuOpen && <ThemeToggle />}
      </div>
    </header>
  );
};

export default Header;
