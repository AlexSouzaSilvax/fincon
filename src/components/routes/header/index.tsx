import edigitalLogo from "@/assets/edigital-logo.svg";
//import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
//import HeaderMenu from "./header-menu";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full px-4 h-[60px] bg-background shadow-md flex items-center justify-between sticky top-0 z-50 border-b">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={edigitalLogo} className="flex-1 max-w-[30px] max-h-[30px]" />
        <h1 className="text-lg font-semibold">fincon</h1>
      </div>

      <div className="flex items-center gap-4">
        {/*<ModeToggle /> 
        <HeaderMenu />
        */}
        <h1>Header</h1>
      </div>
    </header>
  );
}
