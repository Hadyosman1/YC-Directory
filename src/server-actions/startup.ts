"use server";

import { writeClient } from "@/sanity/lib/write-client";
import { auth } from "../../auth";
import slugify from "slugify";


export async function createPitch(state: any, form: FormData, pitch: string) {
  const session = await auth();
  if (!session) {
    return JSON.parse(
      JSON.stringify({
        status: "ERROR",
        error: "You are not logged in. Please login to continue.",
      }),
    );
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, {
    lower: true,
    strict: true,
  });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      pitch,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return JSON.parse(JSON.stringify({ ...result, error: "", status: "SUCCESS" }));
  } catch (error) {
    console.error("Error creating startup:", error);
    return JSON.parse(
      JSON.stringify({ status: "ERROR", error: JSON.stringify(error) }),
    );
  }
}
