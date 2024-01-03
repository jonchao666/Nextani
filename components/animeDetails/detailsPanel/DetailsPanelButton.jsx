import { Button, ButtonGroup, Divider } from "@nextui-org/react";

export default function DetailsPanelButton() {
  return (
    <div>
      <ButtonGroup>
        <Button
          variant="flat"
          radius="full"
          size="sm"
          className="min-w-0 hover:bg-default-300"
        >
          <span
            className="material-symbols-outlined "
            style={{
              fontVariationSettings:
                "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
            }}
          >
            thumb_up
          </span>
          0
        </Button>
        <Divider orientation="vertical"></Divider>
        <Button
          variant="flat"
          radius="full"
          size="sm"
          className="min-w-0 hover:bg-default-300"
        >
          <span
            className="material-symbols-outlined "
            style={{
              fontVariationSettings:
                "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
            }}
          >
            thumb_down
          </span>
          0
        </Button>
      </ButtonGroup>
      <Button
        variant="flat"
        radius="full"
        size="sm"
        className="ml-2 hover:bg-default-300"
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
          }}
        >
          favorite
        </span>
        Favorite
      </Button>
      <Button
        variant="flat"
        radius="full"
        size="sm"
        className="ml-2 hover:bg-default-300"
      >
        <span
          className="material-symbols-outlined "
          style={{
            fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
          }}
        >
          playlist_add
        </span>
        Save
      </Button>
    </div>
  );
}
