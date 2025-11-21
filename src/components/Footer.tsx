import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="/assets/logos.png"
                alt="RenewRay Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              India's trusted solar EPC company, delivering sustainable energy
              solutions with expertise and commitment.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t("products")}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("residential")}
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("commercial")}
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Hybrid & Off-Grid
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("amc")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t("services")}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#subsidy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("subsidy")}
                </a>
              </li>
              <li>
                <a
                  href="#calculator"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("calculateSavings")}
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("process")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("emi")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t("contactUs")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  RenewRay Pvt. Ltd. 2-H-1,vigyan nagar, kota,
                  <br />
                  Rajasthan - 324005, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="tel:+919691192525"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 9691192525
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="mailto:info@renewray.in"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@renewray.in
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                MNRE Approved
              </span>
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                BIS Certified
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {t("companyName")}. {t("allRightsReserved")}.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
