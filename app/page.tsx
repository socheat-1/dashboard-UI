import Grab from "@/components/template_components/dashboard/grab/grab";
import Layout from "../components/layout";
import { SidebarProvider } from "./context/SidebarContext";

export default function Dashboard() {
  return (
    <SidebarProvider>
    <Layout>
      <Grab />
    </Layout>
    </SidebarProvider>
  );
}
