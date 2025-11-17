import { ClipboardCheck, Ruler, FileCheck, Wrench, CheckCircle, Monitor } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Process() {
  const { t } = useLanguage();

  const steps = [
    { icon: ClipboardCheck, title: t('siteSurvey'), description: t('siteSurveyDesc'), step: '1' },
    { icon: Ruler, title: t('systemDesign'), description: t('systemDesignDesc'), step: '2' },
    { icon: FileCheck, title: t('approvals'), description: t('approvalsDesc'), step: '3' },
    { icon: Wrench, title: t('installation'), description: t('installationDesc'), step: '4' },
    { icon: CheckCircle, title: t('commissioning'), description: t('commissioningDesc'), step: '5' },
    { icon: Monitor, title: t('monitoring'), description: t('monitoringDesc'), step: '6' },
  ];

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('installationProcess')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Simple, transparent process from consultation to commissioning</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-600 to-blue-200"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border-2 border-gray-100 hover:border-blue-200">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="#contact" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium text-lg shadow-lg hover:shadow-xl">
            {t('scheduleVisit')}
          </a>
        </div>
      </div>
    </section>
  );
}
