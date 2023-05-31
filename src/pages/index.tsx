import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import React from "react";
import { IfStatement } from "typescript";
import Tile from "@/components/Tile";
import SkeletonTile from "@/components/SkeletonTile";

type HomeState = {
  IsFetching: boolean;
  Data?: Listings;
}

export default function Home() {
  const [State, SetState] = React.useState<HomeState>({
    IsFetching: true,
  });

  const RefIsFetching = React.useRef(false);

  React.useEffect(() => {
    const FetchAsync = async () => {
      // fetch from /api/listings/get
      const res = await fetch("/api/listings/get");
      const data = await res.json();
      console.log(data.source)
      SetState(prev => ({
        ...prev,
        IsFetching: false,
        Data: data,
      }))
      RefIsFetching.current = false;
    }

    if(State.IsFetching && !RefIsFetching.current){
      RefIsFetching.current = true;
      FetchAsync();
    }
  }, [State.IsFetching]);

  return (
    <div>
      <Head>
        <title>Hostshare</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {/* <Banner /> */}

      <main className="max-w-screen-2xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          {/* Get data from server */}
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {State.Data?.data ? State.Data?.data.filter((item: Listing) => item.info.available).slice(0, 20).map((item: Listing, index) => (
              <Tile 
                key={index}
                Listing={item}
                />
            )) : (
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
    </div>
  );
}
