import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import myschool from "../assets/myschool.jpg";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="text-center text-2xl pt-10 text-gray-500">
        Biz <span className="text-gray-700 font-medium">haqimizda</span>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="object-cover w-full h-full rounded-lg m-auto md:w-1/2 lg:w-[500px]"
          src={myschool}
          alt="About Us Banner"
        />

        <div className="my-10 flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
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
          <b className="text-gray-800">Bizning Vizyonimiz</b>
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
      <div className="text-xl my-4 text-center text-gray-700">
        <p>
          WHY{" "}
          <span className="text-gray-800 font-semibold">BIZNI TANLANG:</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center md:flex-row mb-20 gap-6 md:gap-12 max-w-5xl mx-auto">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center">
            <FaCheckCircle className="text-primary mr-2" />
            <b>Samaradorlik:</b>
          </div>
          <p>
            Moslashtirilgan sinov darslarini ro'yxatdan o'tkazish va
            rejalashtirish sizning band turmush tarzingizga.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center">
            <FaCheckCircle className="text-primary mr-2" />
            <b>Qulaylik:</b>
          </div>
          <p>
            Tajribali ingliz tili o'qituvchilari tarmog'iga oson kirish
            darajalar, boshlang'ichdan IELTSGACHA.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md text-center">
          <div className="flex items-center justify-center">
            <FaCheckCircle className="text-primary mr-2" />
            <b>Shaxsiylashtirish:</b>
          </div>
          <p>
            Sizga erishishga yordam beradigan maxsus o'quv yo'llari va
            ko'rsatmalar Ingliz tili maqsadlari samarali.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
