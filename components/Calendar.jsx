import { useState, useEffect, useMemo, useCallback } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import moment from "moment-timezone";
import CalendarTabContent from "@/components/CalendarTabContent";
import { useTheme } from "next-themes";

export default function ReleaseCalendar({ calendarData }) {
  const timezoneOffset = useMemo(() => {
    const localTime = moment();
    const tokyoTime = moment.tz("Asia/Tokyo");
    return tokyoTime.utcOffset() - localTime.utcOffset();
  }, []);

  const [selected, setSelected] = useState(moment().format("dddd"));
  const [data, setData] = useState({});
  const { theme } = useTheme();

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

  return (
    <div className="flex w-full flex-col mb-6">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="primary"
        className="p-0 mb-4"
        classNames={{
          cursor: theme === "light" ? "bg-[#4C93FF1A] " : "",
          tab: "  text-xs",
          tabContent:
            theme === "light"
              ? "group-data-[selected=true]:text-[#4c93ff]"
              : "",
          panel: "p-0",
          tabList: "p-0",
        }}
      >
        {tabs}
      </Tabs>
    </div>
  );
}
