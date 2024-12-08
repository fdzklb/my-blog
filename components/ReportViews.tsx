"use client";

import { fetchUrl } from "@/lib/utils";
import { useEffect } from "react";

export default function ReportViews({
  slug,
  title,
  categories,
  date,
  description,
  suffix,
}: {
  slug: string;
  title: string;
  description: string;
  categories: string;
  suffix: string;
  date: string;
}) {
  useEffect(() => {
    const postData = async () => {
      try {
        await fetch(`${fetchUrl}/${suffix}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug, title, categories, description, date }),
        });
      } catch (error) {
        console.log("Something is up...", error);
      }
    };
    postData();
  }, [categories, slug, title, description, date]);
  return <></>;
}
