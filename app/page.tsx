import { getCurrentUser } from "@app/auth/helpers";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <div className="h-screen">
        <div className="flex min-h-full flex-col justify-center">
          <div className="mx-auto w-full max-w-[50%] text-center">
            <h1 className="pb-3 text-5xl">Inventory Tracker</h1>
            <p>
              You are logged in as{" "}
              <span className="font-bold">{user.name}</span>
            </p>
            <a href="/locations" className="underline text-blue-400">
              Locations
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
