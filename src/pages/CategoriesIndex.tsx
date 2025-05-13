
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getAllCategories } from '@/lib/posts';

const CategoriesIndex = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const categoryIcons: Record<string, string> = {
    Tecnologia: '💻',
    Esportes: '🏃',
    Saúde: '🏥',
  };

  useEffect(() => {
    try {
      const allCategories = getAllCategories();
      setCategories(allCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Categorias</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`/categorias/${category}`} key={category}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{categoryIcons[category] || '📦'}</span>
                    <h2 className="text-xl font-semibold">{category}</h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Confira todas as recomendações na categoria {category}.
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesIndex;
