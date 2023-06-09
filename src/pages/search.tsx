import React from "react";
import axios from "axios";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Constants from "@/utils/constants";
import Header from "@/components/Header";
import Tile from "@/components/Tile";
import DayJS from "@/utils/dayjs";

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

  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} ListingPageView />
      <main className="flex flex-row">
        {props.searchResults.length > 0 ? (
          <>
            <section className="flex flex-col h-[91.5vh] py-6 px-6 w-full lg:w-1/2">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
                  {props.searchResults.map((item: Listing, index) => (
                    <Tile key={index} Listing={item} StartDate={realStartDate} EndDate={realEndDate} />
                  ))}
                </div>
              </div>
            </section>
            <section className="hidden lg:flex lg:w-1/2 items-start relative">
              <Map searchResults={props.searchResults} />
            </section>
          </>
        ) : (
          <div className="flex flex-col w-full h-full py-10 items-center">
            <div></div>
            Sorry we didnt find any results
            <Link href="/" prefetch={false} legacyBehavior>
              <button className="bg-gray-100 px-4 py-2 mt-4 border border-gray-300 shadow-md rounded-xl">Go back</button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { location } = context.query;

  const searchResults = await axios.get(
    `${Constants.WebHost}/api/listings/search?location=${location}`
  ).then((res) => res.data);

  return {
    props: {
      searchResults: searchResults.data.slice(0, 40),
    }
  };
}
