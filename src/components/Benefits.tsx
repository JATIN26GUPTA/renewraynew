import { Zap, BadgeIndianRupee, Shield, Network, CreditCard, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Benefits() {
  const { t } = useLanguage();

  const benefits = [
    { icon: Zap, title: t('lowerBills'), description: t('lowerBillsDesc'), color: 'bg-yellow-100 text-yellow-600' },
    { icon: BadgeIndianRupee, title: t('govtSubsidy'), description: t('govtSubsidyDesc'), color: 'bg-green-100 text-green-600' },
    { icon: Shield, title: t('warranty'), description: t('warrantyDesc'), color: 'bg-blue-100 text-blue-600' },
    { icon: Network, title: t('netMetering'), description: t('netMeteringDesc'), color: 'bg-blue-100 text-blue-600' },
    { icon: CreditCard, title: t('emiOptions'), description: t('emiOptionsDesc'), color: 'bg-green-100 text-green-600' },
    { icon: Leaf, title: t('ecoFriendly'), description: t('ecoFriendlyDesc'), color: 'bg-green-100 text-green-600' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('solarBenefits')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Make the switch to solar energy and enjoy multiple advantages</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className={`${benefit.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
