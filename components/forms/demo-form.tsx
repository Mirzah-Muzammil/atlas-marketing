"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { demoRequestSchema } from "@/lib/validation";

type FormData = z.infer<typeof demoRequestSchema>;

interface DemoFormProps {
  defaultPlan?: string;
  onSuccessCallback?: () => void;
}

export default function DemoForm({
  defaultPlan = "starter",
  onSuccessCallback,
}: DemoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      selectedPlan: defaultPlan,
      fullName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMsg = "Failed to submit request";
        try {
          const resData = await response.json();
          errorMsg = resData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      setIsSuccess(true);
      reset();
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full text-center py-4 space-y-4">
        <div className="w-16 h-16 bg-green-150 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">GGI Atlas</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          GGI Atlas. Free, end to end. London, UK.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Button
            onClick={() => setIsSuccess(false)}
            variant="secondary"
            className="cursor-pointer text-sm font-semibold py-2.5 rounded-xl"
          >
            Get started
          </Button>
          <label
            htmlFor="demo-modal-toggle"
            className="px-6 py-2.5 text-sm font-semibold text-white bg-black hover:bg-neutral-900 rounded-xl transition-all cursor-pointer select-none text-center flex items-center justify-center shadow-xs"
          >
            Close Window
          </label>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-5 text-left"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          Your operating system for studying and succeeding abroad.
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Free to start. Three minutes to set up. No card. No tier upgrades.
          Just the OS.
        </p>
      </div>

      {submitError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
              errors.fullName
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:ring-orange-200"
            } focus:border-primary outline-none focus:ring-4 transition-all`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
              errors.email
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:ring-orange-200"
            } focus:border-primary outline-none focus:ring-4 transition-all`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
              errors.phone
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:ring-orange-200"
            } focus:border-primary outline-none focus:ring-4 transition-all`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
          >
            University Matcher <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
            type="text"
            className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
              errors.company
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:ring-orange-200"
            } focus:border-primary outline-none focus:ring-4 transition-all`}
            {...register("company")}
          />
          {errors.company && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="selectedPlan"
          className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
        >
          Free, end to end <span className="text-red-500">*</span>
        </label>
        <select
          id="selectedPlan"
          className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
            errors.selectedPlan
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-200 focus:ring-orange-200"
          } focus:border-primary outline-none focus:ring-4 transition-all bg-white`}
          {...register("selectedPlan")}
        >
          <option value="starter">GGI Atlas OS — Free, end to end</option>
          <option value="pro">Concierge — £1,500 one-time</option>
        </select>
        {errors.selectedPlan && (
          <p className="text-xs text-red-500 mt-1 font-medium">
            {errors.selectedPlan.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
        >
          Profile (Optional)
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Your profile carries over."
          className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary outline-none focus:ring-4 focus:ring-orange-200 transition-all resize-none"
          {...register("message")}
        />
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full py-3 text-sm"
      >
        Get started
      </Button>
    </form>
  );
}
