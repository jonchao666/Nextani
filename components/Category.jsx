import { Link } from "@nextui-org/react";

export default function Category() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let year = [];
  for (let i = currentYear; i > currentYear - 6; i--) {
    year.push(i);
  }

  const genres = [
    "Comedy",
    "Fantasy",
    "Action",
    "Adventure",
    "Sci-Fi ",
    "Drama",
  ];

  return (
    <div className="my-6   border-t-1 dark:border-customGray">
      <h3 className="mt-6 ">
        <span className="text-xl  font-bold">Category</span>
      </h3>

      <div className="flex bg-backgroundlight dark:bg-background mt-6">
        <div className="w-[20%] border-r-1   px-6 my-4">
          <Link className="text-md font-bold  text-foreground  " href="#">
            Sort by &gt;
          </Link>
          <div className="mt-2  -mb-2 flex flex-wrap">
            <Link className="text-foreground text-sm  text-gray-500 mr-4 mb-2">
              Popular
            </Link>
            <Link className="text-foreground text-sm  text-gray-500 mr-4 mb-2">
              Latest
            </Link>
            <Link className="text-foreground text-sm  text-gray-500 mr-4 mb-2">
              Top
            </Link>
          </div>
        </div>

        <div className="w-[40%] border-r-1   px-6 my-4">
          <Link className="text-md font-bold  text-foreground " href="#">
            Genres &gt;
          </Link>
          <div className="mt-2 -mb-2 flex flex-wrap ">
            {genres.map((g) => {
              return (
                <Link
                  className="text-foreground text-sm text-gray-500 mr-4 mb-2 "
                  key={g}
                >
                  {g}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-[25%] border-r-1   px-6 my-4">
          <Link className="text-md font-bold  text-foreground " href="#">
            Airing &gt;
          </Link>
          <div className="mt-2 -mb-2 flex flex-wrap text-foreground font-400 text-gray-500">
            <Link className="text-foreground text-sm text-gray-500 mr-4 mb-2">
              Finished
            </Link>
            <Link className="text-foreground text-sm text-gray-500 mr-4 mb-2">
              Currently
            </Link>
            <Link className="text-foreground text-sm text-gray-500 mr-4 mb-2">
              Not yet
            </Link>
          </div>
        </div>

        <div className="w-[30%]   px-6 my-4">
          <Link className="text-md font-bold  text-foreground   " href="#">
            Release Year &gt;
          </Link>
          <div className="mt-2 -mb-2 flex flex-wrap ">
            {year.map((y) => {
              return (
                <Link
                  className="text-foreground text-sm text-gray-500 mr-4 mb-2"
                  key={y}
                >
                  {y + " "}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
