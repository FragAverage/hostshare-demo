import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGlobe, faMagnifyingGlass, faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Search from "./Search";

type Props = {
  placeholder?: string;
  HideOnMobile?: boolean;
  ListingPageView?: boolean;
};

const Header = (props: Props) => {
  const [searchInput, setSearchInput] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [noOfGuests, setNoOfGuests] = React.useState(1);

  const Router = useRouter();

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection?.startDate);
    setEndDate(ranges.selection?.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    Router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header className={`${props.HideOnMobile ? 'hidden md:block' : ''} sticky top-0 z-50 bg-white shadow-md p-5 md:px-10`}>
      <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-3 mx-auto">
        {/* Left */}
        <div
          onClick={() => Router.push("/")}
          className="hidden sm:flex relative items-center h-10 cursor-pointer my-auto"
        >
          <Image
            alt="Hostshare Logo"
            src="/images/logo.png"
            style={{ objectFit: "contain", objectPosition: "left" }}
            fill
          />
        </div>

        {/* middle */}
        {/* <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
          <input
            value={searchInput}
            className="pl-5 bg-transparent flex-grow outline-none text-sm text-gray-600 placeholder-gray-400"
            type="text"
            placeholder={props.placeholder || "Start your search"}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="hidden md:inline-flex h-5 w-5 bg-primary text-white rounded-full p-2 cursor-pointer md:mx-2" />
        </div> */}

        <div className="flex">
          <Search ListingPageView={props.ListingPageView} />
        </div>

        {/* right */}
        <div className="hidden sm:flex items-center space-x-4 justify-end text-gray-500">
          <p className="hidden md:inline cursor-pointer">Become a host</p>
          <FontAwesomeIcon icon={faGlobe} className="h-6 cursor-pointer" />
          <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
            <FontAwesomeIcon
              icon={faBars}
              className="h-6 cursor-pointer"
            />
            <FontAwesomeIcon icon={faUserCircle} className="h-6 cursor-pointer" />
          </div>
        </div>

        {searchInput && (
          <div className="flex flex-col col-span-3 mx-auto mt-5">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#329a9a"]}
              onChange={handleSelect}
              staticRanges={[]}
              inputRanges={[]}
              displayMode="date"
            />
            <div className="flex items-center border-b mb-4">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>

              <FontAwesomeIcon icon={faUsers} className="h-5" />
              <input
                type="number"
                className="w-12 pl-2 text-lg outline-none text-primary"
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(+e.target.value)}
                min={1}
              />
            </div>
            <div className="flex">
              <button onClick={resetInput} className="flex-grow text-gray-500">
                Cancel
              </button>
              <button onClick={search} className="flex-grow text-primary">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
