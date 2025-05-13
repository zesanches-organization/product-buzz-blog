
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Entre em Contato</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Envie-nos uma mensagem</h2>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">contato@blogrecomenda.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="font-medium">Telefone</h3>
                      <p className="text-muted-foreground">(11) 99999-9999</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <h3 className="font-medium">Endereço</h3>
                      <p className="text-muted-foreground">
                        Av. Paulista, 1000<br />
                        São Paulo - SP<br />
                        CEP: 01310-100
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Outros Motivos de Contato</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Parcerias</h3>
                    <p className="text-muted-foreground">
                      Para propostas comerciais e parcerias, envie um email para: 
                      <a href="mailto:parcerias@blogrecomenda.com.br" className="text-primary ml-1 hover:underline">
                        parcerias@blogrecomenda.com.br
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Sugestões de Produtos</h3>
                    <p className="text-muted-foreground">
                      Tem algum produto que gostaria de ver analisado? Utilize o formulário e marque o assunto como "Sugestão de Produto".
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Reportar Erros</h3>
                    <p className="text-muted-foreground">
                      Encontrou algum erro em nosso site ou em nossas análises? Por favor nos informe para que possamos corrigi-lo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
