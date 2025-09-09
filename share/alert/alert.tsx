import { Toaster } from "react-hot-toast";

export default function Alert (){
    return(
       <div>
        <Toaster
            position="bottom-left"
            reverseOrder={false}
          />
       </div>
    );
}