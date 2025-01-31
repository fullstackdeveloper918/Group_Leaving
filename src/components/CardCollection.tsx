import Sidebar from "./common/Sidebar";
import Card from "./common/Card";
import CollectionFilter from "./common/CollectionFilter";

import cardData from "../constants/CardJson/card.json";
import Images from "@/constants/images";
import { Api } from "@/interfaces/interfaces";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
const CardCollection = async ({ params }: any) => {
  console.log(params, "qwertyui");
  const type = params.slug[0];
 
 console.log(type,"type");
 

//  Sidebar

let data = await fetch('https://magshopify.goaideme.com/card/collection-listing', { cache: 'no-store' })
let data1 = await data.json();
  console.log(data1, "qwe323355");
//  const url = 'https://magshopify.goaideme.com/card/collection-listing';

//  const response1 = await fetch(url, {
//   method: 'GET',
//   cache: 'no-store',
// });

// const data = await response1.json();
//   console.log(data, "check145454523");
  const normalizedType = type.replace('-', ' ');
  const matchedObject = data1.data.find((item: any) => {
    const normalizedTags = item.collection_title.replace('-', ' ');
    return normalizedTags === normalizedType;
  });
  console.log(matchedObject,"matchedObject");
  const collectionType = matchedObject ? matchedObject.uuid : null;
  console.log(collectionType,"collectionType");

  // All cards

  const api2: Api = {
    url: `https://magshopify.goaideme.com/card/single-card-listing/${collectionType}`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const response = await fetchFromServer(api2);
  console.log(response, "response");

 
  const array = [
    {
      id: 1,
      image: Images.fairwell1,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 2,
      image: Images.fairwell2,
      card_label: "trending",
      type: "farewell",
    },
    { id: 3, image: Images.fairwell3, card_label: "latest", type: "farewell" },
    {
      id: 4,
      image: Images.fairwell4,
      card_label: "trending",
      type: "farewell",
    },
    { id: 5, image: Images.fairwell5, card_label: "latest", type: "farewell" },
    {
      id: 6,
      image: Images.fairwell6,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 7,
      image: Images.fairwell7,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 8,
      image: Images.fairwell8,
      card_label: "trending",
      type: "farewell",
    },
    { id: 9, image: Images.fairwell9, card_label: "latest", type: "farewell" },
    {
      id: 10,
      image: Images.fairwell10,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 11,
      image: Images.fairwell11,
      card_label: "latest",
      type: "farewell",
    },
    {
      id: 12,
      image: Images.fairwell12,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 13,
      image: Images.fairwell13,
      card_label: "latest",
      type: "farewell",
    },
    {
      id: 14,
      image: Images.fairwell14,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 15,
      image: Images.fairwell15,
      card_label: "latest",
      type: "farewell",
    },
    {
      id: 16,
      image: Images.fairwell16,
      card_label: "trending",
      type: "farewell",
    },
    // birthday
    {
      id: 17,
      image: Images.birthday1,
      card_label: "trending",
      type: "birthday",
    },
    {
      id: 18,
      image: Images.birthday2,
      card_label: "trending",
      type: "birthday",
    },
    { id: 19, image: Images.birthday3, card_label: "latest", type: "birthday" },
    {
      id: 20,
      image: Images.birthday4,
      card_label: "trending",
      type: "birthday",
    },
    { id: 21, image: Images.birthday5, card_label: "latest", type: "birthday" },
    {
      id: 22,
      image: Images.birthday6,
      card_label: "trending",
      type: "birthday",
    },
    {
      id: 23,
      image: Images.birthday7,
      card_label: "trending",
      type: "birthday",
    },
    {
      id: 24,
      image: Images.birthday8,
      card_label: "trending",
      type: "birthday",
    },
    { id: 25, image: Images.birthday9, card_label: "latest", type: "birthday" },
    {
      id: 26,
      image: Images.birthday10,
      card_label: "trending",
      type: "birthday",
    },
    // baby
    { id: 27, image: Images.baby1, card_label: "trending", type: "baby" },
    { id: 28, image: Images.baby2, card_label: "trending", type: "baby" },
    { id: 29, image: Images.baby3, card_label: "latest", type: "baby" },
    { id: 30, image: Images.baby4, card_label: "trending", type: "baby" },
    { id: 31, image: Images.baby5, card_label: "latest", type: "baby" },
    { id: 32, image: Images.baby6, card_label: "trending", type: "baby" },
    { id: 33, image: Images.baby7, card_label: "trending", type: "baby" },
    { id: 34, image: Images.baby8, card_label: "trending", type: "baby" },
    { id: 35, image: Images.baby9, card_label: "latest", type: "baby" },
    { id: 36, image: Images.baby10, card_label: "trending", type: "baby" },
    // wedding
    { id: 37, image: Images.wedding1, card_label: "trending", type: "wedding" },
    { id: 38, image: Images.wedding2, card_label: "trending", type: "wedding" },
    { id: 39, image: Images.wedding3, card_label: "latest", type: "wedding" },
    { id: 40, image: Images.wedding4, card_label: "trending", type: "wedding" },
    { id: 41, image: Images.wedding5, card_label: "latest", type: "wedding" },
    { id: 42, image: Images.wedding6, card_label: "trending", type: "wedding" },
    { id: 43, image: Images.wedding7, card_label: "trending", type: "wedding" },
    { id: 44, image: Images.wedding8, card_label: "trending", type: "wedding" },
    { id: 45, image: Images.wedding9, card_label: "latest", type: "wedding" },
    {
      id: 46,
      image: Images.wedding10,
      card_label: "trending",
      type: "wedding",
    },
    // well
    { id: 47, image: Images.well1, card_label: "trending", type: "get-well" },
    { id: 48, image: Images.well2, card_label: "trending", type: "get-well" },
    { id: 49, image: Images.well3, card_label: "latest", type: "get-well" },
    { id: 50, image: Images.well4, card_label: "trending", type: "get-well" },
    { id: 51, image: Images.well5, card_label: "latest", type: "get-well" },
    { id: 52, image: Images.well6, card_label: "trending", type: "get-well" },
    { id: 53, image: Images.well7, card_label: "trending", type: "get-well" },
    { id: 54, image: Images.well8, card_label: "trending", type: "get-well" },
    { id: 55, image: Images.well9, card_label: "latest", type: "get-well" },
    { id: 56, image: Images.well10, card_label: "trending", type: "get-well" },
    // sympathy
    {
      id: 57,
      image: Images.sympathy1,
      card_label: "trending",
      type: "sympathy",
    },
    {
      id: 58,
      image: Images.sympathy2,
      card_label: "trending",
      type: "sympathy",
    },
    { id: 59, image: Images.sympathy3, card_label: "latest", type: "sympathy" },
    {
      id: 60,
      image: Images.sympathy4,
      card_label: "trending",
      type: "sympathy",
    },
    { id: 61, image: Images.sympathy5, card_label: "latest", type: "sympathy" },
    {
      id: 62,
      image: Images.sympathy6,
      card_label: "trending",
      type: "sympathy",
    },
    {
      id: 63,
      image: Images.sympathy7,
      card_label: "trending",
      type: "sympathy",
    },
    {
      id: 64,
      image: Images.sympathy8,
      card_label: "trending",
      type: "sympathy",
    },
    { id: 65, image: Images.sympathy9, card_label: "latest", type: "sympathy" },
    {
      id: 66,
      image: Images.sympathy10,
      card_label: "trending",
      type: "sympathy",
    },
    // teacher
    { id: 67, image: Images.teacher1, card_label: "trending", type: "teacher" },
    { id: 68, image: Images.teacher2, card_label: "trending", type: "teacher" },
    { id: 69, image: Images.teacher3, card_label: "latest", type: "teacher" },
    { id: 70, image: Images.teacher4, card_label: "trending", type: "teacher" },
    { id: 71, image: Images.teacher5, card_label: "latest", type: "teacher" },
    { id: 72, image: Images.teacher6, card_label: "trending", type: "teacher" },
    { id: 73, image: Images.teacher7, card_label: "trending", type: "teacher" },
    { id: 74, image: Images.teacher8, card_label: "trending", type: "teacher" },
    { id: 75, image: Images.teacher9, card_label: "latest", type: "teacher" },
    {
      id: 76,
      image: Images.teacher10,
      card_label: "trending",
      type: "teacher",
    },
    // thanks
    {
      id: 67,
      image: Images.thanks1,
      card_label: "trending",
      type: "thank-you",
    },
    {
      id: 68,
      image: Images.thanks2,
      card_label: "trending",
      type: "thank-you",
    },
    { id: 69, image: Images.thanks3, card_label: "latest", type: "thank-you" },
    {
      id: 70,
      image: Images.thanks4,
      card_label: "trending",
      type: "thank-you",
    },
    { id: 71, image: Images.thanks5, card_label: "latest", type: "thank-you" },
    {
      id: 72,
      image: Images.thanks6,
      card_label: "trending",
      type: "thank-you",
    },
    {
      id: 73,
      image: Images.thanks7,
      card_label: "trending",
      type: "thank-you",
    },
    {
      id: 74,
      image: Images.thanks8,
      card_label: "trending",
      type: "thank-you",
    },
    { id: 75, image: Images.thanks9, card_label: "latest", type: "thank-you" },
    {
      id: 76,
      image: Images.thanks10,
      card_label: "trending",
      type: "thank-you",
    },
    // thanks
    {
      id: 77,
      image: Images.retirement1,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 78,
      image: Images.retirement2,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 79,
      image: Images.retirement3,
      card_label: "latest",
      type: "retirement",
    },
    {
      id: 80,
      image: Images.retirement4,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 81,
      image: Images.retirement5,
      card_label: "latest",
      type: "retirement",
    },
    {
      id: 82,
      image: Images.retirement6,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 83,
      image: Images.retirement7,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 84,
      image: Images.retirement8,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 85,
      image: Images.retirement9,
      card_label: "latest",
      type: "retirement",
    },
    {
      id: 86,
      image: Images.retirement10,
      card_label: "trending",
      type: "retirement",
    },
    // congratulations
    {
      id: 87,
      image: Images.congratulations1,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 88,
      image: Images.congratulations2,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 89,
      image: Images.congratulations3,
      card_label: "latest",
      type: "congratulations",
    },
    {
      id: 90,
      image: Images.congratulations4,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 91,
      image: Images.congratulations5,
      card_label: "latest",
      type: "congratulations",
    },
    {
      id: 92,
      image: Images.congratulations6,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 93,
      image: Images.congratulations7,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 94,
      image: Images.congratulations8,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 95,
      image: Images.congratulations9,
      card_label: "latest",
      type: "congratulations",
    },
    {
      id: 96,
      image: Images.congratulations10,
      card_label: "trending",
      type: "congratulations",
    },
  ];

  const cardLabel = params.slug[1];
  console.log(type, "tyjgjgjgjgpe");

  const filteredCards = array.filter(
    (card) =>
      card.type === type &&
      (cardLabel === "trending"
        ? card.card_label === "trending"
        : cardLabel === "latest"
        ? card.card_label === "latest"
        : true)
  );

  return (
    <div className=" bg-lightBg py-12">
      <div className="container-fluid">
        <div className="md:flex md:space-x-3 md:space-y-0 space-y-6 ">
          <Sidebar urlValue={params?.slug[0]} cardLabel={cardLabel} response={data1} />
          <main className="flex-1  md:pl-3">
            <div className="flex md:justify-between md:items-center mb-6 md:flex-row  flex-col-reverse  justify-start ">
              <h2 className="xl:text-4xl  md:text-lg text-md font-semibold justify-center items-cente mt-3">
                Pick a <span className="capitalize">{params?.slug[0]}</span>{" "}
                Card Design
              </h2>
              <CollectionFilter />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-6 min_gap">
              {/* {cardData.data.map((card, index) => (
                <Card item={card} index={index} />
              ))} */}
              {/* {data?.map((card:any, index:number) => (
              console.log(card,"carddddddd")
              
                // <Card item={card} index={index} key={index}/>
              ))} */}
              {response?.data?.map((card: any) => {
                  console.log(card, "sdfsdfcarddddddd");

                  // Assuming card has a unique id field
                  return <Card item={card} index={card.id} key={card.id} />;
                })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CardCollection;
