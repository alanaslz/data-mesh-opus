import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DataCatalog from "./pages/DataCatalog";
import PublishData from "./pages/PublishData";
import AccessManagement from "./pages/AccessManagement";
import DomainDashboard from "./pages/DomainDashboard";
import Governance from "./pages/Governance";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import DataProductDetail from "./pages/DataProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DataCatalog />} />
            <Route path="/publish" element={<PublishData />} />
            <Route path="/access" element={<AccessManagement />} />
            <Route path="/domain" element={<DomainDashboard />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/product/:id" element={<DataProductDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
