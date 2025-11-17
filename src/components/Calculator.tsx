import { useState } from 'react';
import { Calculator as CalcIcon, TrendingDown, Clock, IndianRupee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Calculator() {
  const { t } = useLanguage();
  const [monthlyBill, setMonthlyBill] = useState('');
  const [results, setResults] = useState<{ solarSize: number; estimatedCost: number; annualSavings: number; paybackPeriod: number } | null>(null);

  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill);
    if (isNaN(bill) || bill <= 0) return;

    const unitsPerMonth = bill / 7;
    const solarSize = Math.ceil((unitsPerMonth * 12) / 1200);
    const costPerKW = 60000;
    const estimatedCost = solarSize * costPerKW;
    const subsidy = solarSize <= 3 ? estimatedCost * 0.4 : solarSize <= 10 ? 54000 + (solarSize - 3) * 18000 : 0;
    const netCost = estimatedCost - subsidy;
    const annualSavings = bill * 12 * 0.9;
    const paybackPeriod = netCost / annualSavings;

    setResults({ solarSize, estimatedCost: netCost, annualSavings, paybackPeriod });
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('savingsCalculator')}</h2>
          <p className="text-xl text-blue-100">{t('savingsCalculatorDesc')}</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-900 font-medium mb-3 text-lg">{t('monthlyBill')}</label>
              <div className="relative">
                <input type="number" value={monthlyBill} onChange={(e) => setMonthlyBill(e.target.value)} placeholder="5000" className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-gray-900 text-lg" />
                <IndianRupee className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>

              <button onClick={calculateSavings} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium text-lg shadow-lg hover:shadow-xl flex items-center justify-center">
                <CalcIcon className="mr-3 h-6 w-6" />
                {t('calculate')}
              </button>
            </div>

            {results && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-green-600 p-2 rounded-lg mr-3">
                      <CalcIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-600 font-medium">{t('recommendedSize')}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{results.solarSize} kW</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-600 p-2 rounded-lg mr-3">
                      <IndianRupee className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-600 font-medium">{t('estimatedCost')}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">₹{results.estimatedCost.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-gray-600 mt-1">(After subsidy)</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-yellow-600 p-2 rounded-lg mr-3">
                      <TrendingDown className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-600 font-medium">{t('annualSavings')}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">₹{results.annualSavings.toLocaleString('en-IN')}</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-600 p-2 rounded-lg mr-3">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-600 font-medium">{t('paybackPeriod')}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{results.paybackPeriod.toFixed(1)} {t('years')}</div>
                </div>
              </div>
            )}

            {!results && (
              <div className="flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <CalcIcon className="h-24 w-24 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Enter your monthly bill to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
