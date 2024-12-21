const Footer = () => {
    return (
        <footer className="text-center border-t border-slate-800 mt-40">
            <div className="flex flex-col items-start sm:items-center justify-center text-sm gap-28 pt-4 md:pt-10">
                <div className="flex flex-col sm:flex-row gap-20 w-1/2 items-start sm:items-end justify-center">
                    <div className="pb-0 lg:pb-5">
                        <a href="https://www.linkedin.com" className="mx-0 sm:mx-4">Linkedin</a>
                        <a href="https://www.instagram.com" className="mx-4">Instagram</a>
                    </div>
                    <div className="flex flex-col text-left sm:text-pretty">
                        <p>hello@thirtysixstudio.com</p>
                        <p>Amsterdam and worldwide</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row-reverse gap-28 items-start justify-start">
                    <div className="flex flex-col items-start gap-4 justify-center text-[10px] lg:text-sm">
                        <button className="footer-btn">privacy statement</button>
                        <button className="footer-btn">Back to top</button>
                    </div>
                    <p className="w-[75%] lg:w-[28%] text-left">All Rights Reserved &copy; 2024</p>
                </div>
                <p className="text-3xl lg:pl-[30%] xl:pl-[22%]">Thirtysixstudio</p>
            </div>
        </footer>
    );
}

export default Footer;