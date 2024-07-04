import { useRef } from "react";
import { hightlightsSlides } from "../constant";
import { useState } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
const VideoCarosel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnded: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { isEnded, startPlay, videoId, isLastVideo, isPlaying } = video;
  useGSAP(() => {
    gsap.to(
      "#video",
      {
        scrollTrigger: {
          triger: "#video",
          toggleActions: "restart none none none",
        },
        onComplete:()=>{
          setVideo((vid)=>({...vid,startPlay:true,isPlaying:true}));
        }
      },
    );
  }, []);
  useEffect(() => {
    if(loadedData.lenght>3){
      isPlaying ?startPlay && videoRef.current[videoId].play():videoRef.current[videoId].pause();
    }
  }, [startPlay, videoId, isPlaying, loadedData]);
  const handleLoadedMetadata = (i,e)=>{
    setLoadedData((pre)=>[...pre,e])
  };
  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress());
        },
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);
  const handleProcess = (videoState) => {
    switch (videoState) {
      case "video-end":
        setVideo((elm) => ({ ...elm, isEnded: true }));
        break;
      case "video-last":
        setVideo((elm) => ({ ...elm, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((elm) => ({ ...elm, videoId: 0 }));
        break;
      case "play":
        setVideo((elm) => ({ ...elm, isPlaying: !isPlaying }));
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((elm, index) => (
          <div id="slider" key={elm.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="rounded-3xl overflow-hidden bg-black flex-center h-full w-full">
                <video
                  id="video"
                  muted
                  playsInline={true}
                  preload="auto"
                  ref={(elm) => (videoRef.current[index] = elm)}
                  onPlay={() =>
                    setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))
                  }
                  onLoadedMetadata={(e)=>handleLoadedMetadata(index,e)}
                >
                  <source src={elm.video} />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10 ">
                {elm.textLists.map((txt) => (
                  <div key={txt} className="md:text-2xl text-xl font-medium">
                    {txt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="bg-gray-300 backdrop-blur py-5 px-7 flex-center rounded-full">
          {
          videoRef.current.map((_, i) => (
            <span
              ref={(elm) => (videoDivRef.current[i] = elm)}
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                ref={(elm) => (videoSpanRef.current[i] = elm)}
                key={i}
                className="absolute h-full w-full "
              ></span>
            </span>
          ))
          }
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={() =>
              handleProcess(
                isLastVideo ? "video-reset" : !isPlaying ? "play" : "pause"
              )
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarosel;
