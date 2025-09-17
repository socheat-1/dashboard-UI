import { SidebarProvider } from "@/app/context/SidebarContext";
import Layout from "@/components/layout";
import Income from "@/components/template_components/dashboard/report/Income";

export default function IncomePage() {
    return (
        <SidebarProvider>
            <Layout>
                <Income />
            </Layout>
        </SidebarProvider>
    );
}