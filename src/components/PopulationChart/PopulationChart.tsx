import React from "react";
import { Box } from "@mui/material";
import Chart from "react-apexcharts";
import { CountryInterface } from "src/interface/CountryInterface";

interface PopulationChartProps {
  selectedCountries: CountryInterface[];
}

export function PopulationChart({ selectedCountries }: PopulationChartProps) {
  const options = {
    chart: {
      id: "population-bar",
    },
    xaxis: {
      categories: selectedCountries.map((country) => country.name),
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
  const series = [
    {
      name: "population",
      data: selectedCountries.map((country) => country.population),
    },
  ];
  return (
    <Box sx={{ marginTop: 2 }}>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={selectedCountries.length * 40 + 60}
      />
    </Box>
  );
}
