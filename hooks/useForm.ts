import { RegisterOptions, SubmitHandler, UseFormProps, useForm as useRHF } from "react-hook-form";

const useForm = (props?: UseFormProps) => {
    const { register, ...rest } = useRHF({ mode: 'onBlur', ...props})

    const extendedRegister = (name: string, rules: RegisterOptions) => {
        const returns = register(name, rules)

        return {
            ...returns,
            required: !!rules.required
        }
    } 

    return {
        register: extendedRegister,
        ...rest
    }
};

export type {
    SubmitHandler
}

export {
    useForm
}