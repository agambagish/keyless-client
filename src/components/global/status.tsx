"use client";

import { Badge } from "~/components/ui/badge";
import { useWebSocket } from "~/hooks/use-websocket";

export const Status = () => {
  const { isConnected } = useWebSocket("wss://keyless-websocket.onrender.com");

  return (
    <Badge variant={isConnected ? "default" : "destructive"}>
      {isConnected ? "Connected" : "Connecting..."}
    </Badge>
  );
};
