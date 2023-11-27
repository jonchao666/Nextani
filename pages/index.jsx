import Layout from "@/components/Layout";
import ShowSlider from "@/components/ShowSlider";
import HomepageInfiniteScroll from "@/components/HomepageInfiniteScroll";
import ReleaseCalendar from "@/components/Calendar";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  categoryTitles,
  categories,
  genres,
  directors,
} from "@/constans/categoryData";

export default function HomePage({ slidersData, calendarData }) {
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [mainWidth, setMainWidth] = useState();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const showSidebars = useSelector(
    (state) => state.sidebarVisibility.showSidebars
  );

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
      <main
        style={{ height: "calc(100vh-64px)" }}
        className={`bg-background mt-16 ${
          showSidebars ? (showSidebar ? "ml-60" : "ml-[72px]") : "ml-0"
        }`}
      >
        <div className="mx-auto pt-6 h-full" style={{ maxWidth: mainWidth }}>
          {showSidebars && <ReleaseCalendar calendarData={calendarData} />}

          {slidersData.map(({ title, data }) => (
            <ShowSlider
              key={title}
              title={categoryTitles[title] || title}
              data={data}
            />
          ))}
          <HomepageInfiniteScroll />
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const slidersData = await Promise.all(
    //get sliders data
    categories.slice(0, 5).map(async (category) => {
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
    revalidate: 86400, // 重新验证间隔（秒）
  };
}
