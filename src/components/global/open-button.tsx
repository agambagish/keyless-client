"use client";

import { KeyRoundIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useWebSocket } from "~/hooks/use-websocket";

export const OpenButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sendMessage } = useWebSocket("wss://keyless-websocket.onrender.com");

  const handleClick = () => {
    setIsLoading(true);
    sendMessage(JSON.stringify({ type: "lock:open", name: "Dashboard" }));

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <Button
      className="w-full md:w-1/3"
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <Loader2Icon aria-hidden className="mr-2 size-4 animate-spin" />
      ) : (
        <KeyRoundIcon aria-hidden className="mr-2 size-4" />
      )}
      Open Lock
    </Button>
  );
};
