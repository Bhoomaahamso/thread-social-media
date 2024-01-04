"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { addComment } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  reply: z.string().nonempty(),
});

export default function CommentForm({
  threadId,
  currentUserImg,
  currentUserId,
}: {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}) {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addComment({
      threadId,
      currentUserId,
      text: values.reply,
      path: pathname,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-6 flex flex-1 items-center my-8 mx-4 border-y-[1px] border-y-slate-600 border-solid"
      >
        <FormField
          control={form.control}
          name="reply"
          render={({ field }) => (
            <FormItem className="flex items-center flex-1">
              <FormLabel className=" ">
                <Image
                  src={currentUserImg}
                  width={36}
                  height={36}
                  alt="Image"
                  className="rounded-full"
                />
              </FormLabel>
              <FormControl className="items-center lex-1 !my-0">
                <Input
                  {...field}
                  className="bg-slate-900 outline-none border-none lex-1 mx-2"
                  placeholder="Comment..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex items-center rounded-full bg-purple-700 "
        >
          Reply
        </Button>
      </form>
    </Form>
  );
}
