"use client";

import { useActionState } from "react";
import { updateMeetingAction, State } from "@/lib/actions";
import { SacramentMeeting } from "@/lib/types";

const initialState: State = {};

export default function EditMeetingForm({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {

  const updateAction =
    updateMeetingAction.bind(null, meeting.id);

  const [state, formAction, isPending] =
    useActionState(
      updateAction,
      initialState
    );


  return (
    <form
      action={formAction}
      className="space-y-6"
    >

      <div>
        <label
          htmlFor="date"
          className="block font-medium"
        >
          Date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          defaultValue={meeting.date}
          className="border p-2 rounded w-full"
          aria-describedby="date-error"
        />

        <p
          id="date-error"
          aria-live="polite"
          className="text-red-600"
        >
          {state.errors?.date}
        </p>
      </div>


      <div>
        <label
          htmlFor="meetingType"
          className="block font-medium"
        >
          Meeting Type
        </label>

        <select
          id="meetingType"
          name="meetingType"
          defaultValue={meeting.meetingType}
          className="border p-2 rounded w-full"
          aria-describedby="meetingType-error"
        >
          <option value="regular">
            Regular
          </option>

          <option value="testimony">
            Testimony
          </option>

          <option value="stake">
            Stake
          </option>

          <option value="general">
            General
          </option>

          <option value="special">
            Special
          </option>

        </select>

        <p
          id="meetingType-error"
          aria-live="polite"
          className="text-red-600"
        >
          {state.errors?.meetingType}
        </p>

      </div>


      <div>
        <label
          htmlFor="presiding"
          className="block font-medium"
        >
          Presiding
        </label>

        <input
          id="presiding"
          name="presiding"
          defaultValue={meeting.presiding}
          className="border p-2 rounded w-full"
          aria-describedby="presiding-error"
        />

        <p
          id="presiding-error"
          aria-live="polite"
          className="text-red-600"
        >
          {state.errors?.presiding}
        </p>

      </div>


      <div>
        <label
          htmlFor="conducting"
          className="block font-medium"
        >
          Conducting
        </label>

        <input
          id="conducting"
          name="conducting"
          defaultValue={meeting.conducting}
          className="border p-2 rounded w-full"
          aria-describedby="conducting-error"
        />

        <p
          id="conducting-error"
          aria-live="polite"
          className="text-red-600"
        >
          {state.errors?.conducting}
        </p>

      </div>


      {state.message && (
        <p
          aria-live="polite"
          className="text-red-600"
        >
          {state.message}
        </p>
      )}


      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isPending
          ? "Updating..."
          : "Update Meeting"}
      </button>

    </form>
  );
}