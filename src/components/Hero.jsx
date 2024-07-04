import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import { useState, useEffect } from "react";
const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrcSet = () => {
    setVideoSrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("reisze", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to(".hero-title", {
      opacity: 1,
      //   ease: "power1",
      delay: 1,
    });
    gsap.to("#cns", {
      y: -50,
      opacity: 1,
      delay: 1,
    });
  });
  return (
    <section className="bg-black w-full nav-height relative">
      <div className="flex flex-center h-5/6  flex-col  w-full">
        <p className="hero-title">iPhone 15 Pro</p>
        <div className="w-9/12 md:10/12">
          <video
            autoPlay
            muted
            playsInline={true}
            key={videoSrc + "iPhone-15-video"}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          
        </div>
      </div>
      <div
            id="cns"
            className="opacity-0 flex flex-col items-center translate-y-20"
          >
            <a href="#highlights" type="btn" className="btn">
              Buy
            </a>
            <p className="font-normal text-xl">From $199/month or $1999</p>
          </div>
    </section>
  );
};

export default Hero;
