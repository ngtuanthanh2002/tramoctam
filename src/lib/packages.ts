export type PackageOption = {
  id: string;
  label: string;
  price: number;
};

export const PACKAGES: PackageOption[] = [
  {
    id: "1",
    label: "✅Mua 1 Hộp: 169K - 30K Ship",
    price: 169000,
  },
  {
    id: "2",
    label: "✅Mua 2 Hộp: 299K - 30K Ship",
    price: 299000,
  },
  {
    id: "3",
    label: "✅Mua 3 Tặng 1 (Tổng 4 Hộp): 399K - 30K Ship",
    price: 399000,
  },
];
