"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import { z } from "zod";
import { CreateStartupValidationSchema } from "@/utils/validation";
import { useRouter } from "next/navigation";
import sendIcon from "./../../public/send-icon.svg";
import { createPitch } from "@/server-actions/startup";

const StartupForm = () => {
  const [, submitAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  async function handleFormSubmit(
    prevState: { [key: string]: string },
    formData: FormData,
  ) {
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        link: formData.get("link"),
        category: formData.get("category"),
        pitch,
      };
      await CreateStartupValidationSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);
      if (result.status === "SUCCESS") {
        toast.success("Idea created successfully!", {
          position: "bottom-center",
          theme: "colored",
        });
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      toast.error("Something went wrong..!", {
        position: "bottom-center",
        theme: "colored",
      });

      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        console.log(fieldErrors);

        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR",
        };
      }

      return {
        ...prevState,
        error: "Something went wrong",
        status: "ERROR",
      };
    }
  }

  return (
    <form action={submitAction}>
      <div className="mb-10 flex flex-col gap-y-[30px]">
        <div className="form-field-wrapper">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            required
            placeholder="startup description"
            name="title"
            id="title"
            className="form-input"
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        <div className="form-field-wrapper">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            required
            placeholder="description of your startup idea."
            name="description"
            id="description"
            className="form-textarea"
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </div>

        <div className="form-field-wrapper">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <input
            required
            placeholder="Choose a category (e.g., Tech, Health, Education, etc.)"
            type="text"
            name="category"
            id="category"
            className="form-input"
          />
          {errors.category && <p className="form-error">{errors.category}</p>}
        </div>

        <div className="form-field-wrapper">
          <label className="form-label" htmlFor="link">
            Image Link
          </label>
          <input
            placeholder="Paste a link to your demo or promotional media"
            type="url"
            name="link"
            id="link"
            className="form-input"
          />
          {errors.link && <p className="form-error">{errors.link}</p>}
        </div>

        <div data-color-mode="light" className="form-field-wrapper">
          <label className="form-label" htmlFor="pitch">
            Pitch
          </label>
          <MDEditor
            id="pitch"
            preview="edit"
            height={300}
            value={pitch}
            textareaProps={{
              placeholder:
                "Briefly Describe Your Idea And What Problem It Solves.",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "4px solid black",
            }}
            onChange={(value) => setPitch(value || "")}
          />

          {errors.pitch && <p className="form-error">{errors.pitch}</p>}
        </div>
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="form-submit-btn flex items-center justify-center gap-3"
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Image src={sendIcon} alt="send icon" height={16} width={16} />
      </button>
    </form>
  );
};

export default StartupForm;
