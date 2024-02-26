import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import useUserActivity from "@/hooks/useUserActivity";
import { useSelector, useDispatch } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
export default function WatchlistCardInfo({
  data,
  setWatchlists,
  editShowLeft,
  NoneEdit,
}) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  // open and close edit watchlist
  const [editingWatchlist, setEditingWatchlist] = useState(false);
  const tooltipRef = useRef(null);

  const { isXs } = useResponsive();

  function handleEditWatchlist() {
    setEditingWatchlist(!editingWatchlist);
  }

  //close login request when ClickOutside
  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setEditingWatchlist(false);
      setEditingName(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //delete watchlist
  const { removeWatchlist } = useUserActivity();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDeleteWatchlist = async (name) => {
    setDeleteLoading(true);
    await removeWatchlist(name);
    if (true) {
      setWatchlists((prev) => prev.filter((item) => item.name !== name));
      setShowDelete(false);
    }
    setDeleteLoading(false);
  };

  //rename watchlist
  const { renameWatchlist } = useUserActivity();
  const [editingName, setEditingName] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [renameLoading, setRenameLoading] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRenameWatchlist = async (oldName, newName) => {
    setRenameLoading(true);
    let res = await renameWatchlist(oldName, newName);
    if (res) {
      setWatchlists((prev) =>
        prev.map((item) => {
          if (item.name === oldName) {
            return { ...item, name: newName };
          }
          return item;
        })
      );
      setEditingWatchlist(false);
      setEditingName(false);
    }

    setRenameLoading(false);
  };

  return (
    <div className="mt-2 flex justify-between">
      <Link
        href={`/watchlist?name=${data.name}`}
        className={` line-clamp-2  break-words w-[154px] text-sm  ${
          isMobileDevice || !isXs
            ? " leading-[17.5px]"
            : "leading-[20px] font-medium"
        }`}
      >
        <p className="">{data.name}</p>
      </Link>

      {showDelete && (
        <div className="fixed z-30  shadow-[0_4px_32px_0px_rgba(0,0,0,0.1)] bg-background  dark:bg-[rgb(40,40,40)] rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  sm:max-w-[450px] w-full ">
          <div className="mt-6">
            <p className="px-6 mb-4 ">Delete watchlist</p>
            <div className="mb-6 mt-1 text-sm ">
              <p className="px-6 mb-2">
                <span>Are you sure you want to delete </span>
                <span className="font-medium">{data.name}</span> <span>?</span>
              </p>
              <p className="px-6">
                Note: Deleting watchlist is a permanent action and cannot be
                undone.
              </p>
            </div>
            <div className="flex justify-end p-2">
              <Button
                onClick={() => setShowDelete(false)}
                variant="light"
                radius="full"
                className="h-9 font-medium "
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteWatchlist(data.name)}
                isLoading={deleteLoading}
                isDisabled={deleteLoading}
                color="primary"
                variant="light"
                radius="full"
                className="h-9 font-medium "
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {!NoneEdit && (
        <div className="relative" ref={tooltipRef}>
          <span
            onClick={() => handleEditWatchlist()}
            className="material-symbols-outlined cursor-pointer"
            style={{
              fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
            }}
          >
            more_vert
          </span>
          {editingWatchlist && !editingName ? (
            <div
              className={`absolute z-30 top-6 -left-[130px] rounded-xl shadow-[0_4px_32px_0px_rgba(0,0,0,0.1)] bg-background dark:bg-[rgb(40,40,40)]`}
            >
              <div className="flex flex-col py-2 items-start">
                <Button
                  onClick={() => {
                    setShowDelete(true), setEditingWatchlist(false);
                  }}
                  radius="none"
                  variant="ghost"
                  className="border-none w-full"
                >
                  <span
                    className="material-symbols-outlined mx-1 "
                    style={{
                      fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                    }}
                  >
                    delete
                  </span>
                  <span className="mr-6">Delete</span>
                </Button>

                <Button
                  onClick={() => setEditingName(true)}
                  radius="none"
                  variant="ghost"
                  className="border-none"
                >
                  <span
                    className="material-symbols-outlined mx-1 "
                    style={{
                      fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                    }}
                  >
                    edit
                  </span>
                  <span className="mr-6">Rename</span>
                </Button>
              </div>
            </div>
          ) : (
            editingWatchlist &&
            editingName && (
              <div className="fixed z-30  shadow-[0_4px_32px_0px_rgba(0,0,0,0.1)] bg-background  dark:bg-[rgb(40,40,40)] rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   ">
                <div className="mt-6 ">
                  <p className="px-6 mb-4 ">Rename watchlist</p>
                  <Input
                    classNames={
                      isMobileDevice || !isXs
                        ? { inputWrapper: "", input: "text-md" }
                        : { inputWrapper: "after:h-[1px]", input: "text-md" }
                    }
                    label="New name"
                    size="sm"
                    variant="underlined"
                    onChange={handleChange}
                    className="px-6 mb-6  w-[300px] "
                  ></Input>
                  <div className="flex justify-end p-2">
                    <Button
                      variant="light"
                      radius="full"
                      className="h-9 font-medium "
                      onClick={() => {
                        setEditingName(false), setEditingWatchlist(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      isDisabled={renameLoading}
                      isLoading={renameLoading}
                      onClick={() =>
                        handleRenameWatchlist(data.name, inputValue)
                      }
                      variant="light"
                      radius="full"
                      color="primary"
                      className="h-9 font-medium "
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
