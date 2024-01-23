import { Button, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";

export default function AddToListComponent({
  setAddToListOpen,
  createWatchlist,
  fetchwatchlists,
  watchlists,
  mal_id,
  addWatchlistItem,
  removeWatchlistItem,
  watchlistsHasAnime,
  fetchWatchlistsContainingAnime,
}) {
  const [listNameInputOpen, setListNameInputOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [createListIsLoading, setCreateListIsLoading] = useState(false);
  const handleCreateList = async (name) => {
    try {
      setCreateListIsLoading(true);
      await createWatchlist(name, mal_id);
      await fetchwatchlists(1, 0);
      await fetchWatchlistsContainingAnime(mal_id);
      setCreateListIsLoading(false);
      setAddToListOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleAddDeleteAnime = async (e, name, mal_id) => {
    let checked = e.target.checked;

    try {
      if (checked) {
        await addWatchlistItem(name, mal_id);
        await fetchWatchlistsContainingAnime(mal_id);
      } else {
        await removeWatchlistItem(name, mal_id);
        await fetchWatchlistsContainingAnime(mal_id);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-[210px]   bg-background">
      <div className="py-4 px-6 flex justify-between">
        <p>Save anime to...</p>
        <span
          onClick={() => setAddToListOpen(false)}
          className="material-symbols-outlined cursor-pointer"
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
          }}
        >
          close
        </span>
      </div>
      <div className="py-4 px-6 overflow-y-auto max-h-[300px]">
        <Checkbox
          isDisabled={createListIsLoading}
          defaultSelected={watchlistsHasAnime.some((w) => w.name === "Default")}
          onChange={(e) => handleAddDeleteAnime(e, "Default", mal_id)}
          value={"default"}
          classNames={{
            label:
              "pl-3 text-ellipsis overflow-hidden  whitespace-nowrap text-sm",
            base: "overflow-hidden flex",
          }}
        >
          Default
        </Checkbox>

        {watchlists.map((list, index) => (
          <Checkbox
            isDisabled={createListIsLoading}
            defaultSelected={watchlistsHasAnime.some(
              (w) => w.name === list.name
            )}
            onChange={(e) => handleAddDeleteAnime(e, list.name, mal_id)}
            key={index}
            value={"default"}
            classNames={{
              label:
                "pl-3 text-ellipsis overflow-hidden  whitespace-nowrap text-sm",
              base: "overflow-hidden flex",
            }}
          >
            {list.name}
          </Checkbox>
        ))}
      </div>
      {listNameInputOpen ? (
        <div>
          <Input
            onChange={(e) => setListName(e.target.value)}
            classNames={{ inputWrapper: "after:h-[1px]" }}
            className="py-4 px-6 "
            variant="underlined"
            label="Name"
            placeholder="Enter list title"
          ></Input>
          <div className="flex justify-end pb-3 px-2">
            <Button
              isLoading={createListIsLoading}
              isDisabled={listName.length > 0 ? false : true}
              onClick={() => handleCreateList(listName)}
              variant="light"
              radius="full"
              color="primary"
              className="text-sm font-medium"
              size="sm"
            >
              Create
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex py-4 px-6 cursor-pointer "
          onClick={() => setListNameInputOpen(true)}
        >
          <span
            className="material-symbols-outlined "
            style={{
              fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
            }}
          >
            add
          </span>
          <p className="pl-4 text-ellipsis overflow-hidden  whitespace-nowrap">
            Create new list
          </p>
        </div>
      )}
    </div>
  );
}
