import { useEffect, useState, useRef } from "react";
import Canvas from "./Canvas";
import data from "./data";
import Navbar from "./Navbar";
import About from "./About";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import Footer from "./Footer";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  const mouseRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    new LocomotiveScroll();
  }, [showCanvas]);

  // Text animation
  useEffect(() => {
    const header = headingRef.current;
    const text = header.textContent;
    header.innerHTML = text
      .split("")
      .map((letter) => `<span class="letter inline-block">${letter === " " ? "&nbsp;" : letter}</span>`)
      .join("");

    gsap.fromTo(
      ".letter",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      }
    );
  }, []);

  // Growing span animation
  useEffect(() => {
    const handleClick = (e) => {
      gsap.to(mouseRef.current, {
        backgroundColor: "white"
      });

      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY - 20,
            left: e.clientX - 20,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(mouseRef.current, {
            backgroundColor: "#fd2c2a"
          });
        }

        return !prevShowCanvas;
      });
    };

    const targetElement = mainRef.current;
    targetElement.addEventListener("click", handleClick);

    return () => targetElement.removeEventListener("click", handleClick);
  }, []);

  // Mouse animation
  useEffect(() => {
    const mainElement = mainRef.current;
    let mouseStopTimeout;

    const handleMouseMove = (e) => {
      clearTimeout(mouseStopTimeout);

      gsap.to(mouseRef.current, {
        x: e.clientX + 10,
        y: e.clientY + 10,
        duration: 1,
        ease: "back.out",
        overwrite: "auto",
      });

      gsap.to(mouseRef.current, {
        scale: 1,
        backgroundImage: "none",
      });

      mouseStopTimeout = setTimeout(() => {
        gsap.to(mouseRef.current, {
          scale: 4,
          backgroundImage: "url('https://thirtysixstudio.com/peppers/pepperA/57.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        });
      }, 500);
    };

    mainElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      mainElement.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(mouseStopTimeout);
    };
  }, []);

  return (
    <main
      data-scroll-container
      ref={mainRef}
      className="w-full min-h-screen mb-4"
    >
      <span
        ref={growingSpan}
        className="bg-red-600 block rounded-full fixed top-[-20px] left-[-20px] w-5 h-5"
      />

      <span
        ref={mouseRef}
        className="bg-customRed rounded-full fixed w-5 h-5 top-[-20px] left-[-20px] z-10"
      />

      <div className="relative">
        {showCanvas && data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <div className="w-full relative h-screen">
          <Navbar />

          <div className="w-full px-1 lg:px-[25%] py-12">
            <div className="w-full lg:w-[45%] flex flex-col gap-6">
              <h3 className="text-3xl">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-sm">
                {`We're a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.`}
              </p>
              <p>Scroll</p>
            </div>
          </div>

          <div className="w-full lg:pt-40 lg:pl-6 border-b border-slate-800 lg:pb-16">
            <h1 ref={headingRef} className="text-[8rem] lg:text-[14rem] leading-none">
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>

      <div className="relative mt-60 px-1 lg:px-10">
        {showCanvas && data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <About />
      </div>

      <Footer />
    </main>
  );
}

export default App;