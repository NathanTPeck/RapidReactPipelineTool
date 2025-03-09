import Form, { FormField } from "../components/Form/Form.tsx";
import { z } from "zod";
import Card from "../components/Card/Card.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { mockToken } from "../services/auth/AuthContextProvider.tsx";
import useAuth from "../hooks/useAuth.ts";

const Signup = () => {
    const navigate = useNavigate();
    const { user, isLoaded, setUser, setTokenInfo } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return (<img src="/loading.svg" className="m-auto"  alt="loading..."/>);
    }

    const fields: FormField[] = [
        {
            key: "name",
            label: "Name",
            type: "text",
            required: true,
        },
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
        {
            key: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            required: true,
        },
    ];

    const schema = z
        .object({
            name: z.string().min(1, "Field is required"),
            email: z.string().email("Invalid email address").min(1, "Field is required"),
            password: z.string().min(8, "Must be at least 8 characters"),
            confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ["confirmPassword"],
            message: "Passwords must match",
        });


    const handleSubmit = (data: z.infer<typeof schema>)=> {
        // ToDo send to backend
        setTokenInfo(mockToken);
        setUser({
            name: data.name,
            email: data.email,
        });
        navigate("/");
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <Card className="w-full max-w-lg m-auto flex flex-col justify-center items-center">
            <Form
                title="Sign up"
                submitText="Sign up"
                fields={fields}
                cancellable={false}
                schema={schema}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
            <p className="mt-6">Already have an account? <a className="underline text-blue-500 cursor-pointer"
                                                            onClick={() => navigate("/login")}>Login</a></p>
        </Card>
    );
};

export default Signup;