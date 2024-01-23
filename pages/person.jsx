import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import {
  Card,
  CardFooter,
  CardBody,
  Image,
  Link,
  Button,
} from "@nextui-org/react";
import { HeartIcon } from "@/icons";
import Layout from "@/components/layout/Layout";
import CardDisplay from "@/components/personPage/CardDisplay";

export default function Person() {
  const router = useRouter();
  const { mal_id } = router.query;

  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 3;
  const tooltipRef = useRef(null);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/people/${mal_id}/full`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (retryCount < maxRetries) {
          setTimeout(
            setRetryCount((prevCount) => prevCount + 1),
            1200
          );
        }
      }
    };
    if (mal_id) {
      fetchData();
    }
  }, [mal_id, retryCount]);

  if (!data) {
    return null;
  }

  return (
    <Layout col1Width={305}>
      <div className="flex pb-6 ">
        <div className="mr-6 hidden md:block">
          <Image
            radius="full"
            alt={data.name}
            src={
              data.images.jpg.image_url ===
              "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                : data.images.jpg.image_url
            }
            className="object-cover w-[160px] h-[160px]"
          ></Image>
        </div>
        <div className="h-[160px]">
          <div>
            <div className="text-4xl">{data.name}</div>
            <div className="text-sm">
              {data.family_name}
              {data.given_name}
              {data.given_name && data.family_name && (
                <span className="text-2xl align-[-4px]"> &middot;</span>
              )}{" "}
              <span>{data.favorites} favorites</span>
            </div>
          </div>
          <div ref={tooltipRef} className="relative cursor-pointer">
            <div onClick={toggleVisibility} className="my-1 flex items-center">
              <span className="text-sm   ">About</span>

              <span
                className="material-symbols-outlined "
                style={{
                  fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                }}
              >
                navigate_next
              </span>
            </div>
            {visible && (
              <div className="absolute z-20 whitespace-pre-line m-3  bg-background p-5 rounded-2xl shadow-lg min-w-max w-full">
                <div className="mb-2.5 text-xl font-bold">About</div>
                <div className="text-sm">{data.about}</div>
              </div>
            )}
          </div>

          <Button
            size="sm"
            color="danger"
            variant="ghost"
            className="mt-3 border-1"
            startContent={
              <span
                className="material-symbols-outlined "
                style={{
                  fontVariationSettings:
                    "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
                }}
              >
                favorite
              </span>
            }
          >
            Favorites
          </Button>
        </div>
      </div>
      <CardDisplay data={data} />
    </Layout>
  );
}
