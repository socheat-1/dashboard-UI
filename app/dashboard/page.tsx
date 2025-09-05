import Grab from "@/components/template_components/grab/grab";
import Layout from "../../components/layout";
import { SidebarProvider } from "../context/SidebarContext";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Layout>
        <Grab />
      </Layout>
    </SidebarProvider>
  );
}
