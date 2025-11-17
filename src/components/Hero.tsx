import { ArrowRight, Calculator, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeIn">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>MNRE Approved • BIS Certified</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fadeIn">
              {t('heroHeadline')}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {t('heroSubheadline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <a href="#contact" className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 font-medium">
                <Phone className="h-5 w-5" />
                <span>{t('bookConsultation')}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a href="#calculator" className="group bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 font-medium">
                <Calculator className="h-5 w-5" />
                <span>{t('calculateSavings')}</span>
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">5MW+</div>
                <div className="text-sm text-gray-600">Installed Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">25+</div>
                <div className="text-sm text-gray-600">Years Warranty</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Solar panels on rooftop" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs animate-slideUp">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Zero Down Payment</div>
                  <div className="text-sm text-gray-600">Easy EMI options available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
