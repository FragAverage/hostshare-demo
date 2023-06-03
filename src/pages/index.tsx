import React from "react";

import SkeletonTile from "@/components/SkeletonTile";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Tile from "@/components/Tile";
import Constants from "@/utils/constants";
import { GetServerSideProps } from "next";
import axios from "axios";

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

  const RefIsFetching = React.useRef(false);

  // React.useEffect(() => {
  //   const FetchAsync = async () => {
  //     // fetch from /api/listings/get
  //     const res = await axios.get("/api/listings/get");
  //     const data = await res.data;
  //     console.log(data.source)
  //     SetState(prev => ({
  //       ...prev,
  //       IsFetching: false,
  //       Data: data,
  //     }))
  //     RefIsFetching.current = false;
  //   }

  //   if(State.IsFetching && !RefIsFetching.current){
  //     RefIsFetching.current = true;
  //     FetchAsync();
  //   }
  // }, [State.IsFetching]);

  return (
    <div>
      <Header />
      {/* <Banner /> */}

      <main className="max-w-screen-2xl mx-auto px-4 md:px-16 mb-20">
        <section className="pt-6">
          {/* Get data from server */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-4">
            {State.Data?.data ? State.Data?.data.filter((item: Listing) => item.info.available).slice(0, 20).map((item: Listing, index) => (
              <Tile
                key={index}
                Listing={item}
                />
            )) : (
              // TODO: Do this correctly - this is a hack
              <>
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
                <SkeletonTile />
              </>
              )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios.get(`${Constants.WebHost}/api/listings/get`).then(res => res.data)

  return {
    props: {
      Data: response,
    },
  };
}