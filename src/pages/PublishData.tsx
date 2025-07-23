import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PublishData() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    domain: "",
    category: "",
    sensitivity: "",
    updateFrequency: "",
    format: "",
    apiEndpoint: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Produto de dados publicado",
      description: "Seu produto foi publicado com sucesso no catálogo.",
    });
  };

  const qualityChecks = [
    { name: "Schema válido", status: "success", description: "Estrutura de dados válida" },
    { name: "Dados de exemplo", status: "success", description: "Amostra de dados fornecida" },
    { name: "Metadados completos", status: "warning", description: "Adicione mais descrições" },
    { name: "Políticas de acesso", status: "success", description: "Configuradas corretamente" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publicar Dados</h1>
          <p className="text-muted-foreground mt-2">
            Publique seus produtos de dados no catálogo organizacional
          </p>
        </div>
        <Button onClick={handleSubmit} className="h-11">
          <Upload className="w-4 h-4 mr-2" />
          Publicar Produto
        </Button>
      </div>

      <Tabs defaultValue="metadata" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metadata">Metadados</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="access">Políticas</TabsTrigger>
          <TabsTrigger value="quality">Qualidade</TabsTrigger>
        </TabsList>

        <TabsContent value="metadata">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Defina as informações principais do produto de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Vendas por Região"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domínio</Label>
                  <Select value={formData.domain} onValueChange={(value) => setFormData({...formData, domain: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o domínio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Vendas</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Financeiro</SelectItem>
                      <SelectItem value="hr">Recursos Humanos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o produto de dados, sua origem e casos de uso..."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transactional">Transacional</SelectItem>
                      <SelectItem value="analytical">Analítico</SelectItem>
                      <SelectItem value="streaming">Streaming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sensitivity">Sensibilidade</Label>
                  <Select value={formData.sensitivity} onValueChange={(value) => setFormData({...formData, sensitivity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="internal">Interno</SelectItem>
                      <SelectItem value="restricted">Restrito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="updateFrequency">Frequência</Label>
                  <Select value={formData.updateFrequency} onValueChange={(value) => setFormData({...formData, updateFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Atualização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-time">Tempo Real</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema">
          <Card>
            <CardHeader>
              <CardTitle>Schema e Estrutura</CardTitle>
              <CardDescription>
                Defina a estrutura e formato dos dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Formato</Label>
                  <Select value={formData.format} onValueChange={(value) => setFormData({...formData, format: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="parquet">Parquet</SelectItem>
                      <SelectItem value="avro">Avro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">Endpoint da API</Label>
                  <Input
                    id="apiEndpoint"
                    placeholder="https://api.empresa.com/v1/vendas"
                    value={formData.apiEndpoint}
                    onChange={(e) => setFormData({...formData, apiEndpoint: e.target.value})}
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">Schema Example</span>
                </div>
                <pre className="text-sm text-muted-foreground overflow-auto">
{`{
  "id": "string",
  "produto": "string",
  "categoria": "string",
  "preco": "number",
  "data_venda": "datetime",
  "regiao": "string",
  "vendedor_id": "string"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Políticas de Acesso</CardTitle>
              <CardDescription>
                Configure quem pode acessar este produto de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Acesso Público</div>
                    <div className="text-sm text-muted-foreground">Todos os usuários autenticados</div>
                  </div>
                  <Badge variant="outline">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Aprovação Manual</div>
                    <div className="text-sm text-muted-foreground">Requer aprovação do proprietário</div>
                  </div>
                  <Badge variant="secondary">Desabilitado</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Domínios Específicos</div>
                    <div className="text-sm text-muted-foreground">Apenas usuários de domínios selecionados</div>
                  </div>
                  <Badge variant="secondary">Desabilitado</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Validação de Qualidade</CardTitle>
              <CardDescription>
                Status das verificações de qualidade dos dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {check.status === "success" ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-warning" />
                      )}
                      <div>
                        <div className="font-medium">{check.name}</div>
                        <div className="text-sm text-muted-foreground">{check.description}</div>
                      </div>
                    </div>
                    <Badge variant={check.status === "success" ? "default" : "secondary"}>
                      {check.status === "success" ? "Aprovado" : "Atenção"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}