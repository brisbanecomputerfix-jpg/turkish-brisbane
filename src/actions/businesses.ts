"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type SubmitBusinessState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    category?: string[];
    suburb?: string[];
    phone?: string[];
    description?: string[];
  };
};

export async function submitBusinessAction(
  prevState: SubmitBusinessState | null,
  formData: FormData
): Promise<SubmitBusinessState> {
  const name = formData.get("name")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const suburb = formData.get("suburb")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const website = formData.get("website")?.toString().trim() || null;
  const description = formData.get("description")?.toString().trim();

  // Simple validation
  const errors: SubmitBusinessState["errors"] = {};
  if (!name || name.length < 2) errors.name = ["Business name is required (min 2 chars)."];
  if (!category) errors.category = ["Please select a business category."];
  if (!suburb) errors.suburb = ["Suburb is required."];
  if (!phone || phone.length < 6) errors.phone = ["Valid contact phone is required."];
  if (!description || description.length < 10) errors.description = ["Description is required (min 10 chars)."];

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please resolve the errors below.", errors };
  }

  try {
    await prisma.business.create({
      data: {
        name: name!,
        category: category!,
        suburb: suburb!,
        phone: phone!,
        website,
        description: description!,
        isApproved: false, // Default is pending approval by community admin
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Teşekkürler! Your business submission has been received and is pending moderation.",
    };
  } catch (error) {
    console.error("Failed to submit business:", error);
    return {
      success: false,
      message: "An unexpected error occurred while saving your listing. Please try again.",
    };
  }
}

export async function getApprovedBusinesses(filter?: { category?: string; query?: string }) {
  try {
    const where: any = { isApproved: true };

    if (filter?.category && filter.category !== "All") {
      where.category = filter.category;
    }

    if (filter?.query && filter.query.trim().length > 0) {
      const q = filter.query.trim();
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { suburb: { contains: q } },
      ];
    }

    return await prisma.business.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching businesses:", err);
    return [];
  }
}

