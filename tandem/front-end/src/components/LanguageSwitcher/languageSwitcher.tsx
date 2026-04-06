import { useTranslation } from "react-i18next";

type Language = "en" | "ru";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language.split("-")[0] as Language;

  const nextLang = currentLang === "en" ? "ru" : "en";

  const changeLanguage = () => {
    i18n.changeLanguage(nextLang);
    localStorage.setItem("lang", nextLang);
  };

  return (
    <button
      onClick={changeLanguage}
      className="text-white text-sm font-medium opacity-80 hover:opacity-100 transition hover:cursor-pointer"
      aria-label="Change language"
    >
      {currentLang.toUpperCase()}
    </button>
  );
}

export default LanguageSwitcher;