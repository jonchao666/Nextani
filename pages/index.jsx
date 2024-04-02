import { useState, useEffect } from "react";
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
import { setPageName } from "@/reducers/pageNameSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const [slidersData, setSlidersData] = useState([]);
  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {
    dispatch(setPageName("home"));
  }, [dispatch]);

  useEffect(() => {
    const fetchSlidersData = async () => {
      const fetchedSlidersData = await Promise.all(
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
      setSlidersData(fetchedSlidersData);
    };

    const fetchCalendarData = async () => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let fetchedCalendarData = {};
      try {
        const promises = days.map((day) =>
          axios.get(`${process.env.API_URL}/anime/calendar`, {
            headers: { "X-API-Key": process.env.API_KEY },
            params: { week: day },
          })
        );
        const responses = await Promise.all(promises);
        days.forEach((day, index) => {
          fetchedCalendarData[day] = responses[index].data;
        });
      } catch (error) {
        console.error("Error fetching calendarData", error);
        days.forEach((day) => {
          fetchedCalendarData[day] = [];
        });
      }
      setCalendarData(fetchedCalendarData);
    };

    fetchSlidersData();
    fetchCalendarData();
  }, []);

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
