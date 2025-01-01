import { LineGraphic } from "../components/LineGraphic/LineGraphic.tsx";
import Card from "../components/Card/Card.tsx";
import { ModalActionKind, modalReducer } from "../components/Modal/modalReducer";
import { useReducer } from "react";
import Button from "../components/Button/Button";
import useToast from "../hooks/useToast";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../components/Toast/Toast";
import Modal from "../components/Modal/Modal";

const Home = () => {
    const modalFooterButton = (
        <Button type="primary" onClick={() => null}>Button</Button>
    )
    const [state, dispatch] = useReducer(modalReducer, { isShowing: false })

    const [notify] = useToast()
    return (
        <>
            <div className="container flex relative py-36 justify-center mx-auto max-w-7xl">
                <LineGraphic />
                <div className="z-10">
                    <h1 className="mr-48 text-nowrap">Rapid React</h1>
                    <h1 className="ml-48 text-nowrap">Pipeline Tool</h1>
                </div>
            </div>
            <div className="container mt-5 mx-auto grid grid-cols-6 gap-5 max-w-7xl">
                <Card className="col-span-full lg:col-span-2">Card 1</Card>
                <Card className="col-span-full sm:col-span-3 lg:col-span-2">Card 2</Card>
                <Card className="col-span-full sm:col-span-3 lg:col-span-2">Card 3</Card>

                <Card className="col-span-full md:col-span-3">
                    <Button type="primary" onClick={() => notify("warn", "warning")}>Notify Me</Button>
                </Card>
                <Card className="col-span-full md:col-span-3">
                    <Button type={"primary"} onClick={() => dispatch({ type: ModalActionKind.TOGGLE })}>Show Modal</Button>
                </Card>
            </div>
            <Modal show={state.isShowing} onClose={() => dispatch({ type: ModalActionKind.TOGGLE })} title="Example modal" footerButton={modalFooterButton}>
                <Card>
                    <p>Modal</p>
                </Card>
            </Modal>
            <Toast />
        </>
)
    ;
};

export default Home;
