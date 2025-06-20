import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Surface } from "@/components/ui/Surface";
import { Toggle } from "@/components/ui/Toggle";
import React, { useState, useCallback, useMemo } from "react";

export type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
};

export const useLinkEditorState = ({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [openInNewTab, setOpenInNewTab] = useState(
    initialOpenInNewTab || false
  );

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(() => {
    if (isValidUrl) {
      onSetLink(url, openInNewTab);
    }
  }, [url, isValidUrl, openInNewTab, onSetLink]);

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
};

export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({
    onSetLink,
    initialOpenInNewTab,
    initialUrl,
  });

  return (
    <Surface className="p-2">
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-black/90 cursor-text">
          <Icon name="Link" className="flex-none text-black dark:text-black" />
          <input
            type="url"
            className="flex-1 bg-transparent outline-none min-w-[12rem] text-black text-sm dark:text-black"
            placeholder="Enter URL"
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <Button
          onClick={state.handleSubmit}
          type="button"
          variant="primary"
          buttonSize="small"
          disabled={!state.isValidUrl}
        >
          Set Link
        </Button>
      </div>
      <div className="mt-3">
        <label className="flex items-center justify-start gap-2 text-sm font-semibold cursor-pointer select-none text-neutral-500 dark:text-black/40">
          Open in new tab
          <Toggle
            active={state.openInNewTab}
            onChange={state.setOpenInNewTab}
          />
        </label>
      </div>
    </Surface>
  );
};
