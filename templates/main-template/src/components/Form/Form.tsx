import { ZodType } from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button.tsx";
import InputFieldWrapper from "./Inputs/InputFieldWrapper.tsx";
import "./Form.css"
import { ReactNode } from "react";

export interface FormField {
    name: string;
    label: string;
    type: "text" | "email" | "number" | "password" | "checkbox" | "radio" | "select" | "date" | "time" | "datetime";
    options?: { value: string, label: string }[];
    required?: boolean;
    customComponent?: ReactNode;
}

interface FormProps<T extends FieldValues> {
    title?: string
    fields: FormField[];
    submitText?: string;
    cancellable: boolean;
    schema: ZodType<T>;
    onSubmit: SubmitHandler<T>;
    onCancel?: () => void;
}

const Form = <T extends Record<string, unknown>>(props: FormProps<T>) => {
    const { register, handleSubmit, formState: { errors } } = useForm<T>({ resolver: zodResolver(props.schema) });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="form">
            {props.title ? <h2>{props.title}</h2> : null}
            <div className="form-fields">
                {props.fields.map((field: FormField) => (
                    <InputFieldWrapper
                        key={field.name}
                        field={field}
                        register={register}
                        error={errors[field.name as keyof T]?.message as string}
                    />
                ))}
            </div>
            <div className="form-actions">
                {props.cancellable ? (<Button type="secondary" onClick={props.onCancel}>Cancel</Button>) : <div></div>}
                <Button type="primary">{props.submitText ?? "Submit"}</Button>
            </div>
        </form>
    );
};

export default Form;
