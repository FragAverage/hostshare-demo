import React from 'react'
import Link from 'next/link'
import { Dayjs } from 'dayjs'
import { useRouter } from 'next/router'
import { DateRangePicker } from 'react-date-range'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMagnifyingGlass, faMultiply, faSliders } from '@fortawesome/free-solid-svg-icons'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import DayJS from '@/utils/dayjs'

type Props = {
  ListingPageView?: boolean;
}

type SearchState = {
  IsOpen: boolean,
  Location: string;
  StartDate: Dayjs;
  EndDate: Dayjs;
  NoOfGuests: number;
  ActiveSection: 'Where' | 'When' | 'Who'
}

const Search = (props: Props) => {
  const [State, SetState] = React.useState<SearchState>({
    IsOpen: false,
    ActiveSection: 'Where',
    Location: 'United States',
    StartDate: DayJS(),
    EndDate: DayJS().add(2, 'days'),
    NoOfGuests: 1,
  })

  const Router = useRouter();

  const HandleOpen = () => {
    SetState(prev => ({
      ...prev,
      IsOpen: true
    }))
  }

  const HandleClose = () => {
    SetState(prev => ({
      ...prev,
      IsOpen: false
    }))
  }

  const OnClickSection = (section: 'Where' | 'When' | 'Who') => {
    SetState(prev => ({
      ...prev,
      ActiveSection: section
    }))
  }

  const HandleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetState(prev => ({
      ...prev,
      Location: e.target.value
    }))
  }

  const HandleDateSelect = (ranges: any) => {
    if(!ranges.selection.startDate || !ranges.selection.endDate) return console.error('No selection');

    console.log(ranges.selection.startDate, ranges.selection.endDate)

    const StartDate = DayJS(ranges.selection.startDate)
    const EndDate = DayJS(ranges.selection.endDate)

    SetState(prev => ({
      ...prev,
      StartDate,
      EndDate
    }))
  }

  const HandleSearch = () => {
    SetState(prev => ({
      ...prev,
      IsOpen: false
    }))

    Router.push({
      pathname: "/search",
      query: {
        location: State.Location,
        startDate: State.StartDate.toISOString(),
        endDate: State.EndDate.toISOString(),
        noOfGuests: State.NoOfGuests,
      },
    });
  }

  const HandleClickNext = () => {
    SetState(prev => ({
      ...prev,
      ActiveSection: prev.ActiveSection === 'Where' ? 'When' : "Who"
    }))
  }

  return (
    <>
      <div className='flex flex-row w-full justify-between items-center border border-gray-200 rounded-full px-4 py-1 shadow-md'>
        {props.ListingPageView ? (
          <Link href="/" prefetch={false} legacyBehavior>
            <div className='flex'><FontAwesomeIcon icon={faChevronLeft} className='w-4 h-4'/></div>
          </Link>
        ) : (
          <div className='flex'><FontAwesomeIcon icon={faMagnifyingGlass} className='w-4 h-4' /></div>
        )}
        <div className='flex flex-col ml-3 w-full' onClick={HandleOpen}>
          <div className='flex text-sm font-semibold'>Anywhere</div>
          <div className='flex text-sm font-light'>Any week · Add guests</div>
        </div>
        <div className='flex'><FontAwesomeIcon icon={faSliders} className='w-3 h-3 rounded-full border border-gray-300 p-2 cursor-pointer' /></div>
      </div>
      {State.IsOpen && (
        <div className='fixed top-0 left-0 w-full bg-gray-950 bg-opacity-80 h-full z-50'>
          <div className='w-full h-full md:w-3/4 md:h-3/4 mx-auto bg-gray-100 relative sm:rounded-b-xl'>
            <div className='relative w-full h-max p-4'>
              <FontAwesomeIcon icon={faMultiply} className='w-4 h-4 top-6 right-6 border-2 p-2 rounded-full cursor-pointer hover:text-primary' onClick={HandleClose} />
              
              {State.ActiveSection === 'Where' ? (
                <div className='bg-white mt-4 p-4 rounded-xl'>
                  <h2 className='text-xl font-semibold'>Where to?</h2>
                  <div className='flex flex-row items-center px-4 py-3 border mt-2 border-gray-300 rounded-md w-full'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className=' w-4 h-4' />
                    <input type='text' className='ml-2 w-full active:border-none focus:outline-none' value={State.Location} onChange={HandleLocationInputChange} />
                  </div>
                </div> 
              ) : (
                <div className='bg-white mt-4 p-4 rounded-xl flex flex-row justify-between items-center' onClick={() => OnClickSection("Where")}>
                  <h2 className='text-xl font-semibold'>Where to?</h2>
                  <p className='text-base font-light'>{State.Location}</p>
                </div>
              )}

              {State.ActiveSection === 'When' ? (
                <div className='bg-white mt-4 p-4 rounded-xl w-full'>
                  <h2 className='text-xl font-semibold'>When?</h2>
                  <div className='flex flex-row items-center px-4 py-3 mt-2 justify-center rounded-md w-full'>
                    <DateRangePicker
                      ranges={[{startDate: new Date(State.StartDate.format('MM/DD/YYYY')), endDate: new Date(State.EndDate.format('MM/DD/YYYY')), key: 'selection'}]}
                      minDate={new Date()}
                      rangeColors={["#329a9a"]}
                      onChange={HandleDateSelect}
                      staticRanges={[]}
                      inputRanges={[]}
                      showDateDisplay={false}
                      showPreview={true}
                      displayMode="dateRange" 
                      className='w-max'
                    />
                  </div>
                </div>
              ) : (
                <div className='bg-white mt-4 p-4 rounded-xl flex flex-row justify-between items-center' onClick={() => OnClickSection("When")}>
                  <h2 className='text-xl font-semibold'>When?</h2>
                  <p className='text-base font-light'>{State.StartDate.format('MM/DD/YYYY')} - {State.EndDate.format("MM/DD/YYYY")}</p>
                </div>
              )}

              {State.ActiveSection === 'Who' ? (
                <div className='bg-white mt-4 p-4 rounded-xl'>
                  <h2 className='text-xl font-semibold'>Who&apos;s coming?</h2>
                  <div className='flex flex-row items-center border-b justify-between px-4 py-3 mt-2 w-full'>
                    <div className="flex flex-col">
                      <span>Adults</span>
                      <span>Ages 13 or above</span>
                    </div>
                    <div className='flex flex-row items-center'>
                      <button className='w-8 h-8 border border-gray-300 rounded-full'>-</button>
                      <span className='mx-2'>1</span>
                      <button className='w-8 h-8 border border-gray-300 rounded-full'>+</button>
                    </div>
                  </div>
                  <div className='flex flex-row items-center border-b justify-between px-4 py-3 mt-2 w-full'>
                    <div className="flex flex-col">
                      <span>Children</span>
                      <span>Ages 2-12</span>
                    </div>
                    <div className='flex flex-row items-center'>
                      <button className='w-8 h-8 border border-gray-300 rounded-full'>-</button>
                      <span className='mx-2'>0</span>
                      <button className='w-8 h-8 border border-gray-300 rounded-full'>+</button>
                    </div>
                  </div>
                  <div className='flex flex-row items-center justify-between px-4 py-3 mt-2 w-full'>
                    <div className="flex flex-col">
                      <span>Infants</span>
                      <span>Under 2</span>
                    </div>
                    <div className='flex flex-row items-center'>
                      <button className='w-8 h-8 border border-gray-300 rounded-full'>-</button>
                      <span className='mx-2'>0</span>
                      <button className='w-8 h-8 border border-gray-300 rounded-full'>+</button>
                    </div>
                  </div>
                </div> 
              ) : (
                <div className='bg-white mt-4 p-4 rounded-xl flex flex-row justify-between items-center' onClick={() => OnClickSection("Who")}>
                  <h2 className='text-xl font-semibold'>Who?</h2>
                  <p className='text-base font-light'>{State.NoOfGuests} guest(s)</p>
                </div>
              )}
            </div>

            <div className='fixed sm:absolute bottom-0 left-0 w-full h-16 bg-gray-100 border-t rounded-b-xl border-gray-300 flex flex-row items-center justify-between px-4'>
              <button className='w-full bg-primary text-white rounded-md p-2 hover:bg-primary/80' onClick={() => State.ActiveSection === 'Who' ? HandleSearch() : HandleClickNext()}>
                {State.ActiveSection === 'Who' ? (
                  <>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='w-4 h-4 mr-2' />
                    Search
                  </>
                ) : (
                  <>
                    Next
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Search