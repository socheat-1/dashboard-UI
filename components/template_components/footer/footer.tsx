export default function Footer (){
    return(
        <div>
             <footer
                className="bg-white dark:bg-gray-800 p-4 text-start text-sm text-gray-600 dark:text-gray-300">
                &copy; {new Date().getFullYear()} My Dashboard. All rights reserved.
            </footer>
        </div>
    );
}