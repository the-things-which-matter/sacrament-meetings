"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import {
  addMeeting,
  updateMeeting,
  deleteMeeting,
} from "./meetings-db";

import { MeetingType } from "./types";

const MeetingFormSchema = z.object({
  date: z.string().min(1, "Date is required"),

  meetingType: z.enum([
    "testimony",
    "regular",
    "stake",
    "general",
    "special",
  ]),

  presiding: z.string().min(1, "Presiding is required"),

  conducting: z.string().min(1, "Conducting is required"),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
  };
  message?: string;
};


export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  try {
    await addMeeting({
      id: 0,

      date: validatedFields.data.date,

      meetingType:
        validatedFields.data.meetingType as MeetingType,

      presiding: validatedFields.data.presiding,

      conducting: validatedFields.data.conducting,

      announcements: [],

      openingHymn: {
        number: 0,
        title: "",
      },

      openingPrayer: "",

      wardBusiness: [],

      stakeBusiness: false,

      sacramentHymn: {
        number: 0,
        title: "",
      },

      speakers: [],

      closingHymn: {
        number: 0,
        title: "",
      },

      closingPrayer: "",
    });

  } catch (error) {
    console.error("CREATE MEETING ERROR:", error);

    return {
      message: "Database Error: Failed to create meeting.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}


export async function updateMeetingAction(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {

  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }


  try {
    await updateMeeting(id, {

      id,

      date: validatedFields.data.date,

      meetingType:
        validatedFields.data.meetingType as MeetingType,

      presiding: validatedFields.data.presiding,

      conducting: validatedFields.data.conducting,

      announcements: [],

      openingHymn: {
        number: 0,
        title: "",
      },

      openingPrayer: "",

      wardBusiness: [],

      stakeBusiness: false,

      sacramentHymn: {
        number: 0,
        title: "",
      },

      speakers: [],

      closingHymn: {
        number: 0,
        title: "",
      },

      closingPrayer: "",
    });

  } catch (error) {

    console.error("UPDATE MEETING ERROR:", error);

    return {
      message: "Database Error: Failed to update meeting.",
    };
  }


  revalidatePath("/meetings");
  redirect("/meetings");
}


export async function deleteMeetingAction(
  id: number
): Promise<void> {

  try {

    await deleteMeeting(id);

  } catch (error) {

    console.error("DELETE MEETING ERROR:", error);

    throw new Error(
      "Database Error: Failed to delete meeting."
    );
  }


  revalidatePath("/meetings");
  redirect("/meetings");
}