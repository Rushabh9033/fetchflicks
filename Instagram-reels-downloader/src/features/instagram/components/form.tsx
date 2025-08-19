"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { getHttpErrorMessage } from "@/lib/http";

import { useVideoInfo } from "@/services/api/queries";

const formSchema = z.object({
  postUrl: z.string().url({
    message: "Provide a valid Instagram post link",
  }),
});

export function InstagramVideoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postUrl: "",
    },
  });

  const { error, isPending, mutateAsync: getVideoInfo } = useVideoInfo();

  const httpError = getHttpErrorMessage(error);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { postUrl } = values;
    try {
      console.log("getting video info", postUrl);
      const videoInfo = await getVideoInfo({ postUrl });
  
      const { filename, videoUrl } = videoInfo;
  
      console.log("videoUrl:", videoUrl);
  
      await downloadFile(videoUrl, filename);
    } catch (error: any) {
      console.log(error);
    }
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="simple-form"
      >
        {/* Flash Messages */}
        {httpError && (
          <div className="flash-messages">
            <div className="flash-message error">
              <span className="flash-icon">⚠️</span>
              <div className="flash-content">{httpError}</div>
            </div>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="postUrl"
          render={({ field }) => (
            <FormItem>
              <div className="form-group">
                <label htmlFor="postUrl" className="input-label">Instagram Video URL</label>
                <FormControl>
                  <Input
                    id="postUrl"
                    disabled={isPending}
                    type="url"
                    className="input-field"
                    placeholder="https://www.instagram.com/..."
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          disabled={isPending}
          type="submit"
          className="submit-btn"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 animate-spin" />
              Downloading...
            </>
          ) : (
            "Download Instagram Video"
          )}
        </Button>
      </form>
    </Form>
  );
}

// Utility function for download
export async function downloadFile(videoUrl: string, filename: string) {
  try {
    const response = await fetch(videoUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch the video for download.");
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename; // Set the filename for the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Cleanup blob URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error during file download:", error);
  }
}
