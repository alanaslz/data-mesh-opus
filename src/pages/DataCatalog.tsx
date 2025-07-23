import { useState } from "react";
import { Search, Filter, ArrowUpDown, Database, Users, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-data-mesh.jpg";

interface DataProduct {
  id: string;
  name: string;
  description: string;
  domain: string;
  owner: string;
  lastUpdated: string;
  qualityScore: number;
  consumers: number;
  tags: string[];
  status: 'active' | 'deprecated' | 'development';
  accessLevel: 'public' | 'internal' | 'restricted';
}

const mockDataProducts: DataProduct[] = [
  {
    id: "1",
    name: "Customer Analytics Dataset",
    description: "Dados agregados de comportamento e métricas de clientes para análises de marketing e vendas.",
    domain: "Marketing",
    owner: "Ana Costa",
    lastUpdated: "2024-01-20",
    qualityScore: 95,
    consumers: 12,
    tags: ["analytics", "customer", "marketing"],
    status: "active",
    accessLevel: "internal"
  },
  {
    id: "2", 
    name: "Financial Reports API",
    description: "Relatórios financeiros consolidados com dados de receita, despesas e métricas de performance.",
    domain: "Finance",
    owner: "Carlos Silva",
    lastUpdated: "2024-01-19",
    qualityScore: 88,
    consumers: 8,
    tags: ["finance", "reports", "api"],
    status: "active",
    accessLevel: "restricted"
  },
  {
    id: "3",
    name: "Product Inventory Stream",
    description: "Stream em tempo real do estoque de produtos com atualizações automáticas de disponibilidade.",
    domain: "Operations",
    owner: "Maria Santos",
    lastUpdated: "2024-01-21",
    qualityScore: 92,
    consumers: 15,
    tags: ["inventory", "realtime", "products"],
    status: "active",
    accessLevel: "public"
  },
  {
    id: "4",
    name: "HR Employee Data",
    description: "Informações de funcionários, incluindo dados demográficos e métricas de performance (anonimizados).",
    domain: "Human Resources",
    owner: "João Oliveira",
    lastUpdated: "2024-01-18",
    qualityScore: 76,
    consumers: 5,
    tags: ["hr", "employees", "demographics"],
    status: "development",
    accessLevel: "restricted"
  }
];

const getQualityColor = (score: number) => {
  if (score >= 90) return "quality-excellent";
  if (score >= 80) return "quality-good";
  if (score >= 70) return "quality-fair";
  return "quality-poor";
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "active": return "default";
    case "development": return "secondary";
    case "deprecated": return "destructive";
    default: return "outline";
  }
};

const getAccessLevelColor = (level: string) => {
  switch (level) {
    case "public": return "success";
    case "internal": return "warning";
    case "restricted": return "destructive";
    default: return "secondary";
  }
};

export default function DataCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("updated");

  const domains = [...new Set(mockDataProducts.map(p => p.domain))];

  const filteredProducts = mockDataProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(product => selectedDomain === "all" || product.domain === selectedDomain)
    .sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "quality": return b.qualityScore - a.qualityScore;
        case "consumers": return b.consumers - a.consumers;
        case "updated":
        default: return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });

  return (
    <div className="space-y-6 p-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-data shadow-elevated">
        <div className="absolute inset-0 bg-black/20" />
        <img 
          src={heroImage} 
          alt="Data Mesh Platform" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Catálogo de Dados</h1>
            <p className="text-lg opacity-90">Descubra e consuma dados como produtos da sua organização</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-lg shadow-data-card">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar datasets, APIs ou descrições..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedDomain} onValueChange={setSelectedDomain}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Domínio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Domínios</SelectItem>
            {domains.map(domain => (
              <SelectItem key={domain} value={domain}>{domain}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Última Atualização</SelectItem>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="quality">Qualidade</SelectItem>
            <SelectItem value="consumers">Mais Consumido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold">{mockDataProducts.length}</CardTitle>
            <CardDescription className="text-primary-foreground/80">Produtos de Dados</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-success">{domains.length}</CardTitle>
            <CardDescription>Domínios Ativos</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-warning">
              {mockDataProducts.reduce((sum, p) => sum + p.consumers, 0)}
            </CardTitle>
            <CardDescription>Consumidores Ativos</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-accent">
              {Math.round(mockDataProducts.reduce((sum, p) => sum + p.qualityScore, 0) / mockDataProducts.length)}%
            </CardTitle>
            <CardDescription>Qualidade Média</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Data Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-elevated transition-shadow cursor-pointer group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-sm">{product.domain}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-3 h-3 rounded-full bg-${getQualityColor(product.qualityScore)}`} />
                  <span className="text-xs font-medium">{product.qualityScore}%</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{product.consumers} consumidores</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(product.lastUpdated).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusBadgeVariant(product.status)}>
                    {product.status}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`border-${getAccessLevelColor(product.accessLevel)} text-${getAccessLevelColor(product.accessLevel)}`}
                  >
                    {product.accessLevel}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">por {product.owner}</p>
              </div>
              
              <Button className="w-full" variant="outline">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">Nenhum produto encontrado</h3>
          <p className="text-sm text-muted-foreground">
            Tente ajustar os filtros ou termos de busca
          </p>
        </div>
      )}
    </div>
  );
}