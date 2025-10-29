import React from "react";
import { Bot, Cpu } from "lucide-react";

const StudentSection2: React.FC = () => {
  return (
    <section className="bg-[#f9f9f6] text-gray-900 py-16 px-6 md:px-16">
      {/* Continue Learning */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">Continue Learning</h2>
        <p className="text-lg text-gray-600 mb-5">Continue where you left off.</p>

        <div className="flex flex-wrap gap-6 border-b border-gray-300 pb-2 text-lg font-medium">
          {["In Progress", "My Scheduled Exams", "My Live Sessions", "My Favorites", "My Scheduled Labs"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-700 hover:text-black relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-[4px] hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <p className="mt-5 text-gray-500">No Favorites</p>
      </div>

      {/* Explore our Cloud Library */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Explore our Cloud Library</h3>

        {/* Tabs */}
        <div className="flex flex-wrap gap-8 border-b border-gray-300 pb-2 text-lg font-medium overflow-x-auto">
          {[
            "Oracle AI",
            "New Features: Oracle Cloud Applications",
            "Cloud Applications SaaS",
            "Cloud Infrastructure",
            "Industry Solutions",
            "Databases",
            "Java",
            "Hardware",
          ].map((tab, index) => (
            <button
              key={tab}
              className={`whitespace-nowrap ${
                index === 0 ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Card Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#4b164c] text-white p-6 rounded-lg shadow hover:shadow-xl transition-all">
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2">
              SaaS <Bot className="w-5 h-5" />
            </h4>
            <p className="text-sm md:text-base text-gray-200">
              Oracle Fusion Applications: AI Agent Studio
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#2f4f3b] text-white p-6 rounded-lg shadow hover:shadow-xl transition-all">
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2">
              OCI <Cpu className="w-5 h-5" />
            </h4>
            <p className="text-sm md:text-base text-gray-200">
              AI For OCI And Cloud Applications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentSection2;
