import React from "react";
import { FaCheckCircle, FaQuoteLeft, FaStar } from "react-icons/fa";
import myschool from "../assets/myschool.jpg";

// Import teacher profile images
import teacher1 from "../assets/teacher1.jpg";
import teacher2 from "../assets/teacher2.jpg";
import teacher3 from "../assets/teacher3.jpg";

// Import student review images
import studentReview1 from "../assets/review1.jpg";
import studentReview2 from "../assets/review2.jpg";
import studentReview3 from "../assets/review3.jpg";

// Import course images
import generalEnglishImg from "../assets/general-english.jpg";
import individualCourseImg from "../assets/individual-course.jpg";
import ieltsPreparationImg from "../assets/ielts-preparation.jpg";

const AboutUsPage = () => {
  const teachers = [
    {
      id: 1,
      name: "Miss Khurshida",
      role: "General English Expert",
      image: teacher1,
    },
    {
      id: 2,
      name: "Mr Rustam",
      role: "IELTS Instructor",
      image: teacher2,
    },
    {
      id: 3,
      name: "Mr Cameron",
      role: "Tesol Teacher",
      image: teacher3,
    },
  ];

  const reviews = [
    { id: 1, image: studentReview1 },
    { id: 2, image: studentReview2 },
    { id: 3, image: studentReview3 },
  ];

  const courses = [
    {
      id: 1,
      title: "General English",
      levels: ["Beginner", "Intermediate", "Advanced"],
      description: "Comprehensive English language training for all levels",
      image: generalEnglishImg,
    },
    {
      id: 2,
      title: "Individual Courses",
      levels: ["Customized", "One-on-One", "Flexible Schedule"],
      description: "Personalized learning tailored to your specific needs",
      image: individualCourseImg,
    },
    {
      id: 3,
      title: "IELTS Preparation",
      levels: ["Academic", "General Training", "Intensive"],
      description: "Specialized training to achieve your target IELTS score",
      image: ieltsPreparationImg,
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About <span className="text-primary">Us</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          My School Learning Centre-best for Learning English source
        </p>
      </div>

      {/* About Section */}
      <div className="my-10 flex flex-col md:flex-row gap-12 max-w-6xl mx-auto px-4">
        <img
          className="object-cover w-full h-full rounded-lg shadow-lg m-auto md:w-1/2 lg:w-[500px]"
          src={myschool}
          alt="About Us Banner"
        />

        <div className="my-10 flex flex-col justify-center gap-6 md:w-2/4 text-base text-gray-600">
          <p>
            Welcome To{" "}
            <span className="text-primary font-medium">
              My School Learning Centre
            </span>
            is your faithful partner in achieving your goals in English. How do
            we find students in"my school" we understand that difficulties are
            faced with the right sources, contact experienced teachers and on
            the way to their education maintain consistent progress.
          </p>
          <p>
            <span className="text-primary font-medium">My School</span> is the
            English language that seeks excellence in education. We are always
            we work to improve your platform, innovation methods combining
            learning experience and advanced education provides assistance. Take
            your first steps in English are you throwing or preparing for IELTS,{" "}
            <span className="text-primary font-medium">My School</span> shu on
            the ground to guide you every step of the way.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            Our Vision
          </h3>
          <p>
            Our opinion{" "}
            <span className="text-primary font-medium">
              My School Learning Centre
            </span>{" "}
            is a dynamic and supportive environment for every student is
            creation. We connect students with wonderful teachers we aim to
            achieve your goals and in English it's easier for you to succeed
            language journey.
          </p>
        </div>
      </div>

      {/* Our Courses Section - Updated with same size as teacher profiles */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            Our <span className="text-primary">courses</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Professional designed for any level and needs courses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image container with same 464×825 aspect ratio as teacher profiles */}
                <div className="relative pb-[177.8%]">
                  {" "}
                  {/* 825/464 = 1.778 */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="space-y-2">
                    {course.levels.map((level, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheckCircle className="text-primary mr-2" />
                        <span className="text-gray-700">{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-primary/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            Why <span className="text-primary">Choose Us?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-primary text-xl mr-2" />
                <h3 className="text-lg font-semibold">Efficiency</h3>
              </div>
              <p className="text-gray-600">
                Registration of adapted test classes and planning to your busy
                lifestyle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-primary text-xl mr-2" />
                <h3 className="text-lg font-semibold">Convenience</h3>
              </div>
              <p className="text-gray-600">
                Easy access to the network of experienced English teachers
                levels, from beginner to IELTS.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-primary text-xl mr-2" />
                <h3 className="text-lg font-semibold">Personalization</h3>
              </div>
              <p className="text-gray-600">
                Special training paths to help you achieve and instructions
                English goals are effective.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Teachers Section */}
      <div className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
          Our <span className="text-primary">Teachers</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our teachers who are experienced and experts in their field ready to
          help you learn English.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="relative pb-[177.8%]">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {teacher.name}
                </h3>
                <p className="text-primary font-medium">{teacher.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Reviews Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            Our students <span className="text-primary">opinions</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            What do our students say about My School?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={review.image}
                  alt={`Student review ${review.id}`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Are you ready to learn English?
          </h2>
          <p className="text-lg mb-8">
            Sign up now and our experienced teachers start your first lesson
            with!
          </p>
          <button
            onClick={() =>
              window.open("https://myschoollc.uz/register", "_blank")
            }
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
