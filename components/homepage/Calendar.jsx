import { useState, useEffect, useMemo, useCallback } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import moment from "moment-timezone";
import CalendarTabContent from "@/components/homepage/CalendarTabContent";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import { useResponsive } from "../../hooks/useResponsive";
export default function Calendar({ calendarData }) {
  const timezoneOffset = useMemo(() => {
    const localTime = moment();
    const tokyoTime = moment.tz("Asia/Tokyo");
    return tokyoTime.utcOffset() - localTime.utcOffset();
  }, []);

  const [selected, setSelected] = useState(moment().format("dddd"));
  const [data, setData] = useState({});
  const { resolvedTheme } = useTheme();
  const { isXs } = useResponsive();
  const [isMounted, setIsMounted] = useState(false);

  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const convertToLocaleDayAndTime = useCallback(
    (day, time) => {
      let localTime = moment
        .tz(`${day} ${time}`, "dddd HH:mm", "Asia/Tokyo")
        .subtract(timezoneOffset, "minutes");
      return {
        newDay: localTime.format("dddd"),
        newTime: localTime.format("HH:mm"),
      };
    },
    [timezoneOffset]
  );

  useEffect(() => {
    const convertedData = {};
    // 初始化每天的数据数组
    Object.keys(calendarData).forEach((day) => {
      convertedData[day] = [];
    });

    // 遍历原始数据，根据转换后的新日期重新分配
    for (const day in calendarData) {
      calendarData[day].forEach((item) => {
        const { newDay, newTime } = convertToLocaleDayAndTime(
          day,
          item.apiData.broadcast.time
        );
        // 将项目添加到转换后的新日期数组中
        convertedData[newDay].push({
          ...item,
          apiData: {
            ...item.apiData,
            broadcast: {
              ...item.apiData.broadcast,
              time: newTime,
              day: newDay,
            },
          },
        });
      });
    }

    setData(convertedData);
  }, [calendarData, timezoneOffset, convertToLocaleDayAndTime]);
  // Create tabs dynamically based on the data keys which are the days of the week
  const tabs = Object.keys(data).map((day) => (
    <Tab key={day} title={<span>{day.substring(0, 3).toUpperCase()}</span>}>
      <CalendarTabContent data={data[day]} />
    </Tab>
  ));
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={
        isMobileDevice || !isXs
          ? "flex  flex-col  pb-3 px-3 border-b-1 dark:border-[rgba(255,255,255,0.2)]"
          : "flex  flex-col  pt-3 pb-6 border-b-1 dark:border-[rgba(255,255,255,0.2)]"
      }
    >
      <Tabs
        fullWidth={isMobileDevice||!isXs}
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="default"
        size="sm"
        radius="sm"
        variant="underlined"
        classNames={
          isMobileDevice || !isXs
            ? {
                base: "-mx-3 w-screen",
                tabList: "gap-1 px-0 justify-between",
                panel: " pr-0 px-0",
              }
            : { base: "-ml-3", tabList: "px-0", panel: "px-0" }
        }
      >
        {tabs}
      </Tabs>
    </div>
  );
}
