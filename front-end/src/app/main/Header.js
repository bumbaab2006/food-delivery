import Logo from "../_icons/logo";
export default function Header() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[68px] justify-between opacity-100 pt-2 pb-2 pr-[88px] pl-[88px] flex bg-black items-center">
        <Logo />
        <div className="w-[152.813px] h-9 gap-[12.81px] opacity-100 flex"></div>
      </div>
      <div className="w-full h-[900px] bg-[url('/mainPageHeaderImage.png')] bg-cover bg-center"></div>
    </div>
  );
}
