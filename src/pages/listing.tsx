import React from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faArrowRight,
  faCalendarAlt, 
  faCheck, 
  faChevronLeft, 
  faDoorClosed,
  faGripVertical, 
  faHeart, 
  faLocationArrow, 
  faMedal, 
  faMultiply, 
  faShare, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';

import MobileImageCarousel from '@/components/MobileImageCarousel';
import BookingWidget from '@/components/BookingWidget';
import FeatureRow from '@/components/FeatureRow';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import pricing from '@/utils/pricing';
import DayJS from '@/utils/dayjs';

type ListingPageProps = {
  Listing: Listing;
}

type ListingPageState = {
  ImageModalOpen: boolean;
  ShowMore: boolean;
  SelectedImageId: number;
}

const ListingPage = ({ Listing }: ListingPageProps) => {
  const [State, SetState] = React.useState<ListingPageState>({
    ImageModalOpen: false,
    ShowMore: false,
    SelectedImageId: 0,
  })

  const Router = useRouter();

  const SingleMap = dynamic(() => import('@/components/SingleMap'), {
    ssr: false
  });

  const OnCloseModal = () => {
    if(!State.ImageModalOpen) return
    SetState({ ...State, ImageModalOpen: false })
  }

  const GetBedrooms = () => {
    const bedrooms = Listing.info.details.data.filter((detail) => detail.type === 'bedroom' || detail.type === 'bedrooms')
    if(bedrooms.length === 0) return 0
    return bedrooms[0].value
  }

  const GetBeds = () => {
    const beds = Listing.info.details.data.filter((detail) => detail.type === 'bed' || detail.type === 'beds')
    if(beds.length === 0) return 0
    return beds[0].value
  }

  const GetBathrooms = () => {
    const baths = Listing.info.details.data.filter((detail) => detail.type === 'bath' || detail.type === 'baths')
    if(baths.length === 0) return 0
    return baths[0].value
  }

  const Description = React.useMemo(() => {
    if(State.ShowMore) return Listing.info.description.split('\n')

    const description = Listing.info.description.split('\n')
    if(description.length <= 3) return description

    return description.slice(0, 3)
  }, [Listing.info.description, State.ShowMore]);

  const ProcessDescription = (description: string) => {
    const regex = /(\*\*|__)(.*?)\1/g
    const matches = description.match(regex)
    if(!matches) return (
      <span>{description}</span>
    )

    matches.forEach((match) => {
      const text = match.replace(/\*\*/g, '').replace(/__/g, '')
      description = text
    })

    return <span className='font-semibold'>{description}</span>
  }

  const ToggleShowMore = () => {
    SetState({ ...State, ShowMore: !State.ShowMore })
  }

  const CheckInDate = React.useMemo(() => {
    // get from start date in query
    const { startdate } = Router.query
    if(!startdate) return undefined

    const startDate = Array.isArray(startdate) ? startdate[0] : startdate
    return startDate
  }, [Router.query])

  const CheckOutDate = React.useMemo(() => {
    // get from start date in query
    const { enddate } = Router.query
    if(!enddate) return undefined

    const endDate = Array.isArray(enddate) ? enddate[0] : enddate
    return endDate
  }, [Router.query])

  const FinalCheckIn = CheckInDate ? DayJS(CheckInDate).format('MM/DD/YYYY') : DayJS().format('MM/DD/YYYY')
  const FinalCheckOut = CheckOutDate ? DayJS(CheckOutDate).format('MM/DD/YYYY') : DayJS().add(2, 'days').format('MM/DD/YYYY')

  const OnNextImage = React.useCallback(() => {
    if(State.SelectedImageId === Listing.info.images.data.length){
      SetState(prev => ({
        ...prev,
        SelectedImageId: 0
      }))
    }else{
      SetState({ ...State, SelectedImageId: State.SelectedImageId + 1 })
    }
  }, [Listing.info.images.data.length, State])

  const OnPrevImage = React.useCallback(() => {
    if(State.SelectedImageId === 0){
      SetState(prev => ({
        ...prev,
        SelectedImageId: Listing.info.images.data.length - 1
      }))
    }else{
      SetState({ ...State, SelectedImageId: State.SelectedImageId - 1 })
    }
  }, [Listing.info.images.data.length, State]);

  const HandleGoBack = () => {
    Router.back()
  }

  const CalculateNights = () => {
    const CheckInDate = DayJS(FinalCheckIn)
    const CheckOutDate = DayJS(FinalCheckOut)
    return CheckOutDate.diff(CheckInDate, 'days')
  }

  const Pricing = () => {
    return pricing({
      Nights: CalculateNights(),
      PricePerNight: Listing.info.price,
    })
  }

  return (
    <div>
      <Header HideOnMobile />

      <main className="max-w-screen-xl mx-auto relative mb-10" onClick={OnCloseModal}>
        {/* Title Bar */}
        <section className="md:pt-6 md:px-2">
          {/* MOBILE ONLY IMAGE SECTION */}
          <div className='flex md:hidden top-0 left-0 relative'>
            <MobileImageCarousel Images={Listing.info.images.data} />
            <div className='absolute z-10 top-3 left-3'>
              <FontAwesomeIcon icon={faChevronLeft} className='text-black bg-white shadow-sm rounded-full p-2 hover:text-primary w-4 h-4' onClick={HandleGoBack} />
            </div>
          </div>
          <h1 className='hidden md:block text-2xl'>{Listing.info.title}</h1>
          <div className='flex flex-row justify-between mt-2'>
            <div className="hidden md:flex flex-row items-center">
              <div className="flex flex-row items-center">
                <FontAwesomeIcon icon={faStar} className="text-black w-4 h-4 mr-1" />
                {Listing.info.ratings.guestSatisfactionOverall.toFixed(1)}
              </div>
              <div className='flex mx-2'>·</div>
              <div className="flex flex-row items-center underline">
                {Listing.info.visibleReviewCount} Reviews
              </div>
              {Listing.info.host?.isSuperhost && (
                <>
                  <div className='flex mx-2'>·</div>
                  <div className="flex flex-row items-center font-light">
                    <FontAwesomeIcon icon={faMedal} className="text-black w-4 h-4 mr-1 mt-1" />
                    Superhost
                  </div>
                </>
              )}
              <div className='flex mx-2'>·</div>
              <div className="flex flex-row items-center underline">
                {Listing.info.location.city}, {Listing.info.location.country.code}
              </div>
            </div>
            <div className="hidden md:flex flex-row items-center space-x-6 text-sm">
              <div className="flex flex-row items-center underline">
                <FontAwesomeIcon icon={faShare} className="text-black w-4 h-4 mr-1 mt-1" />
                Share
              </div>
              <div className="flex flex-row items-center underline">
                <FontAwesomeIcon icon={faHeart} className="text-black w-4 h-4 mr-1 mt-1" />
                Save
              </div>
            </div>
          </div>
        </section>
        {/* Images */}
        <section className="hidden md:block pt-2">
          <div className='flex flex-row h-[500px] relative'>
            <div className='flex w-1/2 p-2'>
              <Image
                alt=""
                src={Listing.info.mainImage.url}
                width={700}
                height={700}
                className="rounded-l-xl"
                objectFit="cover"
              />
            </div>
            <div className='flex flex-col w-1/4 py-2 mr-2 space-y-6 gap-2'>
              <Image
                alt=""
                src={Listing.info.images.data[2].url}
                width={400}
                height={400}
                objectFit="cover"
              />
              <Image
                alt=""
                src={Listing.info.images.data[3].url}
                width={400}
                height={400}
                objectFit="cover"
              />
            </div>
            <div className='flex flex-col w-1/4 py-2 space-y-6 gap-2'>
              <Image
                alt=""
                src={Listing.info.images.data[4].url}
                width={600}
                height={600}
                className="rounded-r-xl"
                objectFit="cover"
              />
              <Image
                alt=""
                src={Listing.info.images.data[5].url}
                width={600}
                height={600}
                className="rounded-r-xl"
                objectFit="cover"
              />
            </div>
            <div className='absolute bottom-10 right-10'>
              {/* Button to open modal */}
              <div className='flex flex-row items-center bg-white rounded-md px-3 py-1 text-sm font-semibold border-black border cursor-pointer hover:bg-gray-100' onClick={() => SetState({ ...State, ImageModalOpen: true })}>
                <FontAwesomeIcon icon={faGripVertical} className="text-black w-4 h-4 mr-2" />
                Show all photos
              </div>
            </div>
          </div>
        </section>
        {/* Details */}
        <section className='pt-6 px-2 relative'>
          <div className="flex flex-row">
            <div className='w-full md:w-4/6 pb-10'>
              {/* MOBILE ONLY TITLE */}
              <div className='flex md:hidden flex-row justify-between mb-4'>
                <div className="flex flex-col">
                  <h2 className='text-4xl mb-4'>{Listing.info.title}</h2>
                  <div className='flex'>
                    <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faStar} className="text-black w-4 h-4 mr-1" />
                    {Listing.info.ratings.guestSatisfactionOverall.toFixed(1)}
                  </div>
                  <div className='flex mx-2'>·</div>
                  <div className="flex flex-row items-center underline">
                    {Listing.info.visibleReviewCount} Reviews
                  </div>
                  {Listing.info.host?.isSuperhost && (
                    <>
                      <div className='flex mx-2'>·</div>
                      <div className="flex flex-row items-center font-light">
                        <FontAwesomeIcon icon={faMedal} className="text-black w-4 h-4 mr-1 mt-1" />
                        Superhost
                      </div>
                    </>
                  )}
                  <div className='flex mx-2'>·</div>
                  <div className="flex flex-row items-center underline">
                    {Listing.info.location.city}, {Listing.info.location.country.code}
                  </div>
                      {/* {Listing.info.maxGuestCapacity} guests · {GetBedrooms()} bedrooms · {GetBeds()} beds · {GetBathrooms()} baths */}
                    </div>
                  </div>
                </div>
                <div className='mx-auto md:hidden w-full md:w-[95%] border-b my-4'></div>

                <div className='flex flex-row justify-between md:mr-10'>
                <div className="flex flex-col">
                  <h2 className='text-2xl font-semibold'>{Listing.info.type.charAt(0).toUpperCase()}{Listing.info.type.slice(1)} hosted by {Listing.info.host.name}</h2>
                  <div>
                    {Listing.info.maxGuestCapacity} guests · {GetBedrooms()} bedrooms · {GetBeds()} beds · {GetBathrooms()} baths
                  </div>
                </div>
                {/* Host Image */}
                <div className="flex flex-col">
                  <Image
                    alt=""
                    src={Listing.info.host.avatar.url}
                    width={75}
                    height={75}
                    className="rounded-full"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className='hidden md:block mx-auto w-full md:w-[95%] border-b my-4'></div>
              {/* Features */}
              <div className='hidden md:flex flex-col space-y-5'>
                <FeatureRow 
                  Icon={faDoorClosed}
                  Text="Self Check-in"
                  SubText='Check yourself in with the keypad'
                  />
                <FeatureRow 
                  Icon={faCalendarAlt}
                  Text="Free cancellation for 48 hours"
                  />
                <FeatureRow 
                  Icon={faLocationArrow}
                  Text="Great location"
                  SubText='100% of recent guests gave the location a 5-star rating'
                />
              </div>
              <div className='mx-auto w-full md:w-[95%] border-b my-4'></div>
              {/* Description */}
              <div className='flex flex-col space-y-4 w-[95%]'>
                {Description.map((item, i) => {
                  return (
                    ProcessDescription(item)
                  )}
                )}

                {!State.ShowMore ? (
                  <div className='flex flex-row items-center cursor-pointer' onClick={ToggleShowMore}>
                    <span className='flex underline'>Show More</span>
                    <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4 ml-1' />
                  </div>
                ) : (
                  <div className='flex flex-row items-center cursor-pointer' onClick={ToggleShowMore}>
                    <span className='flex underline'>Show Less</span>
                    <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4 ml-1' />
                  </div>
                )}
              </div>
              <div className='mx-auto w-[95%] border-b my-4'></div>
              {/* Amenities */}
              <div className='flex flex-col space-y-4 w-[95%]'>
                <h2 className='text-xl font-semibold'>What this place offers</h2>
                <div className='flex flex-row flex-wrap'>
                  {Listing.info.amenities.data.map((item, i) => {
                    return (
                      <div className='flex flex-row items-center bg-white rounded-md px-3 py-1 text-sm font-semibold border-black border mr-2 mb-2' key={i}>
                        <FontAwesomeIcon icon={item.available ? faCheck : faMultiply } className="text-black w-4 h-4 mr-2" />
                        {item.title}
                      </div>
                    )}
                  )}
                </div>
              </div>
              {/* MAP */}
              <div className='mx-auto w-[95%] border-b my-4'></div>
              <div className='flex flex-col w-[95%] h-[300px] md:h-[600px] relative'>
                <h2 className='text-xl font-semibold'>Where you&apos;ll be</h2>
                <span className='mb-4 font-light'>{Listing.info.location.city}, {Listing.info.location.country.title}</span>
                <SingleMap lat={Listing.info.location.lat} long={Listing.info.location.long} />
              </div>
            </div>
            {/* Sticky Booking Widget */}
            <div className='hidden md:block w-2/6'>
              <div className='sticky top-32 right-0'>
                <BookingWidget 
                  Listing={Listing}
                  CheckIn={FinalCheckIn}
                  CheckOut={FinalCheckOut}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer 
        ListingPage 
        DateRange={`${DayJS(FinalCheckIn).format('DD MMM')}-${DayJS(FinalCheckOut).format('DD MMM')}`}
        Price={Listing.info.price.toFixed(2)}
      />

      {State.ImageModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'>
          <div className='flex flex-row justify-center items-center h-full'>
            <div className='flex flex-col w-3/4 h-3/4 bg-white rounded-md relative'>
              {/* Image Carousel */}
              <div className='flex flex-row justify-between items-center'>
                <FontAwesomeIcon icon={faArrowLeft} className="text-primary w-6 h-6 absolute top-1/2 left-5 cursor-pointer z-10 hover:text-gray-400" onClick={OnPrevImage} />
                <FontAwesomeIcon icon={faArrowRight} className="text-primary w-6 h-6 absolute top-1/2 right-5 cursor-pointer z-10 hover:text-gray-400" onClick={OnNextImage}/>
              </div>
              <div className='w-[75%] h-[75%] relative mx-auto my-auto'>
                <Image
                  alt=""
                  src={Listing.info.images.data[State.SelectedImageId].url}
                  layout='fill'
                  objectFit="contain"
                  quality={100}
                />
              </div>

              {/* Dots */}
              <div className='flex flex-row justify-center items-center absolute bottom-5 w-full'>
                {Listing.info.images.data.map((item, i) => {
                  return (
                    <div className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${State.SelectedImageId === i ? 'bg-primary' : 'bg-gray-400'}`} key={i}></div>
                  )}
                )}
              </div>

              <div className='absolute top-0 right-0'>
                <FontAwesomeIcon icon={faMultiply} className="text-primary w-6 h-6 absolute top-5 right-5 cursor-pointer hover:text-gray-400" onClick={OnCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListingPage

export const getServerSideProps: GetServerSideProps<ListingPageProps> = async (context: any) => {
  // get id from url query
  const { id } = context.query;

  // fetch listing data from /api/listings/get
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/listings/single?id=${id}`).then(res => res.json());

  return {
    props: {
      Listing: res[0]
    }
  }
}