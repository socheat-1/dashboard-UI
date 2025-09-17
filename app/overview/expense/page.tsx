import { SidebarProvider } from "@/app/context/SidebarContext";
import Layout from "@/components/layout";
import Expense from "@/components/template_components/dashboard/report/Expense";

export default function expensePage() {
    return (
        <SidebarProvider>
            <Layout>
                <Expense />
            </Layout>
        </SidebarProvider>
    );
}