import React from 'react'
import Image from 'next/legacy/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type MobileImageCarouselProps = {
  Images: ListingImage[];
}

type MobileImageCarouselState = {
  CurrentImage: number;
}

const MobileImageCarousel = (props: MobileImageCarouselProps) => {
  const [State, SetState] = React.useState<MobileImageCarouselState>({
    CurrentImage: 0,
  });

  return (
    <div className='w-screen h-64 relative' onDrag={() => console.log("drag")}>
      {/* Image with mobile interactivity */}
      <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={(a) => SetState(prev => ({...prev, CurrentImage: a.activeIndex}))}
      className='w-full h-full'
    >
      {props.Images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            alt=""
            src={image.url}
            layout='fill'
            objectFit='cover'
          />
        </SwiperSlide>
        ))}
      </Swiper>

      <div className='absolute z-10 bottom-3 right-3 text-[11px] text-white bg-slate-900/90 rounded-md px-2 py-0.5 font-semibold'>
        {State.CurrentImage + 1} / {props.Images.length}
      </div>
    </div>
  )
}

export default MobileImageCarousel