import { languages } from "@/constans/languages";
import { MenuItem, Menu } from "@mui/material";
import { useTheme } from "next-themes";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";

export function DefaultDropdownMenu({
  onChangeMenu,
  switchToLightTheme,
  switchToDarkTheme,
  switchToSystemTheme,
}) {
  return (
    <Dropdown radius="md">
      <DropdownTrigger>
        <Button
          disableAnimation
          variant="ghost"
          className="border-none -mr-2"
          radius="full"
          isIconOnly
        >
          <span
            className={`material-symbols-outlined`}
            style={{
              fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
            }}
          >
            more_vert
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          isReadOnly
          className="cursor-default text-sm"
          startContent={
            <span
              className="material-symbols-outlined "
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              mode_night
            </span>
          }
        >
          Theme
        </DropdownItem>

        <DropdownItem
          startContent={
            <span
              className="material-symbols-outlined "
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              settings
            </span>
          }
        >
          <div>Settings</div>
        </DropdownItem>
        <DropdownItem
          startContent={
            <span
              className="material-symbols-outlined "
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              feedback
            </span>
          }
        >
          <div>Send feedback</div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
