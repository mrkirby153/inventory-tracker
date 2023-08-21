import { getCurrentUser } from "@app/auth/helpers";

// export const dynamic = 'force-dynamic'

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <p>Current User: {JSON.stringify(user)}</p>
    </>
  );
}
