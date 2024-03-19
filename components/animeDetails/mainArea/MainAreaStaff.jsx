import StaffCard from "./StaffCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
import { setPageName } from "@/reducers/pageNameSlice";

export default function MainAreaStaff({ staff }) {
  const dispatch = useDispatch();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState(1);

  useEffect(() => {
    // 根据屏幕尺寸更新 slidesToShow 的值
    const newColToshow = isXl
      ? " grid-cols-3"
      : isLg
      ? "grid-cols-3"
      : isMd
      ? " grid-cols-2"
      : isSm
      ? "grid-cols-2"
      : isXs
      ? "grid-cols-1"
      : "grid-cols-1";
    setColToShow(newColToshow);
  }, [isXl, isLg, isMd, isSm, isXs]);

  useEffect(() => {
    dispatch(setPageName("Staff"));
  }, [dispatch]);
  if (!staff) return null;

  return (
    <div
      className={`grow ${isMobileDevice || !isXs ? "px-3 mb-6 " : "mt-3 mb-6"}`}
    >
      {isMobileDevice || !isXs ? null : (
        <div className=" font-medium mb-2.5 ">
          <h3>Staff</h3>
        </div>
      )}

      <div
        className={`grid   ${colToShow}  ${
          isMobileDevice || !isXs ? "gap-y-2.5" : "gap-y-4"
        }  gap-x-8`}
      >
        {staff.map((person, index) => (
          <StaffCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
}
