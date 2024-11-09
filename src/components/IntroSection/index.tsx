import { useCallback, useEffect, useRef, useState } from "react";
import { cashBack, iphoneWelcomeSection } from "../../../public/data.json"
import { getWindowSize, Size } from "../getSize";
import gsap from "gsap";

export default function IntroSection({ isDark }: { readonly isDark: boolean }) {
  // get current window size
  const ribbonRef = useRef<HTMLElement | null>(null);
  const parasRef = useRef<HTMLParagraphElement[]>([]);

  // so we can create responsive design
  const windowSize: Size = getWindowSize();
  const isVideoVisible: boolean = windowSize.width >= 1024;
  const [isVideoEnded, setVideoEnded] = useState<boolean>(false);

  useEffect(() => {
    if (parasRef.current.length < 2 && ribbonRef.current == null) return;
    const element: Array<HTMLElement | HTMLParagraphElement> = [ribbonRef.current, ...parasRef.current];
    if (isVideoEnded) {
      if (!isVideoVisible) return;
      console.info("Ended")
      gsap.to(element, {
        opacity: 1,
        scale: 1,
        stagger: 0.33,
        duration: 0.33,
      })
    }
    else {
      if (!isVideoVisible) {
        element.forEach((e) => { e.style.transform = 'scale(1)'; e.style.opacity = '1'; })
        return;
      }
      element.forEach((e) => { e.style.transform = 'scale(0)'; e.style.opacity = '0'; })
    }
  });

  const handleLoadVideo = () => { setVideoEnded(false) }
  const handleEndOfVideo = () => {
    setVideoEnded(true)
  }

  return (
    <section className="h-[130vh]">
      <nav ref={ribbonRef} className={`max-h-24 overflow-hidden transform-gpu duration-500 transition ease-out text-center p-4 font-light text-sm text-balance w-full`} style={{ backgroundColor: 'var(--bg-color)' }}>
        <p>{cashBack}</p>
      </nav>
      <div className="items-center flex flex-col">
        <p ref={(el: HTMLParagraphElement) => { if (el != null) parasRef.current.push(el) }} className="mt-6 md:mt-16 lg:mt-12 font-semibold text-xl object-center z-10">{iphoneWelcomeSection.heading[0]}</p>
        <p ref={(el: HTMLParagraphElement) => { if (el != null) parasRef.current.push(el) }} className="md:text-lg lg:text-2xl welcome-heading font-semibold text-2xl object-center z-10">{iphoneWelcomeSection.heading[1]}</p>
        <div className="videoContainer absolute pt-16 top-0 left-0 flex justify-center items-center w-full h-[130vh] bg-black light:bg-white -z-10 overflow-hidden ">
          {isVideoVisible && <IntroVideo src={iphoneWelcomeSection.video} alt={iphoneWelcomeSection.heading[1]} onLoadedData={handleLoadVideo} onEnded={handleEndOfVideo} className="absolute bg-black min-w-[100vw] object-center text-2xl text-gray-800" />}
          <img src={iphoneWelcomeSection.imageH} alt={iphoneWelcomeSection.heading[1]} className="w-full scale-0 md:scale-100 lg:scale-0 absolute md:static lg:absolute" />
          <img src={iphoneWelcomeSection.imageV} alt={iphoneWelcomeSection.heading[1]} className="scale-100 md:scale-0 md:absolute" />
        </div>
        <div className="h-[60vh] md:h-[65vh] lg:h-[70vh]"></div>
        <div className="text-center text-gray-400">
          <button className="hover:bg-[#0071e3] bg-[#2563eb] rounded-[2rem] py-[0.6rem] px-4 grow-0 text-gray-100 ">Buy</button>
          <p className="h-4 md:h-8"></p>
          <p >{iphoneWelcomeSection.offer[0]}</p>
          <p >{iphoneWelcomeSection.offer[1]}</p>
        </div>
      </div>
    </section >
  )
}

function IntroVideo({ src, alt, className, onEnded, onLoadedData }: { src: string, alt: string, className: string, onEnded: (e) => unknown, onLoadedData: () => unknown }) {
  return (
    <video autoPlay={true} muted={true} preload="metadata" src={src} aria-label={alt} className={className} onEnded={onEnded} onLoadedData={onLoadedData} controls={false}>
      <p>{alt}</p>
    </video>
  )
}

