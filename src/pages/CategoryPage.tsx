
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import CategoryList from '@/components/CategoryList';
import { getAllCategories, getPostsByCategory, type Post } from '@/lib/posts';

const CategoryPage = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allCategories = getAllCategories();
      setCategories(allCategories);
      
      if (categoria) {
        const filteredPosts = getPostsByCategory(categoria);
        setPosts(filteredPosts);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  }, [categoria]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {categoria ? `Categoria: ${categoria}` : 'Todas as Categorias'}
          </h1>
          <CategoryList categories={categories} activeCategory={categoria} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.frontmatter.slug} post={post.frontmatter} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-medium mb-2">Nenhum post encontrado</h2>
                <p className="text-muted-foreground">
                  Não encontramos posts para esta categoria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
