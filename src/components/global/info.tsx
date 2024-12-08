import { Avatar, AvatarFallback } from "~/components/ui/avatar";

interface Props {
  specs: {
    title: string;
    description: string;
  }[];
}

export const Info = ({ specs }: Props) => {
  return (
    <div className="space-y-8">
      {specs.length === 0 && (
        <p className="text-center text-muted-foreground">Empty!</p>
      )}
      {specs.map((spec, i) => (
        <div key={i} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{i + 1}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{spec.title}</p>
            <p className="text-sm text-muted-foreground">{spec.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
