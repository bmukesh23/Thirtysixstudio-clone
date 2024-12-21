const About = () => {
    return (
        <section>
            <h1 className="text-5xl lg:text-7xl xl:text-8xl">About the brand</h1>
            <p className="text-sm xl:text-4xl xl:w-4/5 my-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
                culpa dicta facere ipsa esse sint impedit velit praesentium
                voluptatibus molestiae!
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-between bg-yellow-500 px-6 lg:px-10 lg:gap-10 rounded-2xl">
                <img
                    className="w-full lg:w-1/2 rounded-xl my-8 lg:my-20"
                    alt="mobile image"
                    src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
                />
                <p className="text-black text-sm xl:text-2xl w-full lg:w-1/2 text-justify mb-10">
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
        </section>
    )
}
export default About