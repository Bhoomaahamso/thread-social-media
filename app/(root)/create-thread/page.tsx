import ThreadForm from "@/components/ThreadForm";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(user?.id);

  if (!userInfo?.onboarded) redirect("/onboard");

  return (
    <div className="p-8">
      <h1 className="text-heading1-bold">Create Thread</h1>
      <section className="mt-4 bg-slate-600 rounded p-8">
        <ThreadForm userId={userInfo._id.toString()} />
      </section>
    </div>
  );
}
