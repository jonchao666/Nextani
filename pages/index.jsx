import Layout from "@/components/layout/Layout";
import ShowSlider from "@/components/homepage/ShowSlider";
import Calendar from "@/components/homepage/Calendar";
import { useDispatch } from "react-redux";
import {
  getLastTwoSeasonAndYears,
  getLastSeasonAndYear,
  getNextSeasonAndYear,
} from "@/utils/getSeasonAndYear";
import axios from "axios";
import {
  CategoryTitles,
  Categories,
  Genres,
  Directors,
} from "@/constans/categoryData";
import { useEffect } from "react";
import { setPageName } from "@/reducers/pageNameSlice";

export default function HomePage({ slidersData, calendarData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageName("home"));
  }, [dispatch]);
  return (
    <Layout>
      <Calendar calendarData={calendarData} />
      {slidersData.map(({ title, data }) => (
        <ShowSlider
          category={title}
          key={title}
          title={CategoryTitles[title] || title}
          data={data}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const slidersData = await Promise.all(
    //get sliders data
    Categories.slice(0, 6).map(async (category) => {
      let params = {};
      params.limit = 12;
      if (Genres.includes(category)) {
        params.genre = category;
        params.sortBy = "popularity";
      } else if (Directors.includes(category)) {
        params.director = category;
        params.sortBy = "popularity";
      } else if (category === "thisSeasonPopular") {
        const seasonYear = getLastSeasonAndYear();

        params.year = seasonYear[0].year;
        params.season = seasonYear[0].season;
        params.sortBy = "popularity";
      } else if (category === "allTimePopular") {
        params.sortBy = "popularity";
      } else if (category === "allTimeTop") {
        params.sortBy = "score";
      } else if (category === "nextSeason") {
        const seasonYear = getNextSeasonAndYear();
        params.year = seasonYear[0].year;
        params.season = seasonYear[0].season;
        params.sortBy = "popularity";
      } else if (category === "topAiring") {
        params.status = "Currently Airing";
        params.sortBy = "score";
      } else if (category === "RecentlyCompleted") {
        const seasonYear = getLastTwoSeasonAndYears();
        params.yearAndSeason = [
          [seasonYear[0].year, seasonYear[0].season],
          [seasonYear[1].year, seasonYear[1].season],
        ];

        params.status = "Finished Airing";
        params.sortBy = "overall";
      }

      const url = `${process.env.API_URL}/anime`;

      try {
        const response = await axios.get(url, {
          params,
          headers: {
            "X-API-Key": process.env.API_KEY,
          },
        });

        return { title: category, data: response.data };
      } catch (error) {
        console.error(`Error fetching ${category}`, error);
        return { title: category, data: [] };
      }
    })
  );
  //get calendar data

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let calendarData = {};

  try {
    const promises = days.map((day) =>
      axios.get(`${process.env.API_URL}/anime/calendar`, {
        headers: { "X-API-Key": process.env.API_KEY },
        params: { week: day },
      })
    );

    const responses = await Promise.all(promises);
    days.forEach((day, index) => {
      calendarData[day] = responses[index].data;
    });
  } catch (error) {
    console.error("Error fetching calendarData", error);

    days.forEach((day) => {
      calendarData[day] = [];
    });
  }

  return {
    props: {
      slidersData,
      calendarData,
    },
  };
}
