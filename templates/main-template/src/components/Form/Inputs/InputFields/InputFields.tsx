import { FieldValues, UseFormRegister } from "react-hook-form";
import React, { useState } from "react";
import Button from "../../../Button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface DefaultInputProps<T extends FieldValues> {
    registerOptions: ReturnType<UseFormRegister<T>>;
    error: string | undefined;
}

interface MultiOptionProps<T extends FieldValues> extends DefaultInputProps<T> {
    options: { value?: string; label: string }[];
}

interface TextFieldProps<T extends FieldValues> extends DefaultInputProps<T> {
    type: "text" | "email" | "password";
}

interface DateTimeProps<T extends FieldValues> extends DefaultInputProps<T> {
    type: "date" | "time" | "datetime-local"
}



export const Select = <T extends FieldValues>(props: MultiOptionProps<T>) => {
    const { options, registerOptions, error } = props;

    return (
        <select className={`input ${error ? "error" : ""}`} {...registerOptions}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};



export const Checkbox = <T extends FieldValues>(props: MultiOptionProps<T>) => {
    const { options, registerOptions } = props;
    return (
      <div className="option-group">
        {options?.map((option, index) => (
          <label key={index} className="option">
            <input type="checkbox" {...registerOptions} />
            {option.label}
          </label>
        ))}
      </div>
    );
};


export const Radio = <T extends FieldValues>(props: MultiOptionProps<T>) => {
    const { options, registerOptions } = props;
    return (
        <div className="option-group">
            {options?.map((option, index) => (
                <label key={index} className="option">
                    <input type="radio" {...registerOptions} value={option.value} />
                    {option.label}
                </label>
            ))}
        </div>
    );
};



export const Text = <T extends FieldValues>({ registerOptions, type, error }: TextFieldProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="input-wrapper relative">
            <input
                className={`input ${type === "password" ? "pr-[3rem]" : ""} ${error ? "error" : ""}`}
                type={type === "password" && showPassword ? "text" : type} {...registerOptions}
            />
            {type === "password" && (
                <Button className="absolute right-2 p-1" onClick={togglePassword} type="icon">
                    {showPassword ? <FaEye size={24} color="#333" /> : <FaEyeSlash size={24} color="#333" />}
                </Button>
            )}
        </div>
    );
};


export const Number = <T extends FieldValues>({ registerOptions, error }: DefaultInputProps<T>) => {
    return (
        <input className={`input ${error ? "error" : ""}`} type="number" {...registerOptions} />
    );
};

export const DateTime = <T extends FieldValues>({ registerOptions, error, type }: DateTimeProps<T>) => {
    return (
        <input className={`input max-w-fit${error ? "error" : ""}`} type={type} {...registerOptions} />
    );
};