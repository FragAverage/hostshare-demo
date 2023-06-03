import React from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import pricing from '@/utils/pricing';
import DayJS from '@/utils/dayjs';

type BookingWidgetProps = {
  Listing: Listing;
  CheckIn?: string;
  CheckOut?: string;
}

const BookingWidget = ({ Listing, CheckIn, CheckOut }: BookingWidgetProps) => {

  const CalculateNights = () => {
    const CheckInDate = DayJS(CheckIn)
    const CheckOutDate = DayJS(CheckOut)
    return CheckOutDate.diff(CheckInDate, 'days')
  }

  const Pricing = () => {
    return pricing({
      Nights: CalculateNights(),
      PricePerNight: Listing.info.price,
    })
  }

  return (
    /* Airbnb Style Booking Widget */
    <div className='w-full bg-white shadow rounded-xl shadow-gray-500 p-6'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-end'>
          <span className='text-2xl font-semibold mr-1'>
            ${Listing.info.price}
          </span>
          night
        </div>
        <div className='flex flex-row'>
          <div className="flex flex-row items-center">
            <FontAwesomeIcon icon={faStar} className="text-black w-4 h-4 mr-1" />
            {Listing.info.ratings.guestSatisfactionOverall.toFixed(1)}
          </div>
          <div className='flex mx-2'>·</div>
          <div className="flex flex-row items-center font-light">
            {Listing.info.visibleReviewCount} Reviews
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-4">
        <div className='flex flex-col w-1/2 border border-gray-500 rounded-tl-md p-2 hover:bg-gray-100 cursor-pointer'>
          <span className='uppercase text-xs font-semibold'>Check-in</span>
          <span className='uppercase text-xs font-semibold'>{CheckIn}</span>
        </div>
        <div className='flex flex-col w-1/2 border border-gray-500 border-l-0 rounded-tr-md p-2 hover:bg-gray-100 cursor-pointer'>
          <span className='uppercase text-xs font-semibold'>Checkout</span>
          <span className='uppercase text-xs font-semibold'>{CheckOut}</span>
        </div>
      </div>
      <div className="flex flex-row">
        <div className='flex flex-col w-full border border-gray-500 rounded-b-md p-2 border-t-0 hover:bg-gray-100 cursor-pointer'>
          <span className='uppercase text-xs font-semibold'>Guests</span>
          <span className='text-sm'>1 Guest</span>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <button className='w-full bg-primary text-white rounded-md p-2 mt-4 hover:bg-primary/80'>
          Reserve
        </button>
        <span className='text-sm mt-2'>You won&apos;t be charged yet</span>
      </div>
      <div className='flex flex-row mt-4'>
        <span className='underline'>${Listing.info.price} x {CalculateNights()} nights</span>
        <span className='ml-auto'>${Pricing().SubTotal}</span>
      </div>
      <div className='flex flex-row mt-4'>
        <span className='underline'>Cleaning Fee</span>
        <span className='ml-auto'>${Pricing().CleaningFee}</span>
      </div>
      <div className='w-full px-4 border-b mt-4'></div>
      <div className='flex flex-row mt-4 font-semibold'>
        <span className=''>Total</span>
        <span className='ml-auto'>${Pricing().Total}</span>
      </div>
    </div>
  )
}

export default BookingWidget