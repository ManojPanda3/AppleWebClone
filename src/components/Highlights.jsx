import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { watchImg } from "../utils";
import VideoCarosel from "./VideoCarosel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    gsap.to(".link", {
      y: 0,
      opacity: 1,
      stagger: 1 / 2,
      duration: 1,
    });
  }, []);
  return (
    <section className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width w-full">
        <div className="flex justify-between max-md:flex-col ">
          <h1 id="title" className="section-heading">
            Get the heighlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="flex min-w-[9.8rem] link">
              Watch The Film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="flex min-w-[9.8rem] link">
              Watch The Event
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarosel />
      </div>
    </section>
  );
};

export default Highlights;
