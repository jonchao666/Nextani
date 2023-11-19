import Header from "@/components/Header";
import ShowSlider from "@/components/ShowSlider";
import Category from "@/components/Category";
import ReleaseCalendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import MiniSidebar from "@/components/MiniSidebar";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/reducers/sidebarSlice";
import axios from "axios";

const categoryTitles = {
  thisSeasonPopular: "Popular this season",
  nextSeason: "Upcoming next season",
  movie: "Movie",
  allTimePopular: "All Time Popular",
  topAnime: "Top Anime",
  music: "Music",

  "Miyazaki, Hayao": "Hayao Miyazaki",
  "Kon, Satoshi": "Satoshi Kon",
  "Kawaguchi, Yuichiro": "Yuichiro Kawaguchi",
  "Kawaguchi, Yuichiro": "Yuichiro Kawaguchi",
  "Oshii, Mamoru": "Mamoru Oshii",
  "Otomo, Katsuhiro": "Katsuhiro Otomo",
  "Hosoda, Mamoru": "Mamoru Hosoda",
  "Oshii, Mamoru": "Mamoru Oshii",
  "Otomo, Katsuhiro": "Katsuhiro Otomo",
  "Anno, Hideaki": "Hideaki Anno",
  "Shinkai, Makoto": "Makoto Shinkai",
};
const categories = [
  "thisSeasonPopular",
  "nextSeason",
  "Award Winning",
  "Adventure",
  "Miyazaki, Hayao",
  "Fantasy",
  "Drama",
  "Hosoda, Mamoru",
  "Shinkai, Makoto",

  "Avant Garde",
  "Action",
  "Oshii, Mamoru",
  "Anno, Hideaki",
  "Kon, Satoshi",
  "Sci-Fi",
  "Otomo, Katsuhiro",

  "allTimePopular",
  "topAnime",
  "movie",
  "music",
  "Comedy",
  "Romance",
  "Slice of Life",
  "Supernatural",
  "Mystery",
  "Sports",
  "Horror",
  "Suspense",
  "Gourmet",
];

const genres = [
  "Fantasy",
  "Sci-Fi",
  "Drama",
  "Comedy",
  "Action",
  "Adventure",
  "Romance",
  "Slice of Life",
  "Supernatural",
  "Mystery",
  "Avant Garde",
  "Sports",
  "Horror",
  "Suspense",
  "Gourmet",

  "Award Winning",
];

const directors = [
  "Miyazaki, Hayao",
  "Kon, Satoshi",
  "Hosoda, Mamoru",
  "Oshii, Mamoru",
  "Otomo, Katsuhiro",
  "Anno, Hideaki",
  "Shinkai, Makoto",
];

export default function HomePage({ slidersData, calendarData }) {
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [mainWidth, setMainWidth] = useState();
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const [showSidebars, setShowSidebars] = useState(true);
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

  useEffect(() => {
    function handleResize() {
      setShowSidebars(window.innerWidth >= 790);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1315 && showSidebar) {
        dispatch(toggleSidebar());
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showSidebar, dispatch]);
  return (
    <div>
      <Header toggleSidebar={() => dispatch(toggleSidebar())} />

      {showSidebars && (showSidebar ? <Sidebar /> : <MiniSidebar />)}
      <main
        style={{ height: "calc(100vh - 64px)" }}
        className={`bg-background overflow-y-scroll mt-16 ${
          showSidebars ? (showSidebar ? "ml-60" : "ml-[72px]") : "ml-0"
        }`}
      >
        <div className="mx-auto " style={{ maxWidth: mainWidth }}>
          {showSidebars ? (
            <ReleaseCalendar calendarData={calendarData} />
          ) : null}
          {showSidebars ? <Category /> : null}
          {slidersData.map(({ title, data }) => (
            <ShowSlider
              key={title}
              title={categoryTitles[title] || title}
              data={data}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const slidersData = await Promise.all(
    //get sliders data
    categories.map(async (category) => {
      let url;
      if (genres.includes(category)) {
        // 如果是流派类别，则构建流派 URL
        url = `${process.env.API_URL}/anime/genres/${category}`;
      } else if (directors.includes(category)) {
        // 如果是流派类别，则构建流派 URL
        url = `${process.env.API_URL}/anime/directors/${category}`;
      } else {
        // 否则，使用原来的 URL
        url = `${process.env.API_URL}/anime/${category}`;
      }

      try {
        const response = await axios.get(url, {
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
    revalidate: 3600, // 重新验证间隔（秒）
  };
}
