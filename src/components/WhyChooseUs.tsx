import { Award, Users, Zap, Smartphone, FileCheck, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const reasons = [
    { icon: Award, title: t('govtApproved'), description: t('govtApprovedDesc') },
    { icon: Users, title: t('certifiedEngineers'), description: t('certifiedEngineersDesc') },
    { icon: Zap, title: t('fastInstallation'), description: t('fastInstallationDesc') },
    { icon: Smartphone, title: t('onlineMonitoring'), description: t('onlineMonitoringDesc') },
    { icon: FileCheck, title: t('transparentPricing'), description: t('transparentPricingDesc') },
    { icon: MapPin, title: t('panIndiaService'), description: t('panIndiaServiceDesc') },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyRenewRay')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Your trusted solar energy partner with proven expertise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <reason.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to Go Solar?</h3>
              <p className="text-blue-100 text-lg mb-6">Join hundreds of satisfied customers who are saving money and helping the environment.</p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium inline-flex items-center">{t('scheduleVisit')}</a>
                <a href="#subsidy" className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium inline-flex items-center">{t('applySubsidy')}</a>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Solar installation" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
