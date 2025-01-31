import Hero from "@/components/Hero";
import React from "react";
import Card from "@/components/common/Card";
import Category from "@/components/Category";
import { fetchFromServer } from "./actions/fetchFromServer";
import { Api } from "@/interfaces/interfaces";
import Image_text_Card from "@/components/common/Image_text_Card";
import CustomerReview from "@/components/common/CustomerReview";
import Cards_works from "@/components/common/Cards_works";
import NewsletterForm from "@/components/Newsletter";
import Link from "next/link";
import cardData from "../constants/CardJson/card.json";
import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import { capFirst } from "@/utils/validation";
import Images from "@/constants/images";
import { Swiper, SwiperSlide } from "swiper/react";
import ExpolreallcategoryCraousal from "@/components/ExpolreallcategoryCraousal";
import ImageSlider from "@/components/common/ImageSlider";
import PartnerCompanies from "@/components/PartnerCompanies";
import HomeCategorySection from "@/components/HomeCategorySection";
// import 'antd/dist/antd.css';
const images = [
  { src: "https://img.freepik.com/premium-psd/greeting-card-with-flowers-it-pink-background_74869-4261.jpg?w=826", alt: "Image 1" },
  { src: "https://img.freepik.com/premium-vector/simple-floral-thank-you-card-with-watercolor-background_694794-178.jpg?w=1380", alt: "Image 2" },
  { src: "https://img.freepik.com/premium-photo/wedding-invitation-with-flowers-flower-middle_1191871-49377.jpg?w=740", alt: "Image 3" },
];
const array = [
  'https://img.freepik.com/premium-psd/greeting-card-with-flowers-it-pink-background_74869-4261.jpg?w=826',
  "https://img.freepik.com/premium-vector/simple-floral-thank-you-card-with-watercolor-background_694794-178.jpg?w=1380",
  "https://img.freepik.com/premium-photo/wedding-invitation-with-flowers-flower-middle_1191871-49377.jpg?w=740",
  "https://img.freepik.com/free-vector/elegant-daisy-flower-wedding-invitation-card-template_44538-9850.jpg?t=st=1726234933~exp=1726238533~hmac=76bd2c3ed266dec873f39372aaa1973615b57c50375696a913e26d05d5c0598f&w=1380",
  "https://img.freepik.com/free-psd/beautiful-christmas-floral-wreath-frame-design_21799-10722.jpg?t=st=1726234955~exp=1726238555~hmac=c4406c10583bd202e08964dd43e645727f6f30c21b0db39506af66d271629888&w=1380",
  "https://img.freepik.com/free-vector/summer-wedding-invitation_53876-92838.jpg?t=st=1726235013~exp=1726238613~hmac=83595c3903b855f20775c71b2bc347e136a2d79fd424053a26770c2514f71cdd&w=826",
  "https://img.freepik.com/free-psd/beautiful-watercolor-wedding-invitation-card-with-elegant-flower-tiny-foliage_44538-10601.jpg?t=st=1726235036~exp=1726238636~hmac=d1dc9a692078bdca87612cb7db66afe125d8c3af762cab4f66d5add701eac784&w=1060"
]
const Home = async ({ searchParams }: any) => {
  const api: Api = {
    url: "https://fakestoreapi.com/products",
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data = await fetchFromServer(api);
  console.log(data, "apiRes");
  // const chunkArray = (arr: any[], size: number) => {
  //   const result = [];
  //   for (let i = 0; i < arr.length; i += size) {
  //     result.push(arr.slice(i, i + size));
  //   }
  //   return result;
  // };

  // const categoriesChunks = chunkArray(cardData.data, 5);
  const api2: Api = {
    url: `https://magshopify.goaideme.com/card/collection-listing`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data2 = await fetchFromServer(api2);
  console.log(data2.data, "qwertyuiop");
  return (
    <>
      <section className="">
        <div className="mt-50">
          <Hero {...cardData} />
        </div>
       <div className=" section_space_50">
        <PartnerCompanies/>
       </div>
        {/* <ExpolreallcategoryCraousal /> */}
        <HomeCategorySection searchParams={searchParams} />
        {/* <ImageSlider  /> */}
        {/* <div className="container-fluid text-center py-12">
          <h3 className="xl:text-4xl md:text-xl sm:text-md font-semibold lg:max-w-[50%] md:max-w-[60%] max-w-[100%] mx-auto">
            We have Group Greeting Cards for all occasions{" "}
            <span className="text-blueText"> Premium </span> cards start at{" "}
            <span className="text-blueText">$1 </span>
          </h3>
          <div className="justify-center items-center gap-5 mt-5"> */}
          {/* <Carousel 
          autoplay={true}  
          arrows={true} 
          dots={false} // Disable dots if you want a cleaner look
          infinite={true} // Enable infinite scrolling
          // slidesToShow={3}
        > */}
        
        {/* <ImageSlider  /> */}
            {/* </Carousel> */}
          {/* </div>
        </div> */}

        {/* Section 4 */}

        <Image_text_Card />

        {/* Section 5 */}
        <div className=" bg-workBg bg-no-repeat bg-cover py-16 how_we_work">
          <div className="text-center container-fluid ">
            <h1 className="xl:text-4xl md:text-xl sm:text-md font-semibold">
              How group cards work?
            </h1>
            <p className="md:text-xl text-md text-gray-600 font-semibold mb-8">
              How to create a group ecard signed by multiple people.
            </p>
          </div>
          <Cards_works />
          <div className="text-center mt-8">
            <Link href={`/create`}>
              <button className="btnPrimary px-4  py-2">Get Started</button>
            </Link>
          </div>
        </div>
        {/* Section 6 */}
        <div className="bg-testimonialBg common_padding bg-no-repeat testimonial_section">
          <div className=" mx-auto px-5 text-center container-fluid">
            <h2 className="xl:text-4xl md:text-xl sm:text-md font-semibold mb-10">
              See Why Our Customers Love Our Cards
            </h2>

            {/* Reviews Grid */}

            <CustomerReview />
          </div>
        </div>

        {/* Section 7 */}
        <NewsletterForm />
      </section>
    </>
  );
};

export default Home;