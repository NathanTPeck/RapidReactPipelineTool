import { LineGraphic } from "../components/LineGraphic/LineGraphic.tsx";
import Card from "../components/Card/Card.tsx";

const Home = () => {
    return (
        <>
            <div className="container flex relative py-36 justify-center max-w-8xl mx-auto">
                <LineGraphic />
                <div className="relative z-10">
                    <h1 className="mr-48">Rapid React</h1>
                    <h1 className="ml-48">Pipeline Tool</h1>
                </div>
            </div>
            <div className="container mt-5 mx-auto max-w-8xl grid grid-cols-6">
                <Card className="col-span-full lg:col-span-2">Card 1</Card>
                <Card className="col-span-full sm:col-span-3 lg:col-span-2">Card 2</Card>
                <Card className="col-span-full sm:col-span-3 lg:col-span-2">Card 3</Card>

                <Card className="col-span-full lg:col-span-3">Card 1</Card>
                <Card className="col-span-full lg:col-span-3">Card 2</Card>
            </div>
        </>
)
    ;
};

export default Home;
