import { Home, Building2, Battery, Wrench, ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Products() {
  const { t } = useLanguage();

  const products = [
    {
      icon: Home,
      title: t("residentialSolar"),
      description: t("residentialSolarDesc"),
      features: [
        "1kW to 10kW",
        "Up to 40% Subsidy",
        "ROI in 3-5 years",
        "Net-metering eligible",
      ],
      image:
        "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Building2,
      title: t("commercialSolar"),
      description: t("commercialSolarDesc"),
      features: [
        "10kW to 1MW+",
        "Tax benefits",
        "Reduced peak demand",
        "Custom solutions",
      ],
      image:
        "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "from-green-600 to-green-700",
    },
    {
      icon: Battery,
      title: t("hybridSolar"),
      description: t("hybridSolarDesc"),
      features: [
        "24/7 power backup",
        "Grid + Battery",
        "Remote locations",
        "Lithium batteries",
      ],
      image:
        "https://images.pexels.com/photos/9875439/pexels-photo-9875439.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "from-yellow-600 to-yellow-700",
    },
    {
      icon: Wrench,
      title: t("amcPlans"),
      description: t("amcPlansDesc"),
      features: [
        "Annual checkups",
        "Performance monitoring",
        "Priority support",
        "Extended warranty",
      ],
      image:
        "https://images.pexels.com/photos/371900/pexels-photo-371900.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "from-blue-600 to-blue-700",
    },
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("ourProducts")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solar solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                ></div>
                <div
                  className={`absolute top-4 left-4 bg-gradient-to-r ${product.color} text-white p-3 rounded-xl`}
                >
                  <product.icon className="h-6 w-6" />
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6">{product.description}</p>

                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <svg
                        className="h-5 w-5 text-green-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`group/btn inline-flex items-center text-white bg-gradient-to-r ${product.color} px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium`}
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
