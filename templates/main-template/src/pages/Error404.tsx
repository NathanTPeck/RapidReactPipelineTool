import Button from "../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col flex-grow justify-center items-center gap-16">
            <h1>Page Not Found</h1>
            <Button type='primary' onClick={() => navigate("/")}>Return to Home Page</Button>
        </div>
    );
};

export default Error404;