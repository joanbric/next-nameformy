import SVGBottle from "./imgs/bottle";

export default function Header() {
  return <header className="bg-[34373E] min-h-16 px-4 py-2 mt-6 mb-12 flex items-center"> <a href="/" className="font-[family-name:var(--font-calistoga)] relative">NameForMy<SVGBottle className="w-16 h-16 absolute top-1/2 translate-y-[-2.5rem] left-1/2 translate-x-[0.5rem]" /></a></header>;
}