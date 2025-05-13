
import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import CategoryList from "@/components/CategoryList";
import { Card } from "@/components/ui/card";
import { getAllPosts, getAllCategories, type Post } from "@/lib/posts";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts and categories
    try {
      const allPosts = getAllPosts();
      const allCategories = getAllCategories();
      
      setPosts(allPosts);
      setCategories(allCategories);
      
      // Set the first post as featured
      if (allPosts.length > 0) {
        setFeaturedPost(allPosts[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Exclude featured post from the main list
  const mainPosts = featuredPost 
    ? posts.filter(post => post.frontmatter.slug !== featuredPost.frontmatter.slug)
    : posts;

  return (
    <Layout>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Destaque</h2>
                <PostCard post={featuredPost.frontmatter} isFeature={true} />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main content - Posts */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold mb-6">Artigos Recentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mainPosts.map((post) => (
                    <PostCard 
                      key={post.frontmatter.slug} 
                      post={post.frontmatter} 
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Categories */}
                <Card className="p-4">
                  <CategoryList categories={categories} />
                </Card>

                {/* Newsletter signup */}
                <Card className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Inscreva-se na Newsletter</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Receba as melhores recomendações diretamente no seu email.
                  </p>
                  <form className="space-y-2">
                    <input 
                      type="email" 
                      placeholder="seu@email.com" 
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Inscrever-se
                    </button>
                  </form>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
