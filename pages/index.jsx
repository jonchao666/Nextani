import Layout from "@/components/layout/Layout";
import ShowSlider from "@/components/homepage/ShowSlider";
import HomepageInfiniteScroll from "@/components/homepage/HomepageInfiniteScroll";
import Calendar from "@/components/homepage/Calendar";
import { useSelector } from "react-redux";
import {
  getLastSeasonAndYear,
  getNextSeasonAndYear,
} from "@/helpers/getSeasonAndYear";
import axios from "axios";
import {
  CategoryTitles,
  Categories,
  Genres,
  Directors,
} from "@/constans/categoryData";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";

export default function HomePage({ slidersData, calendarData }) {
  const showSidebars = useSelector(
    (state) => state.sidebarVisibility.showSidebars
  );
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [mainWidth, setMainWidth] = useState();
  useEffect(() => {
    const width = isXl
      ? "1284px"
      : isLg
      ? "1070px"
      : isMd
      ? "856px"
      : isSm
      ? "642px"
      : isXs
      ? "428px"
      : "214px";
    setMainWidth(width);
  }, [isXl, isLg, isMd, isSm, isXs]);
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
      <HomepageInfiniteScroll />
    </Layout>
  );
}

export async function getStaticProps() {
  const slidersData = await Promise.all(
    //get sliders data
    Categories.slice(0, 5).map(async (category) => {
      let params = {};

      if (Genres.includes(category)) {
        // 如果是流派类别
        params.genre = category;
        params.sortBy = "members";
      } else if (Directors.includes(category)) {
        // 如果是导演类别
        params.director = category;
        params.sortBy = "members";
      } else if (category === "thisSeasonPopular") {
        const seasonYear = getLastSeasonAndYear();

        params.year = seasonYear[0].year;
        params.season = seasonYear[0].season;
        params.sortBy = "members";
      } else if (category === "thisSeasonTop") {
        const seasonYear = getLastSeasonAndYear();

        params.year = seasonYear[0].year;
        params.season = seasonYear[0].season;
        params.sortBy = "score";
      } else if (category === "nextSeason") {
        const seasonYear = getNextSeasonAndYear();
        params.year = seasonYear[0].year;
        params.season = seasonYear[0].season;
        params.sortBy = "members";
      } else if (category === "topAiring") {
        params.status = "Currently Airing";
        params.sortBy = "score";
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
    // 在发生错误时为每天初始化空数组
    days.forEach((day) => {
      calendarData[day] = [];
    });
  }

  // 在 try-catch 块外返回 props
  return {
    props: {
      slidersData,
      calendarData,
    },
    revalidate: 86400, // 重新验证间隔（秒）
  };
}
