"use client";

import { useEffect, useState } from "react";

const reply =
  "Absolutely. Your visa checklist is connected to your flight date. The remaining item is your TB certificate.";

type ChatStep = "typing" | "checklist" | "complete";

export function ConciergeChatDemo() {
  const [step, setStep] = useState<ChatStep>("typing");
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) {
      setStep("complete");
      setTypedLength(reply.length);
      return;
    }

    let typingTimer: ReturnType<typeof setInterval> | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const startConversation = () => {
      setStep("typing");
      setTypedLength(0);

      timers.push(
        setTimeout(() => {
          typingTimer = setInterval(() => {
            setTypedLength((length) => {
              if (length >= reply.length) {
                if (typingTimer) clearInterval(typingTimer);
                return length;
              }

              return length + 1;
            });
          }, 16);
        }, 700),
      );
      timers.push(setTimeout(() => setStep("checklist"), 2600));
      timers.push(setTimeout(() => setStep("complete"), 3900));
      timers.push(setTimeout(startConversation, 7600));
    };

    startConversation();

    return () => {
      if (typingTimer) clearInterval(typingTimer);
      timers.forEach(clearTimeout);
    };
  }, []);

  const assistantReply = step === "typing" ? reply.slice(0, typedLength) : reply;

  return (
    <div
      aria-label="Example Concierge conversation"
      className="concierge-chat-demo relative isolate overflow-hidden rounded-[22px] border border-white/[0.11] bg-[#0c0c0e] shadow-[0_28px_100px_rgba(0,0,0,.42)]"
      data-concierge-chat-demo
    >
      <div className="flex h-12 items-center justify-between border-b border-white/[0.07] bg-white/[0.018] px-4 sm:px-5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-medium tracking-[0.02em] text-white/42">
          Atlas Concierge
        </span>
        <span className="rounded-full border border-[#f35a02]/25 bg-[#f35a02]/10 px-2 py-1 text-[10px] font-medium text-[#ff7c36]">
          Secure
        </span>
      </div>

      <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,#f89b67,#f35a02_58%,#752000)] text-xs font-semibold text-white"
          >
            AM
          </span>
          <div>
            <p className="text-sm font-medium text-white">Aisha Malik</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/48">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#f35a02]" />
              Your UK arrival specialist
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-[390px] space-y-4 px-5 py-6 sm:px-6">
        <div className="max-w-[78%] rounded-2xl rounded-tl-md border border-white/[0.08] bg-white/[0.055] px-4 py-3 text-sm leading-6 text-white/84">
          My CAS arrived and I fly in six weeks.
        </div>

        <div aria-live="polite" className="ml-auto max-w-[85%]">
          {typedLength === 0 ? (
            <div
              aria-label="Aisha is typing"
              className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tr-md bg-[#f35a02] px-4 py-3"
            >
              <span className="concierge-chat-dot size-1.5 rounded-full bg-white/75" />
              <span className="concierge-chat-dot size-1.5 rounded-full bg-white/75 [animation-delay:140ms]" />
              <span className="concierge-chat-dot size-1.5 rounded-full bg-white/75 [animation-delay:280ms]" />
            </div>
          ) : (
            <p
              key={step}
              className="concierge-chat-response rounded-2xl rounded-tr-md bg-[#f35a02] px-4 py-3 text-sm leading-6 text-white"
            >
              {assistantReply}
              {step === "typing" && typedLength < reply.length ? (
                <span aria-hidden="true" className="ml-0.5 inline-block h-3.5 w-px bg-white/90 align-[-2px]" />
              ) : null}
            </p>
          )}
        </div>

        {step === "checklist" || step === "complete" ? (
          <div className="concierge-chat-response ml-auto max-w-[85%] rounded-xl border border-[#f35a02]/22 bg-[#f35a02]/[0.07] p-3">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-medium text-white/86">Visa checklist updated</span>
              <span className="text-[#ff7c36]">1 item left</span>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-white/46">
              TB certificate before your application can be submitted.
            </p>
          </div>
        ) : null}

        {step === "complete" ? (
          <p className="concierge-chat-response ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-[#f35a02] px-4 py-3 text-sm leading-6 text-white">
            I will prepare the full application for your review tomorrow.
          </p>
        ) : null}
      </div>

      <div className="border-t border-white/[0.07] px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/25 px-3 py-2.5 text-xs text-white/32">
          <span>Message Aisha</span>
          <span className="rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[10px] text-white/46">↵</span>
        </div>
      </div>
    </div>
  );
}
