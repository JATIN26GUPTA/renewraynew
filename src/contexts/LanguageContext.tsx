import React, { createContext, useContext, useState } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations: Record<string, Record<Language, string>> = {
  companyName: { en: "RenewRay Pvt. Ltd.", hi: "रिन्यूरे प्राइवेट लिमिटेड" },
  tagline: {
    en: "Powering Your Future with Clean Energy",
    hi: "स्वच्छ ऊर्जा से आपके भविष्य को शक्ति दें",
  },
  heroHeadline: {
    en: "Save Up to 90% on Your Electricity Bills",
    hi: "अपने बिजली बिल में 90% तक की बचत करें",
  },
  heroSubheadline: {
    en: "Switch to Solar & Start Saving Today with India's Trusted Solar EPC Partner",
    hi: "सोलर पर स्विच करें और भारत के विश्वसनीय सोलर EPC पार्टनर के साथ आज ही बचत शुरू करें",
  },
  bookConsultation: {
    en: "Book Free Consultation",
    hi: "मुफ्त परामर्श बुक करें",
  },
  calculateSavings: { en: "Calculate Savings", hi: "बचत की गणना करें" },
  whyRenewRay: { en: "Why Choose RenewRay", hi: "रिन्यूरे को क्यों चुनें" },
  solarBenefits: { en: "Solar Benefits", hi: "सोलर के लाभ" },
  lowerBills: { en: "Lower Electricity Bills", hi: "कम बिजली बिल" },
  lowerBillsDesc: {
    en: "Reduce your monthly electricity costs by up to 90%",
    hi: "अपने मासिक बिजली खर्च को 90% तक कम करें",
  },
  govtSubsidy: { en: "Government Subsidies", hi: "सरकारी सब्सिडी" },
  govtSubsidyDesc: {
    en: "Get up to 40% subsidy on residential solar installations",
    hi: "आवासीय सोलर इंस्टॉलेशन पर 40% तक सब्सिडी पाएं",
  },
  warranty: { en: "25-Year Panel Warranty", hi: "25 साल की पैनल वारंटी" },
  warrantyDesc: {
    en: "Long-lasting performance with comprehensive warranty coverage",
    hi: "व्यापक वारंटी कवरेज के साथ लंबे समय तक चलने वाला प्रदर्शन",
  },
  netMetering: { en: "Net-Metering Eligible", hi: "नेट-मीटरिंग योग्य" },
  netMeteringDesc: {
    en: "Sell excess power back to the grid and earn credits",
    hi: "अतिरिक्त बिजली ग्रिड को बेचें और क्रेडिट कमाएं",
  },
  emiOptions: { en: "EMI Financing Options", hi: "ईएमआई वित्तपोषण विकल्प" },
  emiOptionsDesc: {
    en: "Affordable payment plans with zero down payment options",
    hi: "जीरो डाउन पेमेंट विकल्पों के साथ किफायती भुगतान योजनाएं",
  },
  ecoFriendly: { en: "Eco-Friendly Energy", hi: "पर्यावरण के अनुकूल ऊर्जा" },
  ecoFriendlyDesc: {
    en: "Reduce carbon footprint and contribute to a greener planet",
    hi: "कार्बन फुटप्रिंट कम करें और हरित ग्रह में योगदान दें",
  },
  govtApproved: {
    en: "Govt. Approved Vendor",
    hi: "सरकार द्वारा अनुमोदित विक्रेता",
  },
  govtApprovedDesc: {
    en: "MNRE certified and BIS approved solar solutions provider",
    hi: "MNRE प्रमाणित और BIS अनुमोदित सोलर समाधान प्रदाता",
  },
  certifiedEngineers: { en: "Certified Engineers", hi: "प्रमाणित इंजीनियर" },
  certifiedEngineersDesc: {
    en: "Experienced team with technical expertise in solar installations",
    hi: "सोलर इंस्टॉलेशन में तकनीकी विशेषज्ञता वाली अनुभवी टीम",
  },
  fastInstallation: { en: "Fast Installation", hi: "त्वरित स्थापना" },
  fastInstallationDesc: {
    en: "Quick turnaround time from approval to commissioning",
    hi: "अनुमोदन से कमीशनिंग तक तेज़ समय",
  },
  onlineMonitoring: { en: "Online Monitoring", hi: "ऑनलाइन निगरानी" },
  onlineMonitoringDesc: {
    en: "Real-time performance tracking through mobile app",
    hi: "मोबाइल ऐप के माध्यम से वास्तविक समय प्रदर्शन ट्रैकिंग",
  },
  transparentPricing: {
    en: "Transparent Pricing",
    hi: "पारदर्शी मूल्य निर्धारण",
  },
  transparentPricingDesc: {
    en: "No hidden costs, clear quotations with detailed breakdown",
    hi: "कोई छिपी हुई लागत नहीं, विस्तृत विवरण के साथ स्पष्ट उद्धरण",
  },
  panIndiaService: { en: "PAN-India Service", hi: "पैन-इंडिया सेवा" },
  panIndiaServiceDesc: {
    en: "Trusted service across India with Kota-based expertise",
    hi: "कोटा-आधारित विशेषज्ञता के साथ पूरे भारत में विश्वसनीय सेवा",
  },
  ourProducts: { en: "Our Solar Solutions", hi: "हमारे सोलर समाधान" },
  residentialSolar: {
    en: "Residential Rooftop Solar",
    hi: "आवासीय रूफटॉप सोलर",
  },
  residentialSolarDesc: {
    en: "Perfect for homes and apartments. Get govt. subsidy up to 40%",
    hi: "घरों और अपार्टमेंट के लिए आदर्श। 40% तक सरकारी सब्सिडी पाएं",
  },
  commercialSolar: {
    en: "Commercial & Industrial Solar",
    hi: "व्यावसायिक और औद्योगिक सोलर",
  },
  commercialSolarDesc: {
    en: "Large-scale solar solutions for businesses and industries",
    hi: "व्यवसायों और उद्योगों के लिए बड़े पैमाने पर सोलर समाधान",
  },
  hybridSolar: {
    en: "Hybrid & Off-Grid Solutions",
    hi: "हाइब्रिड और ऑफ-ग्रिड समाधान",
  },
  hybridSolarDesc: {
    en: "Battery backup systems for uninterrupted power supply",
    hi: "निर्बाध बिजली आपूर्ति के लिए बैटरी बैकअप सिस्टम",
  },
  amcPlans: { en: "AMC & Maintenance Plans", hi: "AMC और रखरखाव योजनाएं" },
  amcPlansDesc: {
    en: "Regular maintenance and monitoring for optimal performance",
    hi: "इष्टतम प्रदर्शन के लिए नियमित रखरखाव और निगरानी",
  },
  savingsCalculator: {
    en: "Solar Savings Calculator",
    hi: "सोलर बचत कैलकुलेटर",
  },
  savingsCalculatorDesc: {
    en: "Find out how much you can save with solar",
    hi: "जानें कि आप सोलर से कितनी बचत कर सकते हैं",
  },
  monthlyBill: {
    en: "Monthly Electricity Bill (₹)",
    hi: "मासिक बिजली बिल (₹)",
  },
  calculate: { en: "Calculate", hi: "गणना करें" },
  recommendedSize: { en: "Recommended Solar Size", hi: "अनुशंसित सोलर आकार" },
  estimatedCost: { en: "Estimated Cost", hi: "अनुमानित लागत" },
  annualSavings: { en: "Annual Savings", hi: "वार्षिक बचत" },
  paybackPeriod: { en: "Payback Period", hi: "पेबैक अवधि" },
  years: { en: "years", hi: "साल" },
  govtSubsidySection: {
    en: "Government Subsidy Information",
    hi: "सरकारी सब्सिडी जानकारी",
  },
  subsidyEligibility: { en: "Subsidy Eligibility", hi: "सब्सिडी पात्रता" },
  subsidyEligibilityDesc: {
    en: "Residential consumers can avail subsidy up to 40% on solar installations up to 3kW",
    hi: "आवासीय उपभोक्ता 3kW तक के सोलर इंस्टॉलेशन पर 40% तक सब्सिडी प्राप्त कर सकते हैं",
  },
  requiredDocuments: { en: "Required Documents", hi: "आवश्यक दस्तावेज़" },
  requiredDocumentsDesc: {
    en: "Aadhaar card, electricity bill, property documents, and bank details",
    hi: "आधार कार्ड, बिजली बिल, संपत्ति दस्तावेज़ और बैंक विवरण",
  },
  applicationSupport: { en: "Application Support", hi: "आवेदन सहायता" },
  applicationSupportDesc: {
    en: "We handle the complete subsidy application process for you",
    hi: "हम आपके लिए संपूर्ण सब्सिडी आवेदन प्रक्रिया संभालते हैं",
  },
  installationProcess: { en: "Installation Process", hi: "स्थापना प्रक्रिया" },
  siteSurvey: { en: "Site Survey", hi: "साइट सर्वेक्षण" },
  siteSurveyDesc: {
    en: "Free on-site assessment and feasibility study",
    hi: "मुफ्त ऑन-साइट मूल्यांकन और व्यवहार्यता अध्ययन",
  },
  systemDesign: { en: "System Design", hi: "सिस्टम डिज़ाइन" },
  systemDesignDesc: {
    en: "Customized solar solution based on your requirements",
    hi: "आपकी आवश्यकताओं के आधार पर अनुकूलित सोलर समाधान",
  },
  approvals: {
    en: "Approvals & Documentation",
    hi: "अनुमोदन और दस्तावेज़ीकरण",
  },
  approvalsDesc: {
    en: "We handle all permits and government approvals",
    hi: "हम सभी परमिट और सरकारी अनुमोदन संभालते हैं",
  },
  installation: { en: "Installation", hi: "स्थापना" },
  installationDesc: {
    en: "Professional installation by certified engineers",
    hi: "प्रमाणित इंजीनियरों द्वारा पेशेवर स्थापना",
  },
  commissioning: { en: "Commissioning", hi: "कमीशनिंग" },
  commissioningDesc: {
    en: "Testing and activation of your solar system",
    hi: "आपके सोलर सिस्टम का परीक्षण और सक्रियण",
  },
  monitoring: { en: "Monitoring & Support", hi: "निगरानी और सहायता" },
  monitoringDesc: {
    en: "Ongoing monitoring and maintenance support",
    hi: "निरंतर निगरानी और रखरखाव सहायता",
  },
  completedProjects: { en: "Completed Projects", hi: "पूर्ण परियोजनाएं" },
  viewAll: { en: "View All", hi: "सभी देखें" },
  testimonials: {
    en: "What Our Customers Say",
    hi: "हमारे ग्राहक क्या कहते हैं",
  },
  faq: { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न" },
  contactUs: { en: "Contact Us", hi: "संपर्क करें" },
  getInTouch: { en: "Get In Touch", hi: "संपर्क में रहें" },
  name: { en: "Name", hi: "नाम" },
  email: { en: "Email", hi: "ईमेल" },
  phone: { en: "Phone Number", hi: "फोन नंबर" },
  message: { en: "Message", hi: "संदेश" },
  submit: { en: "Submit", hi: "जमा करें" },
  address: { en: "Address", hi: "पता" },
  aboutUs: { en: "About Us", hi: "हमारे बारे में" },
  products: { en: "Products", hi: "उत्पाद" },
  services: { en: "Services", hi: "सेवाएं" },
  support: { en: "Support", hi: "सहायता" },
  followUs: { en: "Follow Us", hi: "हमें फॉलो करें" },
  allRightsReserved: { en: "All rights reserved", hi: "सर्वाधिकार सुरक्षित" },
  home: { en: "Home", hi: "होम" },
  about: { en: "About", hi: "हमारे बारे में" },
  residential: { en: "Residential", hi: "आवासीय" },
  commercial: { en: "Commercial", hi: "व्यावसायिक" },
  subsidy: { en: "Subsidy", hi: "सब्सिडी" },
  emi: { en: "EMI & Financing", hi: "ईएमआई और वित्तपोषण" },
  amc: { en: "AMC & Monitoring", hi: "AMC और निगरानी" },
  process: { en: "Process", hi: "प्रक्रिया" },
  blog: { en: "Blog", hi: "ब्लॉग" },
  contact: { en: "Contact", hi: "संपर्क" },
  scheduleVisit: {
    en: "Schedule Site Survey",
    hi: "साइट सर्वेक्षण शेड्यूल करें",
  },
  applySubsidy: {
    en: "Apply for Govt. Subsidy",
    hi: "सरकारी सब्सिडी के लिए आवेदन करें",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
