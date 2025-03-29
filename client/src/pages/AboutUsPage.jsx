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
          Biz <span className="text-primary">haqimizda</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          My School Learning Centre - Ingliz tilini o'rganish uchun eng yaxshi
          manba
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
            Xush kelibsiz{" "}
            <span className="text-primary font-medium">
              My School Learning Centre
            </span>
            , Ingliz tilidagi maqsadlaringizga erishishda sodiq hamkoringiz.
            "Mening maktabim"da biz o'quvchilarning topishda qanday
            qiyinchiliklarga duch kelishini tushunamiz to'g'ri manbalar,
            tajribali o'qituvchilar bilan bog'lanish va ularning ta'lim yo'lida
            izchil taraqqiyotni saqlab qolish.
          </p>
          <p>
            <span className="text-primary font-medium">My School</span>{" "}
            hisoblanadi ingliz tili ta'limida mukammallikka intiladi. Biz doimo
            ishlaymiz platformangizni takomillashtirish, innovatsion usullarni
            birlashtirish o'rganish tajribasi va yuqori darajadagi ta'lim
            yordamini taqdim etadi. Ingliz tilida birinchi qadamlaringizni
            tashlayapsizmi yoki tayyorgarlik ko'ryapsizmi IELTS,{" "}
            <span className="text-primary font-medium">My School</span> shu
            yerda sizga yo'lning har bir qadamini yo'naltirish uchun.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            Bizning Vizyonimiz
          </h3>
          <p>
            Bizning fikrimiz{" "}
            <span className="text-primary font-medium">
              My School Learning Centre
            </span>{" "}
            har bir talaba uchun dinamik va qo'llab-quvvatlovchi muhit
            yaratishdir. Biz o'quvchilarni ajoyib o'qituvchilar bilan bog'lashni
            maqsad qilganmiz maqsadlaringizga erishishingiz va ingliz tilida
            muvaffaqiyat qozonishingiz osonroq til sayohati.
          </p>
        </div>
      </div>

      {/* Our Courses Section - Updated with same size as teacher profiles */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            Bizning <span className="text-primary">Kurslarimiz</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Har qanday daraja va ehtiyojlar uchun mo'ljallangan professional
            kurslar
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
            Nega <span className="text-primary">Bizni Tanlashadi?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-primary text-xl mr-2" />
                <h3 className="text-lg font-semibold">Samaradorlik</h3>
              </div>
              <p className="text-gray-600">
                Moslashtirilgan sinov darslarini ro'yxatdan o'tkazish va
                rejalashtirish sizning band turmush tarzingizga.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-primary text-xl mr-2" />
                <h3 className="text-lg font-semibold">Qulaylik</h3>
              </div>
              <p className="text-gray-600">
                Tajribali ingliz tili o'qituvchilari tarmog'iga oson kirish
                darajalar, boshlang'ichdan IELTSGACHA.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-primary text-xl mr-2" />
                <h3 className="text-lg font-semibold">Shaxsiylashtirish</h3>
              </div>
              <p className="text-gray-600">
                Sizga erishishga yordam beradigan maxsus o'quv yo'llari va
                ko'rsatmalar Ingliz tili maqsadlari samarali.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Teachers Section */}
      <div className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
          Bizning <span className="text-primary">O'qituvchilarimiz</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Tajribali va o'z sohasining mutaxassislari bo'lgan o'qituvchilarimiz
          sizga ingliz tilini o'rganishda yordam berishga tayyor.
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
            O'quvchilarimizning <span className="text-primary">Fikrlari</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Bizning o'quvchilarimiz My School haqida nima deyishadi
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
            Ingliz tilini o'rganishga tayyormisiz?
          </h2>
          <p className="text-lg mb-8">
            Hoziroq ro'yxatdan o'ting va bizning tajribali o'qituvchilarimiz
            bilan birinchi darsingizni boshlang!
          </p>
          <button
            onClick={() =>
              window.open("https://myschoollc.uz/register", "_blank")
            }
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Ro'yxatdan O'tish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
