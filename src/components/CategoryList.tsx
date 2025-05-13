
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type CategoryListProps = {
  categories: string[];
  activeCategory?: string;
};

export default function CategoryList({ categories, activeCategory }: CategoryListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Categorias</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link to={`/categorias/${category}`} key={category}>
            <Button
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className="mb-2"
            >
              {category}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
