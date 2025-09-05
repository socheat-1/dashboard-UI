import Layout from "../components/layout";
import { SidebarProvider } from "./context/SidebarContext";

export default function Dashboard() {
  return (
    <SidebarProvider>
    <Layout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">Card 1</div>
        <div className="p-6 bg-white rounded-lg shadow">Card 2</div>
        <div className="p-6 bg-white rounded-lg shadow">Card 3</div>
      </div>
    </Layout>
    </SidebarProvider>
  );
}
