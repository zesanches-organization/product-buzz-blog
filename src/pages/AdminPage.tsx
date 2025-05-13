
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPostList from '@/components/admin/AdminPostList';
import CreatePostForm from '@/components/admin/CreatePostForm';
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { toast } = useToast();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="posts">Artigos</TabsTrigger>
            <TabsTrigger value="create">Criar Novo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <AdminPostList />
          </TabsContent>
          
          <TabsContent value="create">
            <CreatePostForm 
              onSuccess={() => {
                setActiveTab("posts");
                toast({
                  title: "Sucesso!",
                  description: "Artigo criado com sucesso.",
                });
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
