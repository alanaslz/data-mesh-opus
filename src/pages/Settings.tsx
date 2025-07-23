import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Save, Download, Upload, Mail, Bell, Shield, Database, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    organizationName: "Empresa ABC",
    organizationDescription: "Plataforma de Data Mesh corporativa",
    primaryColor: "#3b82f6",
    logoUrl: "",
    emailNotifications: true,
    slackIntegration: false,
    autoApproval: false,
    retentionPeriod: "365",
    backupEnabled: true,
    maintenanceMode: false
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações foram atualizadas com sucesso.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "O backup das configurações está sendo gerado.",
    });
  };

  const integrations = [
    {
      name: "Slack",
      description: "Notificações via Slack",
      status: "connected",
      lastSync: "2024-01-22 14:30"
    },
    {
      name: "Microsoft Teams",
      description: "Integração com Teams",
      status: "disconnected",
      lastSync: "Nunca"
    },
    {
      name: "LDAP/Active Directory",
      description: "Autenticação corporativa",
      status: "connected",
      lastSync: "2024-01-22 15:45"
    },
    {
      name: "Tableau",
      description: "Visualização de dados",
      status: "disconnected",
      lastSync: "Nunca"
    }
  ];

  const securityPolicies = [
    {
      name: "Autenticação de 2 Fatores",
      description: "Obrigatório para todos os usuários",
      enabled: true
    },
    {
      name: "Sessão Automática",
      description: "Logout após 8 horas de inatividade",
      enabled: true
    },
    {
      name: "Audit Log",
      description: "Registrar todas as ações críticas",
      enabled: true
    },
    {
      name: "IP Whitelist",
      description: "Restringir acesso por IP",
      enabled: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-success/10 text-success border-success/20">Conectado</Badge>;
      case "disconnected":
        return <Badge variant="secondary">Desconectado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie as configurações globais da plataforma
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exportar Config
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Organização</CardTitle>
                <CardDescription>
                  Configure as informações básicas da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Nome da Organização</Label>
                  <Input
                    id="orgName"
                    value={settings.organizationName}
                    onChange={(e) => setSettings({...settings, organizationName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgDescription">Descrição</Label>
                  <Textarea
                    id="orgDescription"
                    value={settings.organizationDescription}
                    onChange={(e) => setSettings({...settings, organizationDescription: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl">URL do Logo</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://exemplo.com/logo.png"
                    value={settings.logoUrl}
                    onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Dados</CardTitle>
                <CardDescription>
                  Políticas globais de gerenciamento de dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Aprovação Automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Aprovar automaticamente dados públicos
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoApproval}
                    onCheckedChange={(value) => setSettings({...settings, autoApproval: value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retention">Período de Retenção (dias)</Label>
                  <Select value={settings.retentionPeriod} onValueChange={(value) => setSettings({...settings, retentionPeriod: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="365">1 ano</SelectItem>
                      <SelectItem value="1095">3 anos</SelectItem>
                      <SelectItem value="2555">7 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Backup diário dos metadados
                    </p>
                  </div>
                  <Switch
                    checked={settings.backupEnabled}
                    onCheckedChange={(value) => setSettings({...settings, backupEnabled: value})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Personalização Visual</CardTitle>
              <CardDescription>
                Configure a aparência da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex gap-3">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                        className="w-20 h-10"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                        placeholder="#3b82f6"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select defaultValue="light">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Pré-visualização</Label>
                    <div className="mt-2 p-4 border rounded-lg" style={{borderColor: settings.primaryColor}}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: settings.primaryColor}}>
                          <Database className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">DataMesh</div>
                          <div className="text-xs text-muted-foreground">v2.1.0</div>
                        </div>
                      </div>
                      <Button size="sm" style={{backgroundColor: settings.primaryColor}}>
                        Exemplo de Botão
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>
                Configure como e quando enviar notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações importantes por email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(value) => setSettings({...settings, emailNotifications: value})}
                  />
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium mb-3 block">Tipos de Notificação</Label>
                  <div className="space-y-3">
                    {[
                      { name: "Novas solicitações de acesso", enabled: true },
                      { name: "Produtos publicados", enabled: true },
                      { name: "Alertas de qualidade", enabled: false },
                      { name: "Updates de sistema", enabled: true },
                      { name: "Relatórios semanais", enabled: false }
                    ].map((notif, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm">{notif.name}</span>
                        <Switch defaultChecked={notif.enabled} />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="emailTemplate">Template de Email</Label>
                  <Textarea
                    id="emailTemplate"
                    placeholder="Personalize o template dos emails..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrações Externas</CardTitle>
              <CardDescription>
                Conecte a plataforma com outras ferramentas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <SettingsIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">{integration.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Última sincronização: {integration.lastSync}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(integration.status)}
                      <Button variant="outline" size="sm">
                        {integration.status === "connected" ? "Configurar" : "Conectar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Políticas de Segurança</CardTitle>
                <CardDescription>
                  Configure as políticas de segurança da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityPolicies.map((policy, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{policy.name}</div>
                        <div className="text-sm text-muted-foreground">{policy.description}</div>
                      </div>
                      <Switch defaultChecked={policy.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modo de Manutenção</CardTitle>
                <CardDescription>
                  Ative temporariamente para realizar manutenções
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">
                      Bloqueia o acesso para usuários não administradores
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(value) => setSettings({...settings, maintenanceMode: value})}
                  />
                </div>
                {settings.maintenanceMode && (
                  <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center gap-2 text-warning">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Modo de manutenção ativo</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Apenas administradores podem acessar a plataforma
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}