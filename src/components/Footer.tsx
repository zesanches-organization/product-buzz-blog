
import { Link } from "react-router-dom";
import { Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">BlogRecomenda</h2>
            <p className="mb-4 text-muted-foreground">
              Recomendações imparciais dos melhores produtos e equipamentos testados por especialistas.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:contato@blogrecomenda.com.br"
                className="hover:text-primary"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="text-muted-foreground hover:text-primary transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/categorias/Tecnologia" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tecnologia
                </Link>
              </li>
              <li>
                <Link 
                  to="/categorias/Esportes" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Esportes
                </Link>
              </li>
              <li>
                <Link 
                  to="/categorias/Saúde" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Saúde
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BlogRecomenda. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
