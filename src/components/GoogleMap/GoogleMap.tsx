import React from "react";
import { Box, Typography } from "@mui/material";
import { Room as RoomIcon } from "@mui/icons-material";
import GoogleMapReact from "google-map-react";
import { CountryInterface } from "src/interface/CountryInterface";

interface LocationPinProps {
  lat: number;
  lng: number;
  text: string;
}

const LocationPin = ({ text }: LocationPinProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <RoomIcon color="secondary" />
      <Typography
        sx={{
          fontSize: 12,
          color: "lightpink",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

interface GoogleMapProps {
  selectedCountries: CountryInterface[];
}

export function GoogleMap({
  selectedCountries,
}: GoogleMapProps): React.ReactElement {
  const defaultCenter =
    selectedCountries.length === 0
      ? {
          lat: 44.81,
          lng: 20.46,
        }
      : {
          lat: selectedCountries[0].latlng[0],
          lng: selectedCountries[0].latlng[1],
        };
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API || "" }}
      defaultCenter={defaultCenter}
      defaultZoom={1}
    >
      {selectedCountries.map((country) => (
        <LocationPin
          key={country.name}
          lat={country.latlng[0]}
          lng={country.latlng[1]}
          text={country.name}
        />
      ))}
    </GoogleMapReact>
  );
}
