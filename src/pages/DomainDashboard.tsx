import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Users, TrendingUp, Database, Star, MessageSquare, Download, Eye } from "lucide-react";

export default function DomainDashboard() {
  const domainProducts = [
    {
      id: "dp-001",
      name: "Vendas por Região",
      status: "active",
      quality: 94,
      consumers: 23,
      downloads: 156,
      rating: 4.8,
      lastUpdate: "2024-01-22"
    },
    {
      id: "dp-002",
      name: "Performance de Vendedores",
      status: "active",
      quality: 87,
      consumers: 12,
      downloads: 89,
      rating: 4.5,
      lastUpdate: "2024-01-21"
    },
    {
      id: "dp-003",
      name: "Pipeline de Vendas",
      status: "under_review",
      quality: 76,
      consumers: 8,
      downloads: 34,
      rating: 4.2,
      lastUpdate: "2024-01-20"
    }
  ];

  const consumerFeedback = [
    {
      id: "fb-001",
      product: "Vendas por Região",
      user: "Ana Silva (Marketing)",
      rating: 5,
      comment: "Dados muito úteis para análise regional. Qualidade excelente!",
      date: "2024-01-22"
    },
    {
      id: "fb-002",
      product: "Performance de Vendedores",
      user: "Carlos Santos (Comercial)",
      rating: 4,
      comment: "Boa estrutura, mas poderia ter mais granularidade temporal.",
      date: "2024-01-21"
    }
  ];

  const accessRequests = [
    {
      id: "req-001",
      product: "Vendas por Região",
      user: "Marina Costa (BI)",
      department: "Inteligência de Negócios",
      requestDate: "2024-01-22",
      status: "pending",
      justification: "Dashboard executivo Q1 2024"
    },
    {
      id: "req-002",
      product: "Pipeline de Vendas",
      user: "Roberto Lima (Estratégia)",
      department: "Planejamento Estratégico",
      requestDate: "2024-01-21",
      status: "pending",
      justification: "Análise de previsão de receita"
    }
  ];

  const getQualityBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-success/10 text-success border-success/20">Excelente</Badge>;
    if (score >= 80) return <Badge className="bg-warning/10 text-warning border-warning/20">Bom</Badge>;
    return <Badge variant="outline" className="border-destructive text-destructive">Precisa Melhorar</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>;
      case "under_review":
        return <Badge variant="secondary">Em Revisão</Badge>;
      case "pending":
        return <Badge variant="outline">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel do Domínio</h1>
          <p className="text-muted-foreground mt-2">
            Domínio: <span className="font-medium">Vendas</span> • Gerencie seus produtos de dados
          </p>
        </div>
        <Button>
          <Database className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumidores Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">
              +12% vs. mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads Total</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">279</div>
            <p className="text-xs text-muted-foreground">
              +23% esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5</div>
            <p className="text-xs text-muted-foreground">
              Baseado em 28 avaliações
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="requests">Solicitações</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Produtos de Dados do Domínio</CardTitle>
              <CardDescription>
                Gerencie e monitore a performance dos seus produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Qualidade</TableHead>
                    <TableHead>Consumid.</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Últ. Atualização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domainProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{product.quality}%</span>
                          {getQualityBadge(product.quality)}
                        </div>
                      </TableCell>
                      <TableCell>{product.consumers}</TableCell>
                      <TableCell>{product.downloads}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(product.rating)}
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.lastUpdate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Acesso</CardTitle>
              <CardDescription>
                Aprove ou rejeite solicitações de acesso aos seus produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Justificativa</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.product}</TableCell>
                      <TableCell>{request.user}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="max-w-xs truncate">{request.justification}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" className="bg-success hover:bg-success/90">
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm">
                            Rejeitar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback dos Consumidores</CardTitle>
              <CardDescription>
                Veja o que os usuários estão dizendo sobre seus produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consumerFeedback.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feedback.user}</span>
                        <Badge variant="outline">{feedback.product}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(feedback.rating)}
                        <span className="text-sm text-muted-foreground ml-2">{feedback.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendência de Consumo</CardTitle>
                <CardDescription>Downloads por semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/30">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Gráfico de tendência</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qualidade dos Dados</CardTitle>
                <CardDescription>Score de qualidade por produto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/30">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Gráfico de qualidade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}