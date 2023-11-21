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
export default function DropDownMenu() {
  const defaultDropdownMenu = (
    <DropdownMenu aria-label="default" className="w-[300px]">
      <DropdownSection showDivider>
        <DropdownItem
          key="appearance"
          startContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              mode_night
            </span>
          }
          endContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              chevron_right
            </span>
          }
        >
          Appearance: Device theme
        </DropdownItem>

        <DropdownItem
          key="language"
          startContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              translate
            </span>
          }
          endContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              chevron_right
            </span>
          }
        >
          Language: English
        </DropdownItem>
      </DropdownSection>
      <DropdownItem
        key="settings"
        startContent={
          <span
            className={`material-symbols-outlined`}
            style={{
              fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
            }}
          >
            settings
          </span>
        }
      >
        Settings
      </DropdownItem>
      <DropdownItem
        key="feedback"
        startContent={
          <span
            className={`material-symbols-outlined`}
            style={{
              fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
            }}
          >
            feedback
          </span>
        }
      >
        Send feedback
      </DropdownItem>
    </DropdownMenu>
  );
  const languageDropdownMenu = (
    <DropdownMenu aria-label="language" className="w-[300px]">
      <DropdownSection showDivider>
        <DropdownItem
          key="language"
          startContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              arrow_back
            </span>
          }
        >
          Choose your language
        </DropdownItem>
      </DropdownSection>
      <DropdownSection>
        {languages.map((language) => (
          <DropdownItem
            key={language.code}
            startContent={
              <span
                className={`material-symbols-outlined`}
                style={{
                  fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
                }}
              >
                check
              </span>
            }
          >
            {language.name}
          </DropdownItem>
        ))}
      </DropdownSection>
    </DropdownMenu>
  );

  const deviceThemeDropdownMenu = (
    <DropdownMenu aria-label="deviceTheme" className="w-[300px]">
      <DropdownSection showDivider>
        <DropdownItem
          startContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              arrow_back
            </span>
          }
        >
          Appearance
        </DropdownItem>
      </DropdownSection>
      <DropdownSection title="Setting applies to this browser only">
        <DropdownItem
          startContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              check
            </span>
          }
        >
          Use device theme
        </DropdownItem>
        <DropdownItem
          startContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              check
            </span>
          }
        >
          Dark theme
        </DropdownItem>
        <DropdownItem
          startContent={
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              check
            </span>
          }
        >
          Light theme
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );

  return defaultDropdownMenu;
}
