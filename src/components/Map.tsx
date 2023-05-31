import { faCircleXmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCenter } from "geolib";
import Image from "next/image";
import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

type Props = {
  searchResults: Listing[];
};

type Selection = {
  longitude: number;
  latitude: number;
}

const Map = (props: Props) => {
  const [selectedLocation, setSelectedLocation] = React.useState<Selection>({
    longitude: 0,
    latitude: 0,
  });

  //Transform the search results object
  // from {Lat, Long} to {latitude, longitude}
  const coordinates = props.searchResults.map((result) => ({
    longitude: result.info.location.long,
    latitude: result.info.location.lat,
  }));

  //Get the center of coordinates
  const center = getCenter(coordinates);

  // Set initial values for map viewport
  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: "100%",
    latitude: center ? center.latitude : 0,
    longitude: center? center.longitude : 0,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/fragaverage/cks1m8xvm23x117pdb9phbdoz"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      {...viewport}
      onMove={(e) => setViewport(prev => ({
        ...prev,
        longitude: e.viewState.longitude,
        latitude: e.viewState.latitude,
      }))}
      scrollZoom
    >
      {/* {props.searchResults.map((result) => (
        <div key={result.info.location.long} className="z-0 hover:shadow-lg">
          <Marker
            longitude={result.info.location.long}
            latitude={result.info.location.lat}
            // offsetLeft={-20}
            // offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation({
                longitude: result.info.location.long,
                latitude: result.info.location.lat,
              })}
              className="cursor-pointer text-lg bg-white text-black rounded-full px-3 border-gray-200 border-2"
            >
              {result.info.price.toFixed(2)}
            </p>
          </Marker>
        </div>
      ))} */}
    </ReactMapGL>
  );
};

export default Map;
