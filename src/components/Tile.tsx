import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import pricing from "@/utils/pricing";
import DayJS from "@/utils/dayjs";

type Props = {
  Listing: Listing;
  StartDate?: string;
  EndDate?: string;
};

const Tile = ({ Listing, StartDate, EndDate }: Props) => {

  const GenerateLink = () => {
    if(!StartDate || !EndDate) return `/listing?id=${Listing.info.id}`;

    return `/listing?id=${Listing.info.id}&startdate=${StartDate}&enddate=${EndDate}`;
  };

  const FinalCheckIn = StartDate ? DayJS(StartDate).format('MM/DD/YYYY') : DayJS().format('MM/DD/YYYY')
  const FinalCheckOut = EndDate ? DayJS(EndDate).format('MM/DD/YYYY') : DayJS().add(2, 'days').format('MM/DD/YYYY')

  const CalculateNights = () => {
    const CheckInDate = DayJS(FinalCheckIn)
    const CheckOutDate = DayJS(FinalCheckOut)
    return CheckOutDate.diff(CheckInDate, 'days')
  }

  const CalculateFee = () => {
    return (Listing.info.price * CalculateNights()).toFixed(2)
  }

  const CalculateCleaningFee  = () => {
    return (Listing.info.price * CalculateNights()/4)
  }

  const CalculateTotalPrice = () => {
    const Nights = CalculateNights() * Listing.info.price
    const CleaningFee = CalculateCleaningFee()
    return (Nights + CleaningFee).toFixed(2)
  }

  return (
    <div className="w-full cursor-pointer">
      <Link href={GenerateLink()}>
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
            <span className="">{Listing.info.currency.symbol}{pricing({PricePerNight: Listing.info.price, Nights: CalculateNights()}).Total} total</span>
          </div>
          <div className="flex flex-row items-start">
            <div className="flex flex-row items-center">
              <FontAwesomeIcon icon={faStar} className="text-black w-4 h-4 mr-1" />
              {Listing.info.ratings.guestSatisfactionOverall.toFixed(1)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Tile;
