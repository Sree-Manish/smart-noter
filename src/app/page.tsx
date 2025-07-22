import { getUser } from "@/auth/server";

type Props = {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

async function Home({searchParams}: Props) {
  const noteIdParam = (await searchParams).noteId
  const user = await getUser()  

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end"></div>
    </div>
  );
}

export default Home