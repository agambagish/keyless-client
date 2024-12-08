"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusCircleIcon, ScanQrCodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addUser } from "~/actions";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useWebSocket } from "~/hooks/use-websocket";

export const AddUserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { uid, sendMessage, isCapturing } = useWebSocket(
    "wss://keyless-websocket.onrender.com",
  );

  const schema = z.object({
    name: z.string().min(3, { message: "Name must contain 3 characters." }),
    uid: z.string().min(1, { message: "A valid ID is needed." }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      uid: uid ?? "",
    },
  });

  const handleSubmit = async (payload: z.infer<typeof schema>) => {
    setIsLoading(true);

    const { data, error } = await addUser({
      name: payload.name,
      uid: payload.uid,
    });

    if (error) {
      toast.error(error);
      setIsLoading(false);
      return;
    }

    if (data) {
      router.push("/");
      toast.success("New user created!");
    }

    form.reset();
    setIsLoading(false);
  };

  const handleCapture = () => {
    sendMessage(JSON.stringify({ type: "rfid:scan" }));
  };

  if (uid) {
    form.setValue("uid", uid || "");
  }

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. John Doe"
                  autoFocus
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unique ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. AA BB CC DD"
                  readOnly
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <Loader2Icon
                aria-hidden="true"
                className="mr-2 size-4 animate-spin"
              />
            ) : (
              <PlusCircleIcon aria-hidden="true" className="mr-2 size-4" />
            )}
            Add
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={isCapturing}
            onClick={handleCapture}
            type="button"
          >
            {isCapturing ? (
              <Loader2Icon aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <ScanQrCodeIcon aria-hidden="true" className="size-4" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
