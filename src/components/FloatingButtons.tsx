import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingButtons() {
  const whatsappNumber = '919691192525';
  const phoneNumber = '+919691192525';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in solar installation`}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      <a
        href={`tel:${phoneNumber}`}
        className="group bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="h-7 w-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call Now
        </span>
      </a>
    </div>
  );
}
