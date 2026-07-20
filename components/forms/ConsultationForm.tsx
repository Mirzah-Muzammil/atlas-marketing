"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { consultationSchema, type ConsultationValues } from "@/utils/consultationSchema";

type ConsultationFormProps = {
  onSubmit?: (values: ConsultationValues) => void | Promise<void>;
};

export function ConsultationForm({ onSubmit }: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const { formState: { errors, isSubmitting }, handleSubmit, register } = useForm<ConsultationValues>({
    defaultValues: { name: "", email: "", destination: "" },
    resolver: zodResolver(consultationSchema),
  });

  const submit = handleSubmit(async (values) => {
    await onSubmit?.(values);
    setSubmitted(true);
  });

  if (submitted) {
    return <div aria-live="polite" className="grid min-h-80 place-items-center rounded-[2rem] bg-white p-8 text-center text-primary-deep"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success text-white"><Check className="h-6 w-6" /></span><h3 className="mt-6 text-3xl font-semibold tracking-[-0.045em]">You’re on the Atlas.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted">Your details are ready for the consultation integration. The backend can now receive this typed submission.</p></div></div>;
  }

  return (
    <form className="rounded-[2rem] bg-white p-6 text-left text-primary-deep shadow-soft md:p-8" noValidate onSubmit={submit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div><label className="text-xs font-bold tracking-[0.12em]" htmlFor="consultation-name">YOUR NAME</label><input aria-describedby={errors.name ? "consultation-name-error" : undefined} aria-invalid={Boolean(errors.name)} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/10" id="consultation-name" placeholder="Asha Mehta" {...register("name")} />{errors.name && <p className="mt-2 text-xs text-accent" id="consultation-name-error">{errors.name.message}</p>}</div>
        <div><label className="text-xs font-bold tracking-[0.12em]" htmlFor="consultation-email">EMAIL</label><input aria-describedby={errors.email ? "consultation-email-error" : undefined} aria-invalid={Boolean(errors.email)} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/10" id="consultation-email" inputMode="email" placeholder="asha@example.com" type="email" {...register("email")} />{errors.email && <p className="mt-2 text-xs text-accent" id="consultation-email-error">{errors.email.message}</p>}</div>
      </div>
      <div className="mt-5"><label className="text-xs font-bold tracking-[0.12em]" htmlFor="consultation-destination">WHERE ARE YOU THINKING OF STUDYING?</label><input aria-describedby={errors.destination ? "consultation-destination-error" : undefined} aria-invalid={Boolean(errors.destination)} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/10" id="consultation-destination" placeholder="United Kingdom" {...register("destination")} />{errors.destination && <p className="mt-2 text-xs text-accent" id="consultation-destination-error">{errors.destination.message}</p>}</div>
      <button className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-65" disabled={isSubmitting} type="submit"><span>{isSubmitting ? "Preparing…" : "Request a consultation"}</span><ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
      <p className="mt-4 text-center text-xs leading-5 text-muted">No pressure. Just a clearer view of your next step.</p>
    </form>
  );
}
