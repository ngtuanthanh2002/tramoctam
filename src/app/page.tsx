import Image from "next/image";
import OrderForm from "@/components/OrderForm";
import StickyCta from "@/components/StickyCta";

const sections = [
  {
    src: "/images/hero.webp",
    alt: "Trà Mâm Xôi Sâm Tố Nữ Mộc Tâm – Cân bằng nội tiết, đẹp da, khỏe sinh sản",
    width: 768,
    height: 1376,
    priority: true,
  },
  {
    src: "/images/cam_nhan_khach_hang.webp",
    alt: "Cảm nhận thực tế của khách hàng về Trà Mâm Xôi Sâm Tố Nữ",
    width: 768,
    height: 1376,
  },
  {
    src: "/images/thanh_phan.webp",
    alt: "Các thành phần chính: Mâm Xôi, Ích Mẫu, Trinh Nữ Hoàng Cung, Cỏ Ngọt, Mộc Thông, Sâm Tố Nữ",
    width: 768,
    height: 1376,
  },
  {
    src: "/images/van_de_thuong_gap.webp",
    alt: "Vấn đề sức khỏe nữ giới thường gặp: mụn nội tiết, đau bụng kinh, rối loạn nội tiết",
    width: 768,
    height: 1376,
  },
  {
    src: "/images/ly_do_nen_chon.webp",
    alt: "Lý do nên chọn Trà Mâm Xôi Sâm Tố Nữ – 100% thảo mộc tự nhiên",
    width: 768,
    height: 1376,
  },
  {
    src: "/images/thong_so.webp",
    alt: "Thông số sản phẩm và hướng dẫn sử dụng Trà Mâm Xôi Sâm Tố Nữ",
    width: 768,
    height: 1376,
  },
] as const;

export default function Home() {
  return (
    <>
      <main className="mx-auto w-full max-w-[480px] bg-white pb-20">
        <h1 className="sr-only">Trà Mâm Xôi Sâm Tố Nữ Mộc Tâm</h1>

        {/* 1. Hero */}
        <section aria-label="Giới thiệu sản phẩm">
          <Image
            src={sections[0].src}
            alt={sections[0].alt}
            width={sections[0].width}
            height={sections[0].height}
            priority
            sizes="(max-width: 480px) 100vw, 480px"
            className="h-auto w-full"
          />
        </section>

        {/* 2. Form đặt hàng */}
        <OrderForm id="order-form" />

        {/* 3–7. Các section ảnh */}
        {sections.slice(1).map((section) => (
          <section key={section.src} aria-label={section.alt}>
            <Image
              src={section.src}
              alt={section.alt}
              width={section.width}
              height={section.height}
              sizes="(max-width: 480px) 100vw, 480px"
              className="h-auto w-full"
            />
          </section>
        ))}

        {/* 8. Chứng nhận */}
        <section
          aria-label="Giấy chứng nhận đảm bảo chất lượng"
          className="bg-white px-4 py-6"
        >
          <Image
            src="/images/chung_nhan.webp"
            alt="Giấy chứng nhận đảm bảo chất lượng ISO 22000 và an toàn vệ sinh thực phẩm"
            width={844}
            height={844}
            sizes="(max-width: 480px) 100vw, 480px"
            className="mx-auto h-auto w-full max-w-[420px]"
          />
        </section>

        {/* 9. Ưu đãi */}
        <section aria-label="Ưu đãi chỉ trong hôm nay">
          <a href="#order-form-bottom" className="block">
            <Image
              src="/images/uu_dai.webp"
              alt="Ưu đãi Trà Mâm Xôi: mua 1 hộp 169K, mua 2 hộp 299K, mua 3 tặng 1 chỉ 399K"
              width={938}
              height={1677}
              sizes="(max-width: 480px) 100vw, 480px"
              className="h-auto w-full"
            />
          </a>
        </section>

        {/* 10. Form cuối */}
        <OrderForm id="order-form-bottom" />
      </main>

      <StickyCta />
    </>
  );
}
