import {
  Input,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { languages } from "@/constans/languages";
import { MenuItem, Menu } from "@mui/material";

export function DefaultDropdownMenu({ anchorEl, handleClose, onChangeMenu }) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={() => onChangeMenu("theme")}>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          mode_night
        </span>
        Appearance: Device theme
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          chevron_right
        </span>
      </MenuItem>

      <MenuItem onClick={() => onChangeMenu("language")}>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          translate
        </span>
        Language: English
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          chevron_right
        </span>
      </MenuItem>

      <MenuItem>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          settings
        </span>
        Settings
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          settings
        </span>
      </MenuItem>
      <MenuItem>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          feedback
        </span>
        Send feedback
      </MenuItem>
    </Menu>
  );
}
export function LanguageDropdownMenu({ anchorEl, handleClose, onChangeMenu }) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={() => onChangeMenu("default")}>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          arrow_back
        </span>
        Choose your language
      </MenuItem>

      {languages.map((language) => (
        <MenuItem key={language.code}>
          <span
            className={`material-symbols-outlined`}
            style={{
              fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
            }}
          >
            check
          </span>
          {language.name}
        </MenuItem>
      ))}
    </Menu>
  );
}

export function DeviceThemeDropdownMenu({
  anchorEl,
  handleClose,
  onChangeMenu,
}) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={() => onChangeMenu("default")}>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          arrow_back
        </span>
        Appearance
      </MenuItem>

      <MenuItem>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          check
        </span>
        Use device theme
      </MenuItem>
      <MenuItem>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          check
        </span>
        Dark theme
      </MenuItem>
      <MenuItem>
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
          }}
        >
          check
        </span>
        Light theme
      </MenuItem>
    </Menu>
  );
}
