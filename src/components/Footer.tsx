import React from "react";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FooterProps = {
  ListingPage?: boolean;
  Price?: string;
  DateRange?: string;
};

const Footer = (props: FooterProps) => {
  return (
    <>
        {props.ListingPage ? (
          <>
          <div className="sm:hidden fixed bottom-0 z-30 bg-white shadow-md border-t p-5 md:px-10 w-full">
            <div className="max-w-screen-xl mx-auto font-light">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <div className="flex flex-row"> 
                  <span className="font-semibold mr-1">${props.Price}</span> 
                  night
                  </div>
                  <span className="text-sm underline font-semibold">{props.DateRange}</span>
                </div>
                <div className="flex flex-row items-center w-1/3">
                <button className='w-full bg-primary text-white rounded-md p-2 hover:bg-primary/80'>
                  Reserve
                </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block bottom-0 z-30 bg-white shadow-md border-t p-5 md:px-10 w-full">
            <div className="max-w-screen-xl mx-auto font-light">
              <div className="flex flex-row justify-between items-center">
                <div className="flex">&copy; 2023 Hostshare, Inc.</div>
                <div className="flex flex-row items-center">
                  <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
                  <span className="ml-2">English (US)</span>
                </div>
              </div>
            </div>
          </div>
          </>
        ) : (
          <div className="fixed bottom-0 z-30 bg-white shadow-md border-t p-5 md:px-10 w-full">
            <div className="max-w-screen-xl mx-auto font-light">
              <div className="flex flex-row justify-between items-center">
                <div className="flex">&copy; 2023 Hostshare, Inc.</div>
                <div className="flex flex-row items-center">
                  <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
                  <span className="ml-2">English (US)</span>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Footer;
