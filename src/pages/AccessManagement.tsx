import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Key, Clock, X, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AccessManagement() {
  const { toast } = useToast();

  const activeAccess = [
    {
      id: "acc-001",
      dataProduct: "Vendas por Região",
      domain: "Vendas",
      accessType: "API",
      grantedAt: "2024-01-15",
      expiresAt: "2024-07-15",
      status: "active",
      downloads: 42
    },
    {
      id: "acc-002", 
      dataProduct: "Perfil de Clientes",
      domain: "Marketing",
      accessType: "Download",
      grantedAt: "2024-01-10",
      expiresAt: "2024-04-10",
      status: "expiring",
      downloads: 8
    },
    {
      id: "acc-003",
      dataProduct: "Métricas de Performance",
      domain: "RH",
      accessType: "API",
      grantedAt: "2024-01-20",
      expiresAt: "2024-06-20",
      status: "active",
      downloads: 156
    }
  ];

  const pendingRequests = [
    {
      id: "req-001",
      dataProduct: "Dados Financeiros Q4",
      domain: "Financeiro",
      requestedAt: "2024-01-22",
      status: "pending",
      justification: "Análise de performance trimestral"
    },
    {
      id: "req-002",
      dataProduct: "Logs de Auditoria",
      domain: "Segurança",
      requestedAt: "2024-01-21",
      status: "under_review",
      justification: "Investigação de incidente de segurança"
    }
  ];

  const apiKeys = [
    {
      id: "key-001",
      name: "Produção - Vendas",
      key: "dp_live_sk_1234...8901",
      createdAt: "2024-01-15",
      lastUsed: "2024-01-22",
      status: "active"
    },
    {
      id: "key-002",
      name: "Desenvolvimento - Marketing",
      key: "dp_test_sk_5678...2345",
      createdAt: "2024-01-10",
      lastUsed: "2024-01-20",
      status: "active"
    }
  ];

  const handleRevokeAccess = (accessId: string) => {
    toast({
      title: "Acesso revogado",
      description: "O acesso ao produto de dados foi removido.",
      variant: "destructive",
    });
  };

  const handleGenerateKey = () => {
    toast({
      title: "Nova chave API gerada",
      description: "Uma nova chave de acesso foi criada com sucesso.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>;
      case "expiring":
        return <Badge variant="outline" className="border-warning text-warning">Expirando</Badge>;
      case "pending":
        return <Badge variant="outline">Pendente</Badge>;
      case "under_review":
        return <Badge variant="secondary">Em Análise</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Acessos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus acessos ativos e solicite novos produtos de dados
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Histórico de Uso
          </Button>
          <Button onClick={handleGenerateKey}>
            <Key className="w-4 h-4 mr-2" />
            Nova Chave API
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Acessos Ativos</TabsTrigger>
          <TabsTrigger value="pending">Solicitações</TabsTrigger>
          <TabsTrigger value="keys">Chaves API</TabsTrigger>
          <TabsTrigger value="usage">Uso & Métricas</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Acessos Ativos</CardTitle>
              <CardDescription>
                Produtos de dados que você tem permissão para acessar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto de Dados</TableHead>
                    <TableHead>Domínio</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Concedido em</TableHead>
                    <TableHead>Expira em</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeAccess.map((access) => (
                    <TableRow key={access.id}>
                      <TableCell className="font-medium">{access.dataProduct}</TableCell>
                      <TableCell>{access.domain}</TableCell>
                      <TableCell>{access.accessType}</TableCell>
                      <TableCell>{access.grantedAt}</TableCell>
                      <TableCell>{access.expiresAt}</TableCell>
                      <TableCell>{getStatusBadge(access.status)}</TableCell>
                      <TableCell>{access.downloads}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRevokeAccess(access.id)}
                          >
                            <X className="w-4 h-4" />
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

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações Pendentes</CardTitle>
              <CardDescription>
                Acompanhe o status das suas solicitações de acesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto de Dados</TableHead>
                    <TableHead>Domínio</TableHead>
                    <TableHead>Solicitado em</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Justificativa</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.dataProduct}</TableCell>
                      <TableCell>{request.domain}</TableCell>
                      <TableCell>{request.requestedAt}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="max-w-xs truncate">{request.justification}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys">
          <Card>
            <CardHeader>
              <CardTitle>Chaves API</CardTitle>
              <CardDescription>
                Gerencie suas chaves de acesso para consumir dados via API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Chave</TableHead>
                    <TableHead>Criada em</TableHead>
                    <TableHead>Último Uso</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell className="font-mono text-sm">{key.key}</TableCell>
                      <TableCell>{key.createdAt}</TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell>{getStatusBadge(key.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            Copiar
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="w-4 h-4" />
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

        <TabsContent value="usage">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Acessos</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  +1 desde o mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Downloads Totais</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">206</div>
                <p className="text-xs text-muted-foreground">
                  +34 esta semana
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio de Aprovação</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1 dias</div>
                <p className="text-xs text-muted-foreground">
                  -0.5 dias vs. média anterior
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}