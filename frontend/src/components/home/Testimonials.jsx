import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  const reviews = [
    {
      name: "Allen",
      role: "Patient",
      review: "Excellent service and friendly doctors. The entire process was seamless and the facility is top-notch. Highly recommended!",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Priya",
      role: "Patient",
      review: "Very clean hospital and professional staff. They took the time to explain everything clearly. Great experience overall.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Rahul",
      role: "Patient",
      review: "Quick appointment scheduling and very effective treatment. The doctors here are truly experts in their fields. Thank you!",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
    },
  ];

  return (
    /* ✨ Background-ai Professional Medical Slate (#f8fafc)-ku maathiyullaen */
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            What Our Patients Say
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Real stories from people who trusted us with their health.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {reviews.map((item, index) => (
            <div
              key={index}
              /* ✨ Card-ai Pure White-ah maathunaal background-oda neat-ah contrast aagum */
              className="relative bg-white p-8 rounded-[2rem] border border-transparent 
                         hover:border-blue-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] 
                         hover:shadow-2xl transition-all duration-300 group"
            >
              {/* QUOTE ICON */}
              <FaQuoteLeft className="text-blue-100 text-4xl absolute top-6 right-8 group-hover:text-blue-400 transition-colors" />

              {/* REVIEW TEXT */}
              <p className="text-gray-700 leading-relaxed mb-8 italic relative z-10">
                "{item.review}"
              </p>

              {/* PATIENT INFO */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                  {/* STARS */}
                  <div className="flex text-yellow-400 text-xs mt-1">
                    {"★".repeat(5)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}