import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/legacy/image";
import React from "react";

type Props = {
  Listing: Listing;
};

const Tile = ({ Listing }: Props) => {
  return (
    <div className="w-full cursor-pointer">
      <Image
        alt={Listing.info.title}
        src={Listing.info.mainImage.url}
        layout="responsive"
        width={600}
        height={600}
        className="rounded-xl"
        objectFit="cover"
      />
      <div className="flex flex-row justify-between mt-2">
        <div className="flex flex-col">
          <span className="text-base font-bold">
            {Listing.info.location.city}, {Listing.info.location.country.code}
          </span>
          <span className="font-light">
            {Listing.info.location.city}, {Listing.info.location.country.code}
          </span>
          <span className="font-light">
            Individual Host
          </span>
          <span className="">{Listing.info.currency.symbol}{Listing.info.price.toFixed(2)} total</span>
        </div>
        <div className="flex flex-row items-start">
          <div className="flex flex-row items-center">
            <FontAwesomeIcon icon={faStar} className="text-black w-4 h-4 mr-1" />
            {Listing.info.ratings.guestSatisfactionOverall.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tile;
