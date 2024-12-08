import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    setWs(socket);

    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data) satisfies {
        type: "rfid:data" | "rfid:scan";
        uid: string;
      };

      switch (payload["type"]) {
        case "rfid:data":
          if (
            typeof payload["uid"] === "string" &&
            payload["uid"].trim() !== ""
          ) {
            setUid(payload["uid"]);
            setIsCapturing(false);
            toast.success(
              "UID successfully captured. Proceeding with user creation.",
            );
          } else {
            console.warn("Invalid UID received:", payload["uid"]);
          }
          break;
        case "rfid:scan":
          setIsCapturing(true);
          toast.info("Tap a new key on the scanner...");
          break;
      }
    };

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (ws) {
      ws.send(message);
    }
  };

  return { sendMessage, isConnected, uid, isCapturing };
};
