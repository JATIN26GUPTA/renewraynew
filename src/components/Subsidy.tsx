import { BadgeCheck, FileText, HeadphonesIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Subsidy() {
  const { t } = useLanguage();

  const subsidyInfo = [
    { icon: BadgeCheck, title: t('subsidyEligibility'), description: t('subsidyEligibilityDesc'), color: 'from-green-600 to-green-700' },
    { icon: FileText, title: t('requiredDocuments'), description: t('requiredDocumentsDesc'), color: 'from-blue-600 to-blue-700' },
    { icon: HeadphonesIcon, title: t('applicationSupport'), description: t('applicationSupportDesc'), color: 'from-yellow-600 to-yellow-700' },
  ];

  return (
    <section id="subsidy" className="py-20 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('govtSubsidySection')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Take advantage of government incentives to make solar more affordable</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subsidyInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`bg-gradient-to-r ${info.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                <info.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
              <p className="text-gray-600 leading-relaxed">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Subsidy Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">40%</div>
                <div className="text-green-100">For systems up to 3 kW</div>
                <div className="text-2xl font-bold mt-3">₹18,000/kW</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">20%</div>
                <div className="text-green-100">For additional capacity 3-10 kW</div>
                <div className="text-2xl font-bold mt-3">₹9,000/kW</div>
              </div>
            </div>
            <p className="mt-8 text-green-100 text-lg">Maximum subsidy for residential installations is ₹78,000 (for 10 kW system)</p>
            <a href="#contact" className="inline-block mt-8 bg-white text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition-colors font-medium text-lg shadow-lg">{t('applySubsidy')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
