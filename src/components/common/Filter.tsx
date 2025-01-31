"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { capFirst } from '@/utils/validation';

const Filter = ({ urlValue,cardLabel,response }: { urlValue: string,cardLabel:any,response:any }) => {
    let array=[ "farewell","birthday", "baby", "wedding", "get-well", "sympathy"]
    const router = useRouter();

    const handleClick = (category: string, id:any) => {
      console.log(category, "category");
      const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
      router.push(cardLabel?`/card/${formattedCategory}/${cardLabel}`:`/card/${formattedCategory}`);
    };
  // const type = searchParams?.category||"farewell"
  // console.log(type, "Selected category");
  return (
    <div className="flex flex-col items-center p-8 bg-white">
      <h2 className="text-center text-lg mb-0 xl:text-xl font-semibold text-gray-600">
        Get Started by Selecting a Card
      </h2>
      <h3 className="mt-2 text-2xl  xl:text-3xl font-bold text-center text-gray-900">
        Design or Uploading Your Own!
      </h3>
      <div className="mt-4 flex lg:space-x-8 space-x-4 filter_responsive">
        {response?.data?.slice(0,6).map((category:any) => (
            <>
                {/* onClick={() => handleClick(category?.collection_title,category?.uuid)} */}
            <Link href={`/?category=${category?.collection_title}`} className='no-underline' scroll={false}>
          <span
            key={category}
            className={  urlValue === category?.collection_title.toLowerCase().replace(/\s+/g, '-') ? "text-blueText text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer text-sm sm:text-xl" : "text-black text-sm sm:text-xl  text-gray-500 hover:text-blue-500 cursor-pointer"}
            >
            {capFirst(category?.collection_title)}
          </span>
          </Link>
              </>
        ))}
      </div>

      
    </div>
  );
};

export default Filter;
