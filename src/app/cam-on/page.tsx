import type { Metadata } from "next";
import Image from "next/image";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Đặt hàng thành công",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pick(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function formatPrice(price: string) {
  const n = Number(price);
  if (!price || Number.isNaN(n)) return price;
  return `${n.toLocaleString("vi-VN")}đ`;
}

export default async function CamOnPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const name = pick(params.name);
  const phone = pick(params.phone);
  const address = pick(params.address);
  const pkg = pick(params.package).replace(/^✅\s*/, "");
  const price = pick(params.price);
  const purchaseValue = Number(price);
  const hasOrder = Boolean(name || phone || address || pkg);

  return (
    <main className="min-h-screen bg-white">
      <MetaPixel
        purchaseValue={
          Number.isFinite(purchaseValue) && purchaseValue > 0
            ? purchaseValue
            : undefined
        }
      />

      <div className="relative mx-auto w-full max-w-[480px]">
        <Image
          src="/images/thanks.webp"
          alt="Đặt đơn hàng thành công - Mộc Tâm"
          width={909}
          height={1972}
          priority
          className="h-auto w-full select-none"
        />

        {hasOrder && (
          <div
            className="absolute left-[7%] right-[7%] top-[30%] flex flex-col gap-1.5 rounded-xl border border-[#c9a227]/35 bg-white/95 px-3.5 py-3 text-left shadow-sm sm:gap-2 sm:px-4 sm:py-3.5"
            aria-label="Thông tin đơn hàng"
          >
            <p className="mb-0.5 text-center text-[13px] font-bold uppercase tracking-wide text-[#c9a227] sm:text-[14px]">
              Thông tin đơn hàng
            </p>

            <InfoRow label="Họ và tên" value={name} />
            <InfoRow label="Số điện thoại" value={phone} />
            <InfoRow label="Địa chỉ" value={address} />
            <InfoRow label="Gói mua" value={pkg} />
            {price && <InfoRow label="Tổng tiền" value={formatPrice(price)} />}
          </div>
        )}
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <p className="text-[13px] leading-snug text-gray-800 sm:text-[14px]">
      <span className="font-semibold text-[#2e7d32]">{label}: </span>
      <span>{value}</span>
    </p>
  );
}
