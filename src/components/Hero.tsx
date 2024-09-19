import Images from "@/constants/images";
import { List } from "antd";
import Image from "next/image";
import React from "react";
const Hero = () => {
  return (
    <>
      <section className="bg-heroBg dark:bg-gray-900 ">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-black">
              Group Greeting Cards{" "}
              <span className="text-blueText">for Thank you</span>
            </h1>
            <p className="text-black max-w-2xl mb-6 font-normal lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400">
              The easiest way to pass a virtual greeting card around your
              office.
            </p>

            <ul className="list-none d-flex px-3 gap-10">
              <List className="relative listBefore ml-4 md:text-lg lg:text-lg">Easy to share</List>
              <List className="relative listBefore ml-5 md:text-lg lg:text-lg">Quick to create </List>
              <List className="relative listBefore ml-5 md:text-lg lg:text-lg">Unlimited signatures</List>
            </ul>

           <div className="mt-5">
           <a
              href="/create"
              className=" inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 no-underline bg-blueBg text-white"
            >
              Start a group Card
            </a>
            <a
              href="#"
              className="text-black inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-2 no-underline hover:bg-blueBg hover:text-white"
            >
              Try Our Demo Card
            </a>
           </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src={Images.Hero}
              width={400}
              height={400}
              alt="hero_image"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Hero;