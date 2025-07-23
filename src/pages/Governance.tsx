import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Layers, Shield, AlertTriangle, CheckCircle, Eye, Users, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Governance() {
  const { toast } = useToast();
  const [policies, setPolicies] = useState({
    autoApprove: false,
    requireJustification: true,
    notifyOwners: true,
    auditLogging: true
  });

  const complianceRules = [
    {
      id: "rule-001",
      name: "LGPD - Dados Pessoais",
      description: "Verificação automática de dados sensíveis",
      status: "active",
      violations: 0,
      lastCheck: "2024-01-22"
    },
    {
      id: "rule-002",
      name: "Política de Retenção",
      description: "Dados devem ser arquivados após 7 anos",
      status: "active",
      violations: 2,
      lastCheck: "2024-01-22"
    },
    {
      id: "rule-003",
      name: "Classificação de Dados",
      description: "Todos os produtos devem ter classificação",
      status: "warning",
      violations: 5,
      lastCheck: "2024-01-21"
    }
  ];

  const auditLogs = [
    {
      id: "log-001",
      action: "Data Access Granted",
      user: "Ana Silva",
      product: "Vendas por Região",
      timestamp: "2024-01-22 14:30",
      ip: "192.168.1.100",
      status: "success"
    },
    {
      id: "log-002",
      action: "Data Download",
      user: "Carlos Santos",
      product: "Performance de Vendedores",
      timestamp: "2024-01-22 13:45",
      ip: "192.168.1.101",
      status: "success"
    },
    {
      id: "log-003",
      action: "Access Request Denied",
      user: "Marina Costa",
      product: "Dados Financeiros Q4",
      timestamp: "2024-01-22 12:15",
      ip: "192.168.1.102",
      status: "denied"
    }
  ];

  const dataLineage = [
    {
      id: "lineage-001",
      source: "Sistema CRM",
      product: "Vendas por Região",
      transformations: ["Agregação por região", "Limpeza de dados", "Anonimização"],
      destination: "Data Lake",
      lastUpdate: "2024-01-22"
    },
    {
      id: "lineage-002",
      source: "Base de RH",
      product: "Performance de Vendedores",
      transformations: ["Cálculo de métricas", "Join com metas"],
      destination: "Analytics Warehouse",
      lastUpdate: "2024-01-21"
    }
  ];

  const handlePolicyChange = (key: string, value: boolean) => {
    setPolicies(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Política atualizada",
      description: "As configurações de governança foram atualizadas.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Atenção</Badge>;
      case "success":
        return <Badge className="bg-success/10 text-success border-success/20">Sucesso</Badge>;
      case "denied":
        return <Badge variant="destructive">Negado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Governança</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie políticas, compliance e auditoria da plataforma
          </p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Relatório de Compliance
        </Button>
      </div>

      {/* Métricas de Governança */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regras Ativas</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              2 em atenção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violações</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              -3 vs. semana anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auditoria</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              eventos hoje
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="policies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="policies">Políticas</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
          <TabsTrigger value="lineage">Linhagem</TabsTrigger>
        </TabsList>

        <TabsContent value="policies">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Políticas de Acesso</CardTitle>
                <CardDescription>
                  Configure as regras de acesso aos dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoApprove">Aprovação Automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Aprovar automaticamente solicitações de dados públicos
                    </p>
                  </div>
                  <Switch
                    id="autoApprove"
                    checked={policies.autoApprove}
                    onCheckedChange={(value) => handlePolicyChange('autoApprove', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireJustification">Justificativa Obrigatória</Label>
                    <p className="text-sm text-muted-foreground">
                      Exigir justificativa para todas as solicitações
                    </p>
                  </div>
                  <Switch
                    id="requireJustification"
                    checked={policies.requireJustification}
                    onCheckedChange={(value) => handlePolicyChange('requireJustification', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOwners">Notificar Proprietários</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações para donos dos dados
                    </p>
                  </div>
                  <Switch
                    id="notifyOwners"
                    checked={policies.notifyOwners}
                    onCheckedChange={(value) => handlePolicyChange('notifyOwners', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auditLogging">Log de Auditoria</Label>
                    <p className="text-sm text-muted-foreground">
                      Registrar todas as ações dos usuários
                    </p>
                  </div>
                  <Switch
                    id="auditLogging"
                    checked={policies.auditLogging}
                    onCheckedChange={(value) => handlePolicyChange('auditLogging', value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Classificação de Dados</CardTitle>
                <CardDescription>
                  Níveis de sensibilidade e políticas aplicadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Público</div>
                      <div className="text-sm text-muted-foreground">Acesso livre para usuários autenticados</div>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20">34 produtos</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Interno</div>
                      <div className="text-sm text-muted-foreground">Acesso restrito por domínio</div>
                    </div>
                    <Badge variant="secondary">18 produtos</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Restrito</div>
                      <div className="text-sm text-muted-foreground">Aprovação manual obrigatória</div>
                    </div>
                    <Badge className="bg-warning/10 text-warning border-warning/20">5 produtos</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Regras de Compliance</CardTitle>
              <CardDescription>
                Monitore o cumprimento das regras de governança
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Regra</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Violações</TableHead>
                    <TableHead>Última Verificação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                      <TableCell>{getStatusBadge(rule.status)}</TableCell>
                      <TableCell>
                        {rule.violations > 0 ? (
                          <span className="text-destructive font-medium">{rule.violations}</span>
                        ) : (
                          <span className="text-success">0</span>
                        )}
                      </TableCell>
                      <TableCell>{rule.lastCheck}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Verificar
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

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Auditoria</CardTitle>
              <CardDescription>
                Histórico detalhado de todas as ações na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ação</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.product}</TableCell>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lineage">
          <Card>
            <CardHeader>
              <CardTitle>Linhagem de Dados</CardTitle>
              <CardDescription>
                Rastreie a origem e transformações dos produtos de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Origem</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Transformações</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataLineage.map((lineage) => (
                    <TableRow key={lineage.id}>
                      <TableCell className="font-medium">{lineage.source}</TableCell>
                      <TableCell>{lineage.product}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {lineage.transformations.map((transform, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {transform}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{lineage.destination}</TableCell>
                      <TableCell>{lineage.lastUpdate}</TableCell>
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
      </Tabs>
    </div>
  );
}