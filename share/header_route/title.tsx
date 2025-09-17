
export default function Title ({ title = ""}){
    return(
        <div>
             <h1 className="text-[20px] font-[500] rounded-[3px] text-indigo-600 dark:text-gray-200 mb-2 ">
                <span>{title}</span>
            </h1>
        </div>
    );
}