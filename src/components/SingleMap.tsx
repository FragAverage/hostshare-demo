import React from 'react'
import ReactMapGL, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  lat: number;
  long: number;
}

const SingleMap = (props: Props) => {

  const [viewport, setViewport] = React.useState({
    latitude: props.lat,
    longitude: props.long,
    zoom: 12
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/fragaverage/cks1m8xvm23x117pdb9phbdoz"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
      reuseMaps
      {...viewport}
      
      // onMove={(e) => setViewport(prev => ({
      //   ...prev,
      //   longitude: e.viewState.longitude,
      //   latitude: e.viewState.latitude,
      // }))}
    >
      <Marker longitude={props.long} latitude={props.lat} anchor="center" />
    </ReactMapGL>
  )
}

export default SingleMap