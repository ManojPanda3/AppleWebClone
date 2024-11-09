import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import IntroSection from "../components/IntroSection";
import HighlightSection from "../components/HighlightSection";
import TakeALook from "../components/closerLook";

const Index = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // learn if the default color is dark or !
  useEffect(() => setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches), [])
  return (
    <div className="p-0 m-0 w-full h-auto min-w-[340px]">
      <NavBar isDark={isDark} />
      <IntroSection isDark={isDark} />
      <HighlightSection isDark={isDark} />
      <TakeALook />
    </div>
  )
}

export default Index;
