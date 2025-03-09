import { LineGraphic } from "../components/LineGraphic/LineGraphic.tsx";
import Card from "../components/Card/Card.tsx";

const Home = () => {
    return (
        <div className="flex flex-col gap-40 mb-40 min-w-96">
            <Card className="container flex flex-col relative pt-24 pb-20 justify-center mx-auto max-w-6xl">
                <LineGraphic />
                <div className="z-10 backdrop-blur-sm mx-auto rounded-xl">
                    <h1 className="font-sans text-center"><b>Rapid</b> <i>React</i></h1>
                    <h1 className="font-serif text-center"><i>Pipeline</i> <b>Tool</b></h1>
                </div>
                <h2 className="mt-10 mx-auto text-center backdrop-blur-sm p-2">Effortlessly
                    create professional React frontends with best practices.</h2>
            </Card>
            <div className="container mx-auto grid lg:grid-cols-2 max-w-6xl gap-14">
                <div className="lg:order-2 flex flex-col gap-10 px-2 my-auto">
                    <div>
                        <h1 className="text-4xl font-bold">Kick off your web app...</h1>
                        <h1 className="text-right text-6xl font-bold">...the right way</h1>
                    </div>
                    <p className="text-secondary text-center">Spend less time building your frontend from the ground up.<br /> Focus on building <i>your</i> website.</p>
                </div>
                <Card className="order-1 bg-white">
                    <img src="/productivity.svg" alt="Productivity" />
                </Card>
            </div>
            <div className="container mx-auto grid grid-cols-6 gap-5 max-w-6xl text-center">
                <Card className="col-span-full lg:col-span-2 md:col-span-3 flex flex-col gap-4">
                    <img src="/custom.svg" alt="Customisable" className="mx-auto h-[200px]" />
                    <h2>Customisable Components</h2>
                    <p className="text-secondary">Create pages with ease. Focus on adding content instead of worrying about styling or building from scratch.</p>
                </Card>
                <Card className="col-span-full md:col-span-3 lg:col-span-2 flex-col flex gap-4">
                    <img src="/secure.svg" className="mx-auto h-[200px]" alt="Secure" />
                    <h2>Authentication Ready</h2>
                    <p className="text-secondary">Quickly implement your own authentication, saving hours of setup time for secure user flows.</p>
                </Card>
                <Card className="col-span-full md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                    <img src="/dark-mode.svg" className="mx-auto h-[200px]" alt="Dark Mode" />
                    <h2>Themes</h2>
                    <p className="text-secondary">Give users a seamless theme-switching experience while maintaining consistent styling across your app.</p>
                </Card>

                <Card className="col-span-full lg:col-span-2 md:col-span-3 flex flex-col gap-4">
                    <img src="/web-design.svg"  className="mx-auto h-[200px]" alt="Web Design" />
                    <h2>Best Practices</h2>
                    <p className="text-secondary">Learn professional-grade techniques. Improve your React skills while building scalable apps.</p>
                </Card>
                <Card className="col-span-full lg:col-span-2 md:col-span-3 flex flex-col gap-4">
                    <img src="/rocket.svg"  className="mx-auto h-[200px]" alt="Fast"/>
                    <h2>Rapid Setup</h2>
                    <p className="text-secondary">Start developing in minutes with pre-configured code. Skip tedious setup tasks and get straight to creating.</p>
                </Card>
                <Card className="col-span-full lg:col-span-2 md:col-span-3 flex flex-col gap-4">
                    <img src="/developer.svg" className="mx-auto h-[200px]" alt="Developer"/>
                    <h2>Developer Focused</h2>
                    <p className="text-secondary">Use the toolkit built for React enthusiasts and novices alike, with reusable code and intuitive design to make your workflow smoother.</p>
                </Card>
            </div>
        </div>
    );
};

export default Home;