import React, { useEffect, useRef } from 'react'
import RenderOnIntersect from '../RenderOnIntersect';

const HighlightSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <section>
      <div className="load-on-scroll flex flex-row justify-between lg:mx-24 md:mx-16 mx-8 mt-16 delay-100">
        <p className="font-bold lg:text-[2.5rem] md:text-3xl text-2xl">Get the highlights.</p>
        <p className="flex flex-row text-balance gap-2 text-blue-500 cursor-pointer">Watch the film <PlayIcon size={20} color={"#3b82f6"} />
        </p>
      </div>
      <HighLightVideo />
    </section>
  )
}

function HighLightVideo() {
  const videoRef = useRef<null | HTMLElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.addEventListener("scroll", () => {
      console.info("scroll", videoRef.current?.scrollLeft);
    })
    return () => videoRef.current?.removeEventListener("scroll", () => {
      console.info("scroll", videoRef.current.scrollLeft);
    })
  }, [])
  return <div className="flex overflow-x-auto" ref={videoRef}>
    <div className="lg:mx-24 md:mx-12 mx-6 mt-16 flex gap-8">
      {Array.from(Array(6)).map((_, i: number) =>
        <VideoSection
          key={"sdfj" + i.toString()}
          src="https://www.apple.com/v/iphone-16-pro/c/images/overview/media-card/highlights_dolby_endframe__b6l9i0s93wr6_medium.jpg"
          alt="videoSection"
          text="The first iPhone designed
        for Apple Intelligence.
        Personal, private,
        powerful"
        />)}
    </div>
  </div>
}

function VideoSection({ src, alt, text }: {
  src: string,
  alt: string,
  text: string
}) {
  return (
    <div className="relative w-[81vw] max-h-[36rem] rounded-3xl overflow-hidden h-[612px]">
      <p className='absolute top-10 left-10 max-w-80 text-lg font-bold leading-8 md:text-xl lg:text-2xl md:tracking-normal lg:tracking-wider'>{text}</p>
      <img className="object-cover w-full h-full" src={src} alt={alt} />
    </div>);
}
const PlayIcon = ({ size, color, className, playButtonColor = "none", playButtonBackground = "none" }: { size: number, color: string, className?: string, playButtonColor?: string, playButtonBackground?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={playButtonBackground} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill={playButtonColor} />
    </svg>
  );
}

export default HighlightSection 
