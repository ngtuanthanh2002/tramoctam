"use client";

export default function StickyCta() {
  function scrollToForm() {
    const el =
      document.getElementById("order-form") ??
      document.getElementById("order-form-bottom");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <button
        type="button"
        onClick={scrollToForm}
        className="pointer-events-auto animate-pulse-cta h-12 w-full max-w-[480px] rounded-lg bg-brand-green text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-black/25"
      >
        Đặt mua ngay
      </button>
    </div>
  );
}
