"use client";

import { useActionState } from "react";
import { createMeeting, State } from "@/lib/actions";

const initialState: State = {
  message: "",
  errors: {},
};

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Create New Sacrament Meeting
      </h1>

      <form action={formAction} className="space-y-6">

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block font-medium mb-2"
          >
            Meeting Date
          </label>

          <input
            id="date"
            name="date"
            type="date"
            required
            aria-describedby="date-error"
            className="border rounded px-3 py-2 w-full"
          />

          <div
            id="date-error"
            aria-live="polite"
            className="text-red-600"
          >
            {state.errors?.date?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>


        {/* Meeting Type */}
        <div>
          <label
            htmlFor="meetingType"
            className="block font-medium mb-2"
          >
            Meeting Type
          </label>

          <select
            id="meetingType"
            name="meetingType"
            required
            aria-describedby="meetingType-error"
            className="border rounded px-3 py-2 w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select type
            </option>

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


          <div
            id="meetingType-error"
            aria-live="polite"
            className="text-red-600"
          >
            {state.errors?.meetingType?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>

        </div>


        {/* Presiding */}
        <div>
          <label
            htmlFor="presiding"
            className="block font-medium mb-2"
          >
            Presiding
          </label>


          <input
            id="presiding"
            name="presiding"
            type="text"
            required
            aria-describedby="presiding-error"
            className="border rounded px-3 py-2 w-full"
          />


          <div
            id="presiding-error"
            aria-live="polite"
            className="text-red-600"
          >
            {state.errors?.presiding?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>

        </div>


        {/* Conducting */}
        <div>
          <label
            htmlFor="conducting"
            className="block font-medium mb-2"
          >
            Conducting
          </label>


          <input
            id="conducting"
            name="conducting"
            required
            type="text"
            aria-describedby="conducting-error"
            className="border rounded px-3 py-2 w-full"
          />


          <div
            id="conducting-error"
            aria-live="polite"
            className="text-red-600"
          >
            {state.errors?.conducting?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>

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
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {isPending ? "Creating..." : "Create Meeting"}
        </button>

      </form>
    </main>
  );
}