"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { currentUser, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { updateUser } from "@/lib/actions/user.actions";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  id: string;
  profile: string;
  name: string;
  username: string;
  bio: string;
}

const formSchema = z.object({
  profile_photo: z.string(),
  name: z.string().min(3),
  username: z.string().min(3).max(50),
  bio: z.string().min(3).max(250),
});

export default function AccountDetails({ user }: { user: Props }) {
  const [file, setFile] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      profile_photo: user?.profile || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const hasImgChanged = isBase64Image(values.profile_photo);

    if (hasImgChanged) {
      const img = await startUpload(file);
      if (img && img[0]?.url) {
        values.profile_photo = img[0].url;
      }
      // console.log(img);
    }

    await updateUser({
      userId: user.id,
      name: values.name,
      username: values.username,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }

    // console.log("values", values);
  }

  const handleUpload = (e: any, fieldChange: any) => {
    e.preventDefault();

    if (e.target?.files?.length === 0) return;
    if (!e.target.files[0].type.includes("image")) return;

    const file = e.target.files[0];
    setFile(Array.from(e.target.files));
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const img = e.target?.result?.toString();
      fieldChange(img);
    };
    fileReader.readAsDataURL(file);

    // console.log("uploading", file);
  };

  return (
    <>
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel className="flex items-center justify-center !w-24 !h-24 relative">
                    {field?.value ? (
                      <Image
                        className="rounded-[50%] max-w-[96px] absolute w-full h-full object-cover"
                        src={field.value}
                        alt="profile_photo"
                        width={96}
                        height={96}
                        priority
                      />
                    ) : (
                      <Image
                        className="rounded-md bg-slate-200"
                        src={"/assets/profile.svg"}
                        alt="profile_photo"
                        width={24}
                        height={24}
                      />
                    )}
                  </FormLabel>
                  <FormControl className="flex items-center">
                    <Input
                      className="w-fit cursor-pointer border-none bg-transparent outline-none file:text-blue"
                      type="file"
                      accept="image/*"
                      alt="choose file"
                      onChange={(e) => handleUpload(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-slate-800 font-semibold"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="text-slate-800 font-semibold"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Textarea
                      className="text-slate-800 font-semibold"
                      {...field}
                      rows={6}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
}
