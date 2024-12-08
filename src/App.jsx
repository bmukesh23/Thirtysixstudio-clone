import { useEffect, useState, useRef } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const navbarRef = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    new LocomotiveScroll();
  }, []);

  useEffect(() => {
    // Animate Navbar
    gsap.fromTo(
      navbarRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    // Split text into individual spans for animation
    const header = headingRef.current;
    const text = header.textContent;
    header.innerHTML = text
      .split("")
      .map((letter) => `<span class="letter inline-block">${letter === " " ? "&nbsp;" : letter}</span>`)
      .join("");

    // Animate each letter on the y-axis
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

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
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
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing block rounded-full fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>

      <div className="w-full relative min-h-screen">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <div className="w-full relative h-screen z-[1]">
          <nav ref={navbarRef} className="w-full px-3 py-[14px] flex justify-between z-50 border-b border-slate-800">
            <div className="text-[15px]">Thirtysixstudio</div>
            <div className="flex gap-10">
              {["What we do", "Who we are", "How we give back", "Talk to us"].map(
                (link, index) => (
                  <a
                    key={index}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm hover:text-gray-300"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </nav>
          <div className="textcontainer w-full px-[25%] py-12">
            <div className="w-[45%] flex flex-col gap-6">
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
          <div className="w-full pt-40 pl-6 border-b border-gray-500 pb-16">
            <h1 ref={headingRef} className="text-[14rem] leading-none">
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-60 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}

        <h1 className="text-8xl">About the brand</h1>
        <p className="text-4xl w-4/5 my-10">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
          culpa dicta facere ipsa esse sint impedit velit praesentium
          voluptatibus molestiae!
        </p>

        <div className="flex items-center justify-between bg-green-600 px-10 gap-10 rounded-2xl">
          <img
            className="w-1/2 rounded-xl my-20"
            src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          />
          <p className="text-black text-2xl w-1/2 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            dolor possimus cupiditate enim odit rem omnis debitis assumenda
            deserunt, mollitia perspiciatis. Quo, officiis dolore distinctio,
            veniam commodi ut eveniet dicta repellat, aliquid architecto
            nesciunt odit iure nam aliquam cumque laboriosam voluptate
            blanditiis animi omnis eum sequi accusamus? Officiis accusamus
            dolores, aliquid beatae totam assumenda, ex facere nihil provident,
            quo atque vitae asperiores laboriosam unde. Omnis exercitationem
            atque nam deleniti tempora, hic veritatis voluptatem quisquam. Quia
            dolores similique voluptates, atque dolorem nihil earum,
            repudiandae voluptatum, facilis at quisquam. Eos, voluptate adipisci
            labore autem velit doloribus aperiam rerum eum veritatis! Ea,
            consectetur.
          </p>
        </div>
      </div>
      <div className="w-full h-screen" />
    </>
  );
}

export default App;