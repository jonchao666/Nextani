import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { Genres, Types, CategoryTitles } from "@/constans/categoryData";
import ShowIndex from "@/components/animeIndexPage/ShowIndex";
import { useRouter } from "next/router";
import {
  getLastSeasonAndYear,
  getNextSeasonAndYear,
} from "@/helpers/getSeasonAndYear";
import Selector from "@/components/animeIndexPage/Selector";
import { setPageName } from "@/reducers/pageNameSlice";
import { useDispatch } from "react-redux";
export default function AnimeIndex() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { category } = router.query;
  const [isMounted, setIsMounted] = useState(false);
  const [selectedButtonSortby, setSelectedButtonSortby] =
    useState("Popularity");
  const [selectedButtonGenres, setSelectedButtonGenres] =
    useState("All Genres");
  const [selectedButtonTypes, setSelectedButtonTypes] = useState("All Types");
  const [selectedButtonStatus, setSelectedButtonStatus] =
    useState("All Status");
  const [selectedButtonYear, setSelectedButtonYear] = useState("All Year");
  const [selectedButtonSeason, setSelectedButtonSeason] =
    useState("All Season");
  const [selectedButtonRated, setSelectedButtonRated] = useState("All Rated");
  const [showSelector, setShowSelector] = useState(false);
  const [groupYearAndSeaon, setGroupYearAndSeaon] = useState(false);
  useEffect(() => {
    if (category !== undefined) {
      setSelectedButtonSortby("Popularity");
      setSelectedButtonGenres("All Genres");
      setSelectedButtonTypes("All Types");
      setSelectedButtonStatus("All Status");
      setSelectedButtonYear("All Year");
      setSelectedButtonSeason("All Season");
      setSelectedButtonRated("All Rated");
      setGroupYearAndSeaon(false);
      if (Genres.includes(category)) {
        setSelectedButtonGenres(category);
        setSelectedButtonSortby("Popularity");
      } else if (Types.includes(category)) {
        setSelectedButtonTypes(category);
        setSelectedButtonSortby("Score");
      } else if (category === "thisSeasonPopular") {
        const seasonYear = getLastSeasonAndYear();
        setSelectedButtonYear(seasonYear[0].year);

        setSelectedButtonSeason(seasonYear[0].season);
        setSelectedButtonSortby("Popularity");
      } else if (category === "thisSeasonTop") {
        const seasonYear = getLastSeasonAndYear();
        setSelectedButtonYear(seasonYear[0].year);

        setSelectedButtonSeason(seasonYear[0].season);
        setSelectedButtonSortby("Score");
      } else if (category === "nextSeason") {
        const seasonYear = getNextSeasonAndYear();
        setSelectedButtonYear(seasonYear[0].year);
        setSelectedButtonSeason(seasonYear[0].season);
        setSelectedButtonSortby("Popularity");
      } else if (category === "topAiring") {
        setSelectedButtonStatus("Currently Airing");
        setSelectedButtonSortby("Score");
      } else if (category === "Popularity") {
        setSelectedButtonSortby("Popularity");
      } else if (category === "allTimePopular") {
        setSelectedButtonSortby("Popularity");
      } else if (category === "allTimeTop") {
        setSelectedButtonSortby("Score");
      } else if (category === "Explore") {
        setSelectedButtonSortby("Overall");
        setShowSelector(true);
      } else if (category === "RecentlyCompleted") {
        setGroupYearAndSeaon(true);
        setSelectedButtonSortby("Overall");
      } else if (category === "Top") {
        setSelectedButtonSortby("Score");
      }
      if (category !== "Explore") {
        setShowSelector(false);
      }
      setIsMounted(true);
    }
  }, [category]);

  useEffect(() => {
    dispatch(setPageName(CategoryTitles[category]));
  }, [dispatch, category]);

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      {showSelector && (
        <Selector
          selectedButtonSortby={selectedButtonSortby}
          selectedButtonGenres={selectedButtonGenres}
          selectedButtonTypes={selectedButtonTypes}
          selectedButtonStatus={selectedButtonStatus}
          selectedButtonYear={selectedButtonYear}
          selectedButtonSeason={selectedButtonSeason}
          selectedButtonRated={selectedButtonRated}
          setSelectedButtonSortby={setSelectedButtonSortby}
          setSelectedButtonGenres={setSelectedButtonGenres}
          setSelectedButtonTypes={setSelectedButtonTypes}
          setSelectedButtonStatus={setSelectedButtonStatus}
          setSelectedButtonYear={setSelectedButtonYear}
          setSelectedButtonSeason={setSelectedButtonSeason}
          setSelectedButtonRated={setSelectedButtonRated}
        />
      )}

      <ShowIndex
        selectedButtonSortby={selectedButtonSortby}
        selectedButtonGenres={selectedButtonGenres}
        selectedButtonTypes={selectedButtonTypes}
        selectedButtonStatus={selectedButtonStatus}
        selectedButtonYear={selectedButtonYear}
        selectedButtonSeason={selectedButtonSeason}
        selectedButtonRated={selectedButtonRated}
        groupYearAndSeaon={groupYearAndSeaon}
      />
    </Layout>
  );
}
