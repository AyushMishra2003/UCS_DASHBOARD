import React from "react";

const MarketingComponent = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 2xl:px-36 max-w-screen-xl mx-auto">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Supercharge Your Career with Digital Marketing & AI
        </h1>
        <p className="text-gray-500 mt-4 text-lg max-w-3xl mx-auto">
          Discover top-rated online courses, accelerate your digital marketing journey with AI-driven insights. Learn from the best and unlock high-paying opportunities.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Section: Features */}
        <div className="space-y-10">
          {[
            {
              title: "Career Transition",
              description:
                "Switch to in-demand digital marketing careers with ease.",
              icon: "🚀",
            },
            {
              title: "High-Paid Salaries",
              description:
                "Earn competitive salaries and thrive in your career.",
              icon: "💰",
            },
            {
              title: "Market Leadership",
              description:
                "Lead the market with strategic, data-driven approaches.",
              icon: "📊",
            },
            {
              title: "Entrepreneurial Opportunities",
              description:
                "Tap into the booming entrepreneurial digital landscape.",
              icon: "🌱",
            },
            {
              title: "Industry Influence",
              description:
                "Stay ahead of the curve with AI-powered industry trends.",
              icon: "🏆",
            },
            {
              title: "Diverse Roles",
              description:
                "Explore a wide range of career paths—SEO, Social Media, Content Creation.",
              icon: "🔎",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              {/* Icon */}
              <span className="text-4xl">{item.icon}</span>
              {/* Text */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-500 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section (Image and Pricing) */}
        <div className="flex flex-col items-center lg:items-start space-y-8">
          {/* Image */}
          <img
            src="https://via.placeholder.com/500"
            alt="Digital Marketing"
            className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />

          {/* Pricing and Call to Action */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <div className="flex items-center justify-center space-x-2 text-2xl font-semibold text-gray-800">
              <span>₹ 31,499</span>
              <span className="line-through text-gray-400">₹ 50,000</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingComponent;
