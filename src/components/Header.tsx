import { useState } from "react";
import { Menu, X, Sun, Languages } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    // If it's an anchor link on home page
    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        // Scroll to anchor
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate to home first, then scroll
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // Regular page navigation
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-2 rounded-lg">
              <Sun className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {t("companyName")}
              </h1>
              <p className="text-xs text-gray-600">{t("tagline")}</p>
            </div>
          </div> */}

          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick("#home")}
          >
            <img
              src="/assets/logos.png"
              alt="RenewRay Logo"
              className="h-14 w-auto object-contain"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick("#home")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer bg-none border-none"
            >
              {t("home")}
            </button>
            <button
              onClick={() => handleNavClick("#about")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer bg-none border-none"
            >
              {t("about")}
            </button>
            <button
              onClick={() => handleNavClick("#products")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer bg-none border-none"
            >
              {t("products")}
            </button>
            <button
              onClick={() => handleNavClick("/projects")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer bg-none border-none"
            >
              Our Projects
            </button>
            <button
              onClick={() => handleNavClick("#process")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer bg-none border-none"
            >
              {t("process")}
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer bg-none border-none"
            >
              {t("contact")}
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Languages className="h-5 w-5" />
              <span className="text-sm font-medium">
                {language === "en" ? "हिंदी" : "English"}
              </span>
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg cursor-pointer border-none"
            >
              {t("bookConsultation")}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-gray-700 hover:text-blue-600"
            >
              <Languages className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <button
              onClick={() => {
                handleNavClick("#home");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg px-4 transition-colors cursor-pointer bg-none border-none"
            >
              {t("home")}
            </button>
            <button
              onClick={() => {
                handleNavClick("#about");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg px-4 transition-colors cursor-pointer bg-none border-none"
            >
              {t("about")}
            </button>
            <button
              onClick={() => {
                handleNavClick("#products");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg px-4 transition-colors cursor-pointer bg-none border-none"
            >
              {t("products")}
            </button>
            <button
              onClick={() => {
                handleNavClick("/projects");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg px-4 transition-colors cursor-pointer bg-none border-none"
            >
              Our Projects
            </button>
            <button
              onClick={() => {
                handleNavClick("#process");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg px-4 transition-colors cursor-pointer bg-none border-none"
            >
              {t("process")}
            </button>
            <button
              onClick={() => {
                handleNavClick("#contact");
                setIsMenuOpen(false);
              }}
              className="block mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all cursor-pointer border-none"
            >
              {t("bookConsultation")}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
