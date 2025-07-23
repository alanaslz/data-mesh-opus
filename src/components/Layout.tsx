import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-card border-b border-border flex items-center px-6 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-xl font-semibold text-foreground">DataMesh Platform</h1>
                <p className="text-sm text-muted-foreground">Plataforma de Autoatendimento para Dados</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">João Silva</p>
                  <p className="text-xs text-muted-foreground">Domain Owner • Engineering</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">JS</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}