import LoginPage from "@/components/template_components/from_login/login";
import { SidebarProvider } from "../context/SidebarContext";


export default function Login (){
    return(
         <>
         <SidebarProvider>
            <LoginPage/>
         </SidebarProvider>
         </>
    );
}