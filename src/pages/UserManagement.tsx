import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, Shield, Search, MoreHorizontal, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: "user-001",
      name: "Ana Silva",
      email: "ana.silva@empresa.com",
      role: "Data Consumer",
      domain: "Marketing",
      status: "active",
      lastLogin: "2024-01-22",
      accessCount: 12,
      avatar: "/avatars/ana.jpg"
    },
    {
      id: "user-002",
      name: "Carlos Santos",
      email: "carlos.santos@empresa.com",
      role: "Domain Owner",
      domain: "Vendas",
      status: "active",
      lastLogin: "2024-01-22",
      accessCount: 28,
      avatar: "/avatars/carlos.jpg"
    },
    {
      id: "user-003",
      name: "Marina Costa",
      email: "marina.costa@empresa.com",
      role: "Data Steward",
      domain: "BI",
      status: "active",
      lastLogin: "2024-01-21",
      accessCount: 45,
      avatar: "/avatars/marina.jpg"
    },
    {
      id: "user-004",
      name: "Roberto Lima",
      email: "roberto.lima@empresa.com",
      role: "Data Consumer",
      domain: "Estratégia",
      status: "inactive",
      lastLogin: "2024-01-15",
      accessCount: 3,
      avatar: "/avatars/roberto.jpg"
    },
    {
      id: "user-005",
      name: "Julia Fernandes",
      email: "julia.fernandes@empresa.com",
      role: "Admin",
      domain: "TI",
      status: "active",
      lastLogin: "2024-01-22",
      accessCount: 67,
      avatar: "/avatars/julia.jpg"
    }
  ];

  const teams = [
    {
      id: "team-001",
      name: "Equipe de Marketing",
      domain: "Marketing",
      members: 8,
      lead: "Ana Silva",
      products: 4,
      created: "2024-01-10"
    },
    {
      id: "team-002",
      name: "Vendas Regionais",
      domain: "Vendas",
      members: 12,
      lead: "Carlos Santos",
      products: 6,
      created: "2024-01-05"
    },
    {
      id: "team-003",
      name: "Business Intelligence",
      domain: "BI",
      members: 5,
      lead: "Marina Costa",
      products: 8,
      created: "2023-12-20"
    }
  ];

  const roles = [
    {
      name: "Admin",
      description: "Acesso total à plataforma",
      permissions: ["Gerenciar usuários", "Configurar políticas", "Visualizar auditoria"],
      count: 2
    },
    {
      name: "Domain Owner",
      description: "Proprietário de domínio de dados",
      permissions: ["Publicar dados", "Aprovar acessos", "Gerenciar equipe"],
      count: 8
    },
    {
      name: "Data Steward",
      description: "Curador de dados",
      permissions: ["Validar qualidade", "Definir metadados", "Monitorar compliance"],
      count: 6
    },
    {
      name: "Data Consumer",
      description: "Consumidor de dados",
      permissions: ["Solicitar acesso", "Baixar dados", "Visualizar catálogo"],
      count: 34
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>;
      case "pending":
        return <Badge variant="outline">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge variant="destructive">Admin</Badge>;
      case "Domain Owner":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Domain Owner</Badge>;
      case "Data Steward":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Data Steward</Badge>;
      case "Data Consumer":
        return <Badge variant="secondary">Data Consumer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const handleInviteUser = () => {
    toast({
      title: "Convite enviado",
      description: "O convite foi enviado para o email especificado.",
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usuários</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie usuários, equipes e permissões da plataforma
          </p>
        </div>
        <Button onClick={handleInviteUser}>
          <UserPlus className="w-4 h-4 mr-2" />
          Convidar Usuário
        </Button>
      </div>

      {/* Métricas de Usuários */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">
              +5 este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              94% de ativação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 domínios ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acessos Hoje</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +12% vs. ontem
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="teams">Equipes</TabsTrigger>
          <TabsTrigger value="roles">Papéis</TabsTrigger>
          <TabsTrigger value="invites">Convites</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Usuários</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os usuários da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar usuários..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Papel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="owner">Domain Owner</SelectItem>
                    <SelectItem value="steward">Data Steward</SelectItem>
                    <SelectItem value="consumer">Data Consumer</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Papel</TableHead>
                    <TableHead>Domínio</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Login</TableHead>
                    <TableHead>Acessos</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.domain}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>{user.accessCount}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle>Equipes</CardTitle>
              <CardDescription>
                Organize usuários em equipes por domínio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <Card key={team.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <CardDescription>{team.domain}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Membros:</span>
                          <span className="font-medium">{team.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Líder:</span>
                          <span className="font-medium">{team.lead}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Produtos:</span>
                          <span className="font-medium">{team.products}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Criada em:</span>
                          <span className="text-muted-foreground">{team.created}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Gerenciar Equipe
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Papéis e Permissões</CardTitle>
              <CardDescription>
                Configure os papéis disponíveis na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <Badge variant="outline">{role.count} usuários</Badge>
                      </div>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Permissões:</div>
                        <ul className="space-y-1">
                          {role.permissions.map((permission, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              {permission}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Editar Permissões
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites">
          <Card>
            <CardHeader>
              <CardTitle>Convites Pendentes</CardTitle>
              <CardDescription>
                Gerencie convites enviados para novos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">patricia.oliveira@empresa.com</div>
                      <div className="text-sm text-muted-foreground">Data Consumer • Marketing</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Enviado há 2 dias
                    </div>
                    <Button variant="outline" size="sm">
                      Reenviar
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">marcos.rodrigues@empresa.com</div>
                      <div className="text-sm text-muted-foreground">Domain Owner • Operações</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Enviado há 5 dias
                    </div>
                    <Button variant="outline" size="sm">
                      Reenviar
                    </Button>
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