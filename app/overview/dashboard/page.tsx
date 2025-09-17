import { SidebarProvider } from "@/app/context/SidebarContext";
import Layout from "@/components/layout";
import Grab from "@/components/template_components/dashboard/grab/grab";

export default function Dashboard() {
    return (
        <SidebarProvider>
            <Layout>
                <Grab />
            </Layout>
        </SidebarProvider>
    );
}