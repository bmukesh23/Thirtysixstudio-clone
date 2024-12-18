import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
    const navbarRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(
            navbarRef.current,
            { y: "-100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <nav ref={navbarRef} className="w-full px-3 py-3 md:py-[14px] flex justify-between z-50 border-b border-slate-800">
            <div className="text-[15px]">Thirtysixstudio</div>
            <div className="flex items-center gap-10 lg:gap-10">
                <div className="hidden lg:flex gap-10">
                    {["What we do", "Who we are", "How we give back", "Talk to us"].map((link, index) => (
                        <a
                            key={index}
                            href={`#${link.toLowerCase()}`}
                            className="text-sm hover:text-gray-300"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <p className="text-[15px] lg:hidden flex flex-col items-center">Menu</p>
            </div>
        </nav>
    );
};

export default Navbar;
