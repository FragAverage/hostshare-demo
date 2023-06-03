import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Header from "@/components/Header";
import Tile from "@/components/Tile";
import DayJS from "@/utils/dayjs";
import Constants from "@/utils/constants";

type Props = {
  searchResults: any[];
};

const SearchPage = (props: Props) => {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const realStartDate = Array.isArray(startDate) ? startDate[0] : startDate;
  const realEndDate = Array.isArray(endDate) ? endDate[0] : endDate;

  const formattedStartDate = DayJS(realStartDate).format("DD MMMM YY");
  const formattedEndDate = DayJS(realEndDate).format("DD MMMM YY");

  const range = `${formattedStartDate} to ${formattedEndDate}`;

  const HandleGoBack = () => {
    router.push('/');
  };

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} ListingPageView />
      <main className="flex flex-row">
        {props.searchResults.length > 0 ? (
        <section className="flex flex-col h-screen pt-6 px-6 w-full">
          <p className="text-xs">
            {props.searchResults.length} Stays - {range} - for {noOfGuests}{" "}
            guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          {/* <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms</p>
            <p className="button">More Filters</p>
          </div> */}

          <div className="overflow-scroll scrollbar-hide">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {props.searchResults.map((item: Listing, index) => (
                <Tile key={index} Listing={item} StartDate={realStartDate} EndDate={realEndDate} />
              ))}
            </div>
          </div>
          {/* <section className="hidden lg:flex lg:w-1/2 h-screen">
            <Map searchResults={props.searchResults} />
          </section> */}
        </section>
        ) : (
          <div className="flex flex-col w-full h-full py-10 items-center">
            <div></div>
            Sorry we didnt find any results
            <button className="bg-gray-100 px-4 py-2 mt-4 border border-gray-300 shadow-md rounded-xl" onClick={HandleGoBack}>Go back</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;

export async function getServerSideProps(context: any) {
  const { location } = context.query;

  const searchResults = await fetch(
    `${Constants.WebHost}/api/listings/get?location=${location}`
  ).then((res) => res.json());

  return {
    props: {
      searchResults: searchResults.data.slice(0, 40),
    },
  };
}
