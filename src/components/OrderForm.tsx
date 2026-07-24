"use client";

import { FormEvent, useState } from "react";
import { PACKAGES } from "@/lib/packages";

type OrderFormProps = {
  id?: string;
};

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzanZyy1-EGW9sGAlk_hrIN2vTdz7eC6NryYVe_R1tUaQUxK3NnuS1FdoHhSRnQIC-b/exec";

export default function OrderForm({ id = "order-form" }: OrderFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [packageId, setPackageId] = useState(PACKAGES[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) return;

    const selected = PACKAGES.find((p) => p.id === packageId);
    if (!selected) return;

    setSubmitting(true);
    setError("");

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      packageLabel: selected.label,
      price: selected.price,
    };

    try {
      // text/plain tránh preflight CORS với Google Apps Script
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "Gửi đơn thất bại");
      }

      setShowSuccess(true);
      setFullName("");
      setPhone("");
      setAddress("");
      setPackageId(PACKAGES[0].id);
    } catch {
      setError("Không gửi được đơn. Vui lòng thử lại hoặc gọi hotline.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section
        id={id}
        className="w-full bg-brand-blue px-3 pb-5 pt-4 text-white sm:px-4"
        aria-labelledby={`${id}-heading`}
      >
        <div className="mx-auto w-full max-w-[480px]">
          <div className="mb-3 border-t border-dashed border-white/70 pt-3">
            <h2
              id={`${id}-heading`}
              className="flex items-start gap-2 text-center text-[14px] font-bold uppercase leading-snug tracking-wide sm:text-[15px]"
            >
              <span aria-hidden className="mt-0.5 shrink-0 text-lg">
                🛒
              </span>
              <span className="flex-1">
                VUI LÒNG ĐIỀN THÔNG TIN BÊN DƯỚI ĐỂ MUA VỚI GIÁ ƯU ĐÃI
              </span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="sr-only" htmlFor={`${id}-name`}>
              Họ và tên
            </label>
            <input
              id={`${id}-name`}
              name="full_name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Họ và tên"
              disabled={submitting}
              className="h-11 w-full rounded-lg border-0 bg-white px-4 text-[15px] text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-70"
            />

            <label className="sr-only" htmlFor={`${id}-phone`}>
              Số điện thoại
            </label>
            <input
              id={`${id}-phone`}
              name="phone_number"
              type="tel"
              inputMode="numeric"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
              disabled={submitting}
              className="h-11 w-full rounded-lg border-0 bg-white px-4 text-[15px] text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-70"
            />

            <label className="sr-only" htmlFor={`${id}-address`}>
              Địa chỉ
            </label>
            <input
              id={`${id}-address`}
              name="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Địa chỉ"
              disabled={submitting}
              className="h-11 w-full rounded-lg border-0 bg-white px-4 text-[15px] text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-70"
            />

            <fieldset
              className="rounded-lg bg-white p-3 text-gray-800"
              disabled={submitting}
            >
              <legend className="sr-only">Chọn gói mua</legend>
              <div className="flex flex-col gap-2.5">
                {PACKAGES.map((pkg) => (
                  <label
                    key={pkg.id}
                    className="flex cursor-pointer items-start gap-2.5 text-[14px] leading-snug sm:text-[15px]"
                  >
                    <input
                      type="radio"
                      name={`${id}-package`}
                      value={pkg.id}
                      checked={packageId === pkg.id}
                      onChange={() => setPackageId(pkg.id)}
                      className="mt-1 h-4 w-4 shrink-0 accent-brand-green"
                      required
                    />
                    <span>{pkg.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {error && (
              <p className="rounded-lg bg-red-600/90 px-3 py-2 text-center text-[13px] text-white">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="animate-pulse-cta flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-base font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[var(--brand-green-dark)] disabled:cursor-not-allowed disabled:opacity-80 disabled:animate-none"
            >
              {submitting ? (
                <>
                  <span
                    className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden
                  />
                  <span>ĐANG GỬI...</span>
                </>
              ) : (
                "ĐẶT MUA NGAY"
              )}
            </button>
          </form>
        </div>
      </section>

      {showSuccess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-success-title`}
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl">
            <div
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-3xl text-brand-green"
              aria-hidden
            >
              ✓
            </div>
            <h3
              id={`${id}-success-title`}
              className="mb-2 text-xl font-bold text-gray-900"
            >
              Đã đặt mua thành công!
            </h3>
            <p className="mb-5 text-[15px] leading-relaxed text-gray-600">
              Cảm ơn anh/chị đã đặt hàng. Vui lòng để ý điện thoại, chúng tôi sẽ
              liên hệ xác nhận ngay!
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="h-11 w-full rounded-lg bg-brand-green font-semibold text-white"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
