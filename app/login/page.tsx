
import { LoginForm } from "@/components/template_components/from_login/login";
import { SidebarProvider } from "../context/SidebarContext";

export default function Login (){
    return(
         <>
         <SidebarProvider>
            <LoginForm/>
         </SidebarProvider>
         </>
    );
}