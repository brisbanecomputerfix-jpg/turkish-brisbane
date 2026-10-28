"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type SubmitNoticeState = {
  success?: boolean;
  message?: string;
  errors?: {
    title?: string[];
    type?: string[];
    content?: string[];
    contactInfo?: string[];
  };
};

export async function submitNoticeAction(
  prevState: SubmitNoticeState | null,
  formData: FormData
): Promise<SubmitNoticeState> {
  const title = formData.get("title")?.toString().trim();
  const type = formData.get("type")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const contactInfo = formData.get("contactInfo")?.toString().trim();

  const errors: SubmitNoticeState["errors"] = {};
  if (!title || title.length < 5) errors.title = ["Title must be at least 5 characters."];
  if (!type) errors.type = ["Notice type is required."];
  if (!content || content.length < 10) errors.content = ["Content must be at least 10 characters."];
  if (!contactInfo) errors.contactInfo = ["Contact information is required."];

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the form fields.", errors };
  }

  try {
    await prisma.notice.create({
      data: {
        title: title!,
        type: type!,
        content: content!,
        contactInfo: contactInfo!,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Notice posted successfully to the community board!",
    };
  } catch (error) {
    console.error("Failed to post notice:", error);
    return {
      success: false,
      message: "Failed to submit community notice. Please try again.",
    };
  }
}

export async function getNotices(typeFilter?: string) {
  try {
    const where: any = {};
    if (typeFilter && typeFilter !== "all") {
      where.type = typeFilter;
    }

    return await prisma.notice.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching notices:", err);
    return [];
  }
}

