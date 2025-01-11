import Form, { FormField } from "../components/Form/Form";
import { z } from "zod";
import Card from "../components/Card/Card.tsx";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import { mockToken, mockUser } from "../services/auth/AuthContextProvider.tsx";
import { useEffect } from "react";

const Login = () => {
    const { setUser, setTokenInfo, user, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return (<img src="/loading.svg" className="m-auto"  alt="loading..."/>)
    }

    const fields: FormField[] = [
        {
            key: "email",
            label: "Email",
            type: "email",
            required: true,
        },
        {
            key: "password",
            label: "Password",
            type: "password",
            required: true,
        },
    ];

    const schema = z.object({
        email: z.string().email("Invalid email address").min(1, "Field is required"),
        password: z.string().min(8, "Must be at least 8 characters"), // Todo: super refine for pw strength
    });
    

    const handleSubmit = (data: z.infer<typeof schema>)=> {
        // ToDo send to backend
        setTokenInfo(mockToken);
        setUser({ ...mockUser, email: data.email });
        navigate("/home");
    }
    
    return (
        <Card className="w-full max-w-lg m-auto flex justify-center items-center flex-col">
            <Form
                title="Login"
                submitText="Log in"
                fields={fields}
                cancellable={false}
                schema={schema}
                onSubmit={handleSubmit}
            />
            <p className="mt-6">Don't have an account? <a className="underline text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>Register</a></p>
        </Card>
    );
};

export default Login;