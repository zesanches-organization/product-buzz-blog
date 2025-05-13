
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/30 dark:from-primary/5 dark:to-secondary/10">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Recomendações de Produtos Testados
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Análises detalhadas e comparativos dos melhores produtos disponíveis no mercado brasileiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/categorias/Tecnologia">
              <Button size="lg">Explorar Tecnologia</Button>
            </Link>
            <Link to="/categorias">
              <Button variant="outline" size="lg">
                Ver todas categorias
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Abstract shapes for decoration */}
      <div className="hidden md:block absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/5 mix-blend-multiply dark:mix-blend-overlay"></div>
      <div className="hidden md:block absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/10 mix-blend-multiply dark:mix-blend-overlay"></div>
    </div>
  );
}
