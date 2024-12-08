import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Info } from "~/components/global/info";
import { OpenButton } from "~/components/global/open-button";
import { Status } from "~/components/global/status";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const Page = async () => {
  return (
    <main className="flex justify-center">
      <div className="w-[75rem] space-y-4 p-8 pt-8">
        <div className="flex items-center justify-between space-y-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Control & add new users from here.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Status />
          </div>
        </div>
        <div className="space-y-4 pt-12">
          <div className="flex justify-center space-x-2">
            <OpenButton />
            <Link
              href="/new"
              className={buttonVariants({
                variant: "secondary",
              })}
            >
              <PlusCircleIcon aria-hidden className="mr-2 size-4" />
              Add User
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Keyless: A Smart Lock</CardTitle>
                <CardDescription>
                  This is a project utilizing NodeMCU and RFID technology to
                  provide secure, convenient keyless entry. The components
                  utilized in the hardware assembly are detailed below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Info
                  specs={[
                    {
                      title: "NodeMCU - ESP32",
                      description:
                        "240 MHz Clock Frequency, 512 kB SRAM, 4 MB Memory",
                    },
                    {
                      title: "ESP32 Expansion Board",
                      description: "Type-C & DC 6.5-16 Volt Power Supply",
                    },
                    {
                      title: "RC522 RFID Reader Writer Module",
                      description: "13.56 MHz",
                    },
                    {
                      title: "16x2 LCD Display",
                      description: "Green, 5 Volt, PWM",
                    },
                    {
                      title: "I2C Module",
                      description: "...",
                    },
                    {
                      title: "Relay Module",
                      description: "5 Volt",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
