import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./component/Header/Header";
import List from "./component/List/List";
import Map from "./component/Map/Map";
import { getPlaceData } from "./Api";

import { React, useState, useEffect } from "react";

function App() {
  const [placeData, setPlaceData] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [child, setChild] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(1);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [autoComplete, setAutoComplete] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCoordinates({ lat: latitude, lng: longitude })
    );
  }, []);

  useEffect(() => {
    const filteredPlace = placeData.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlace);
  }, [rating, placeData]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlaceData(bounds.sw, bounds.ne, type).then((data) => {
        setPlaceData(
          data?.filter((place) => place.name && place.num_reviews > 0)
        );

        setFilteredPlaces([]);

        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutoComplete(autoC);

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />

      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : placeData}
            child={child}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : placeData}
            setChild={setChild}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
