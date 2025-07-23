import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Star, Eye, Calendar, Database, Shield, AlertCircle, CheckCircle, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DataProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Mock data - In real app, fetch based on ID
  const product = {
    id: "dp-001",
    name: "Vendas por Região",
    description: "Dados agregados de vendas organizados por região geográfica, atualizados diariamente. Inclui métricas de receita, volume de transações e performance por vendedor.",
    domain: "Vendas",
    owner: "Carlos Santos",
    category: "Transacional",
    sensitivity: "Interno",
    status: "active",
    quality: 94,
    lastUpdate: "2024-01-22",
    createdAt: "2023-12-01",
    version: "v2.1.0",
    format: "JSON/CSV",
    apiEndpoint: "https://api.empresa.com/v1/vendas/regiao",
    documentation: "https://docs.empresa.com/data/vendas-regiao",
    consumers: 23,
    downloads: 156,
    rating: 4.8,
    reviews: 12,
    size: "2.3 GB",
    updateFrequency: "Diário"
  };

  const schema = [
    { field: "id", type: "string", description: "Identificador único da venda", required: true },
    { field: "produto", type: "string", description: "Nome do produto vendido", required: true },
    { field: "categoria", type: "string", description: "Categoria do produto", required: false },
    { field: "preco", type: "number", description: "Preço de venda em reais", required: true },
    { field: "data_venda", type: "datetime", description: "Data e hora da venda", required: true },
    { field: "regiao", type: "string", description: "Região geográfica", required: true },
    { field: "vendedor_id", type: "string", description: "ID do vendedor responsável", required: true },
    { field: "comissao", type: "number", description: "Valor da comissão", required: false }
  ];

  const qualityMetrics = [
    { metric: "Completude", score: 98, status: "excellent" },
    { metric: "Precisão", score: 95, status: "excellent" },
    { metric: "Consistência", score: 92, status: "good" },
    { metric: "Atualidade", score: 89, status: "good" },
    { metric: "Validade", score: 96, status: "excellent" }
  ];

  const recentReviews = [
    {
      id: "review-001",
      user: "Ana Silva",
      department: "Marketing",
      rating: 5,
      comment: "Dados muito úteis para análise regional. Qualidade excelente e bem documentado!",
      date: "2024-01-20"
    },
    {
      id: "review-002",
      user: "Marina Costa",
      department: "BI",
      rating: 4,
      comment: "Boa estrutura, mas poderia ter mais granularidade temporal.",
      date: "2024-01-18"
    }
  ];

  const accessHistory = [
    { user: "Ana Silva", department: "Marketing", action: "Download CSV", date: "2024-01-22 14:30" },
    { user: "Roberto Lima", department: "Estratégia", action: "API Access", date: "2024-01-22 13:45" },
    { user: "Marina Costa", department: "BI", action: "Download JSON", date: "2024-01-22 11:20" }
  ];

  const handleRequestAccess = () => {
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de acesso foi enviada para aprovação.",
    });
  };

  const handleDownload = (format: string) => {
    toast({
      title: `Download iniciado`,
      description: `Arquivo ${format} sendo preparado para download.`,
    });
  };

  const handleSubmitReview = () => {
    if (rating > 0) {
      toast({
        title: "Avaliação enviada",
        description: "Obrigado pelo seu feedback!",
      });
      setRating(0);
      setComment("");
    }
  };

  const getQualityBadge = (score: number) => {
    if (score >= 95) return <Badge className="bg-success/10 text-success border-success/20">Excelente</Badge>;
    if (score >= 85) return <Badge className="bg-warning/10 text-warning border-warning/20">Bom</Badge>;
    return <Badge variant="outline" className="border-destructive text-destructive">Precisa Melhorar</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "good":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          interactive ? 'cursor-pointer hover:text-primary' : ''
        } ${
          i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted-foreground'
        }`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Catálogo
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
            <Badge variant="outline">{product.domain}</Badge>
            <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>
          </div>
          <p className="text-muted-foreground max-w-3xl">{product.description}</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {product.consumers} consumidores
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {product.downloads} downloads
            </div>
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
              <span className="ml-1">{product.rating} ({product.reviews} avaliações)</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRequestAccess}>
            <Shield className="w-4 h-4 mr-2" />
            Solicitar Acesso
          </Button>
          <Button onClick={() => handleDownload('JSON')}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualidade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product.quality}%</div>
            {getQualityBadge(product.quality)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamanho</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product.size}</div>
            <p className="text-xs text-muted-foreground">
              Atualizado {product.updateFrequency.toLowerCase()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Versão</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product.version}</div>
            <p className="text-xs text-muted-foreground">
              Última atualização: {product.lastUpdate}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proprietário</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{product.owner}</div>
            <p className="text-xs text-muted-foreground">
              Domínio {product.domain}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schema" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="quality">Qualidade</TabsTrigger>
          <TabsTrigger value="access">Acesso</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="metadata">Metadados</TabsTrigger>
        </TabsList>

        <TabsContent value="schema">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura dos Dados</CardTitle>
              <CardDescription>
                Schema detalhado do produto de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Obrigatório</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schema.map((field, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono font-medium">{field.field}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{field.type}</Badge>
                      </TableCell>
                      <TableCell>
                        {field.required ? (
                          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                            Sim
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Opcional</Badge>
                        )}
                      </TableCell>
                      <TableCell>{field.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Qualidade</CardTitle>
              <CardDescription>
                Avaliação detalhada da qualidade dos dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(metric.status)}
                      <div>
                        <div className="font-medium">{metric.metric}</div>
                        <div className="text-sm text-muted-foreground">Score: {metric.score}%</div>
                      </div>
                    </div>
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Acesso</CardTitle>
                <CardDescription>
                  Como acessar este produto de dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">API Endpoint</div>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    {product.apiEndpoint}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Formatos Disponíveis</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDownload('JSON')}>
                      JSON
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('CSV')}>
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('Parquet')}>
                      Parquet
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Documentação</div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={product.documentation} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Documentação
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Acesso</CardTitle>
                <CardDescription>
                  Últimos acessos ao produto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {accessHistory.map((access, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-medium">{access.user}</div>
                        <div className="text-muted-foreground">{access.department}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{access.action}</div>
                        <div className="text-muted-foreground">{access.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Avaliar Produto</CardTitle>
                <CardDescription>
                  Compartilhe sua experiência com este produto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Avaliação</div>
                  <div className="flex gap-1">
                    {renderStars(rating, true)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Comentário</div>
                  <Textarea
                    placeholder="Compartilhe sua experiência..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <Button onClick={handleSubmitReview} disabled={rating === 0}>
                  Enviar Avaliação
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avaliações Recentes</CardTitle>
                <CardDescription>
                  O que outros usuários estão dizendo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-muted-foreground">{review.department}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metadata">
          <Card>
            <CardHeader>
              <CardTitle>Metadados Completos</CardTitle>
              <CardDescription>
                Informações técnicas e administrativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">ID do Produto</div>
                    <div className="font-mono">{product.id}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Categoria</div>
                    <div>{product.category}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Sensibilidade</div>
                    <Badge variant="outline">{product.sensitivity}</Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Frequência de Atualização</div>
                    <div>{product.updateFrequency}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Data de Criação</div>
                    <div>{product.createdAt}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Última Atualização</div>
                    <div>{product.lastUpdate}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Formato</div>
                    <div>{product.format}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Tamanho do Dataset</div>
                    <div>{product.size}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}