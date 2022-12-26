import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { api } from "src/api/country";
import { Appbar } from "src/components/Appbar/Appbar";
import { GoogleMap } from "src/components/GoogleMap/GoogleMap";
import { PopulationChart } from "src/components/PopulationChart/PopulationChart";
import { CountryInterface } from "src/interface/CountryInterface";

function App() {
  const [allCountries, setAllCountries] = useState<CountryInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCountries, setSelectedCountries] = useState<
    CountryInterface[]
  >([]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/v2/all", {
        params: { access_key: process.env.REACT_APP_COUNTRY_API },
      })
      .then((result) => {
        setIsLoading(false);
        setAllCountries(result.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setAllCountries([]);
        console.log(error);
      });
  }, []);

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Appbar
        allCountries={allCountries}
        setSelectedCountries={setSelectedCountries}
      />
      {selectedCountries.length === 0 ? (
        <Grid container sx={{ marginTop: "20px" }} justifyContent="center">
          <Typography variant="h5">There is no selected countries</Typography>
        </Grid>
      ) : (
        <Grid container sx={{ marginTop: "20px" }}>
          <Grid item xs={12} sx={{ padding: "10px" }}>
            <Box sx={{ width: "100%", height: "400px" }}>
              <GoogleMap selectedCountries={selectedCountries} />
              <PopulationChart selectedCountries={selectedCountries} />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default App;
