import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";

import Constants from "@/utils/constants";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Tile from "@/components/Tile";

type Props = {
  Data: Listings;
}

type HomeState = {
  IsFetching: boolean;
  Data?: Listings;
}

export default function Home(props: Props) {
  const [State, SetState] = React.useState<HomeState>({
    IsFetching: true,
    Data: props.Data
  });

  return (
    <div>
      <Header />
      {/* <Banner /> */}

      <main className="max-w-screen-2xl mx-auto px-4 md:px-16 mb-20">
        <section className="pt-6">
          {/* Get data from server */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-4">
            {State.Data?.data && State.Data?.data.filter((item: Listing) => item.info.available).slice(0, 20).map((item: Listing, index) => (
              <Tile
                key={index}
                Listing={item}
                />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`${Constants.WebHost}/api/listings/get`).then(res => res.data)

  return {
    props: {
      Data: response,
    },
  };
}