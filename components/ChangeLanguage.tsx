import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";

const ChangeLanguage = () => {
  const [currentLocale, setLocale] = useState("");
  console.log("🚀 ~ ChangeLanguage ~ currentLocale:", currentLocale);
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = Cookies.get("NEXT_LOCALE")!;
    setLocale(cookieLocale);
  }, []);

  const changeLang = (newLocale: string) => {
    Cookies.set("NEXT_LOCALE", newLocale, { path: "/" });
    setLocale(newLocale);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1 cursor-pointer text-black dark:text-white">
      <button
        onClick={() => changeLang(currentLocale === "en" ? "ar" : "en")}
        className="cursor-pointer"
      >
        <FaGlobe size={21} />
      </button>
      {currentLocale === "en" ? "ar" : "en"}
    </div>
  );
};

export default ChangeLanguage;
