import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    { name: 'Rajesh Sharma', location: 'Kota, Rajasthan', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', rating: 5, text: 'RenewRay installed a 5kW system at my home. My electricity bills have dropped by 85%. The team was professional and installation was completed in just 3 days. Highly recommended!', savings: '₹4,200/month' },
    { name: 'Priya Patel', location: 'Jaipur, Rajasthan', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', rating: 5, text: 'Excellent service from start to finish. They handled all the subsidy paperwork and net-metering approvals. The monitoring app is great and customer support is responsive.', savings: '₹8,500/month' },
    { name: 'Amit Verma', location: 'Udaipur, Rajasthan', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', rating: 5, text: 'Best decision for my factory! 100kW system is saving us lakhs annually. RenewRay provided transparent pricing and quality components. ROI will be achieved in 4 years.', savings: '₹95,000/month' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('testimonials')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Hear from our satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <Quote className="absolute top-6 right-6 h-12 w-12 text-blue-200" />

              <div className="flex items-center mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white shadow-md" />
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4 relative z-10">{testimonial.text}</p>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg inline-block font-medium text-sm">
                Saving {testimonial.savings}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-50 text-yellow-800 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 fill-current" />
            <span className="font-bold">4.9/5</span>
            <span className="text-yellow-700">Based on 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
