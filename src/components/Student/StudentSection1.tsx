import React from "react";

const StudentSection1: React.FC = () => {
  return (
    <section className="bg-[#316d7e] text-white py-16 px-10">
      <h2 className="text-3xl font-semibold mb-3">Welcome, Mohamed</h2>
      <p className="text-lg mb-6">
        Your personal digital learning portal
      </p>

      <div className="bg-[#1d5b69] py-6 px-6 rounded-xl mt-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium">
            You have no content preferences selected yet
          </p>
          <p className="text-sm text-gray-200 mt-1">
            Adding preferences helps us tailor recommendations to your learning goals
          </p>
        </div>
        <button className="mt-4 md:mt-0 bg-white text-[#1d5b69] px-5 py-2 rounded-md font-semibold hover:bg-gray-100">
          + Add your preferences
        </button>
      </div>
    </section>
  );
};

export default StudentSection1;
