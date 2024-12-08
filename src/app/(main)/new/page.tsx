import { AddUserForm } from "~/components/global/add-user-form";

const Page = () => {
  return (
    <main className="flex justify-center">
      <div className="w-[35rem] space-y-4 p-8 pt-24">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Add a new User
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi.
          </p>
        </div>
        <AddUserForm />
      </div>
    </main>
  );
};

export default Page;
