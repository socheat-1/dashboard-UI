
import { useTranslation } from "react-i18next";

export default function Title ({ title = ""}){
    const { t } = useTranslation("translation");
    return(
        <div>
             <h1 className="text-[20px] font-[500] rounded-[3px] text-indigo-600 dark:text-gray-200 mb-2 ">
                <span>{t(title)}</span>
            </h1>
        </div>
    );
}