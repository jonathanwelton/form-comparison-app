import React, { useEffect, useState } from 'react'

/**
 * Use form
 */
const formElements = new Object()

const useMyOwnForm = ({
    onSubmit
}) => {
    const [errors, setErrors] = useState<any>(new Object())
    const [form, setForm] = useState<HTMLElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [hasRunValidation, setHasRunValidation] = useState(false)

    const register = (registerProps) => {
        const { id, min, minLength, maxLength, name, required } = registerProps
        
        formElements[name] = {...registerProps}

        return {
            id: id ?? name,
            maxLength,
            min,
            minLength,
            name,
            onBlur: () => required && validate([formElements[name]]),
            onChange: handleChange,
            required: !!required,
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        console.log({ name, value })

        formElements[name].value = value;

        if (errors[name] && !!value) {
            validate([formElements[name]])
        }

    }

    const validate = (formElementsToValidate) => {
        setHasRunValidation(false)

        let errorsAfterValidation = new Object()

        formElementsToValidate.forEach(formElement => {
            const { min, minLength, maxLength, name, pattern, required } = formElement
        
            const element = document.getElementById(name) as HTMLInputElement

            if (!element) {
                console.log(formElement)

                return
            }

            const { value } = element

            const setAriaInvalid = (invalid: boolean) => element.setAttribute('aria-invalid', invalid ? 'true' : 'false')

            if (!!required) {
                if (!value) {

                    errorsAfterValidation[name] = required.message ?? 'Default error message'
                    setAriaInvalid(true)

                return
                } else {
                    errorsAfterValidation[name] = undefined
                    setAriaInvalid(false)
                }
            }

            if (!!minLength) {
                if (value.length < minLength.value) {
                    errorsAfterValidation[name] = minLength.message ?? 'Default min error message'
                    setAriaInvalid(true)
    
                   return element
                } else {
                    errorsAfterValidation[name] = undefined
                    setAriaInvalid(false)
                }
            }
            
            if (!!maxLength) {
                if (value.length > maxLength.value) {
                    errorsAfterValidation[name] = maxLength.message ?? 'Default min error message'
                    setAriaInvalid(true)
    
                   return element
                } else {
                    errorsAfterValidation[name] = undefined
                    setAriaInvalid(false)
                }
            }
    
            if (!!min) {
                if (value < min.value) {
                    errorsAfterValidation[name] = min.message ?? 'Default min error message'
                    setAriaInvalid(true)
    
                   return element
                } else {
                    errorsAfterValidation[name] = undefined
                    setAriaInvalid(false)
                }
            }
    
            if (!!pattern) {
                if (!value.match(pattern.value)) {
                    errorsAfterValidation[name] = pattern.message ?? 'Default min error message'
                    setAriaInvalid(true)
    
                   return element
                } else {
                    errorsAfterValidation[name] = undefined
                    setAriaInvalid(false)
                }
            }
        })

        setErrors({
            ...errors,
            ...errorsAfterValidation
        })

        setHasRunValidation(true)
    }

    const handleSubmit = (event: any) => {
        setForm(event.target)
        event.preventDefault()

        setIsSubmitting(true)
        
        const formElementsArray = Object.values(formElements)

        validate(formElementsArray)
    }

    useEffect(() => {
        const hasErrors = Object.values(errors).filter(error => error)

        if (hasErrors.length && hasRunValidation && isSubmitting) {
            (form.querySelector('[aria-invalid="true"]') as HTMLElement).focus()
        }

        if (!hasErrors.length  && hasRunValidation && isSubmitting) {
            let data = new Object()

            Object.keys(formElements).forEach((name) => {
                data[name] = (document.getElementById(name) as HTMLInputElement).value
            })
            onSubmit(data)
        }

        setIsSubmitted(true)
        setIsSubmitting(false)
    }, [errors, form, hasRunValidation, isSubmitting, onSubmit])

    return {
        errors,
        handleSubmit,
        isSubmitted,
        isSubmitting,
        register,
    }
}

const ImMyOwnForm = () => {
    const { errors, handleSubmit, register } = useMyOwnForm({
        onSubmit: (data) => console.log({data})
    });

    return (
        <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="firstName">Name:</label>
            <input {...register({name: "firstName", required: {value: true, message: "Please provide your name"}})} type="text" />
            {errors?.firstName && <span role="alert">{errors.firstName}</span>}
            
            <label htmlFor="email">Email:</label>
            <input
                {...register({
                    name: "email", 
                    required: {value: true, message: "Please provide ANY email"},
                pattern: { value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, message: "Please enter a valid email" }
                })}
                type="text" />
            {errors?.email && <span role="alert">{errors.email}</span>}

            <label htmlFor="age">Age:</label>
            <input {...register({name: "age", required: { value: true, message: "AGE!"}, min: { value: 18, message: "OLDER!"}})} type="number" />
            {errors?.age && <span role="alert">{errors.age}</span>}

            <label htmlFor="location">Location:</label>
            <input {...register({name: "location"})} type="text" />
            
            <label htmlFor="anything">Anything:</label>
            <input {...register({name: "anything", required: true})} type="text" />
            {errors?.anything && <span role="alert">{errors.anything}</span>}

            <label htmlFor="password">Password:</label>
            <input {...register({
                name: "password",
                required: { value: true, message: "Please enter a password" },
                minLength:  { value: 8, message: "Please enter a password at least 8 characters long" },
                maxLength:  { value: 20, message: "Please enter a password no more than 20 characters long" },
                pattern: { value: /^(?=.{8,20}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/ , message: "Please enter a valid password containing at least one number with a mixture of uppercase and lowercase letters" }
                })}
                type="password" />
            {errors?.password && <span role="alert">{errors.password}</span>}

            <label htmlFor="favouriteThing">Favourite thing:</label>
            <input {...register({name: "favouriteThing"})} type="text" />

            {/* <label htmlFor="option1">Option 1</label>
            <input {...register({name: "radios", id: 'option1', value: 'Option 1', required: { value: true, message: 'Radio radio'}})} type="radio" />
            <label htmlFor="option2">Option 2</label>
            <input {...register({name: "radios", id: 'option2', value: 'Option 2', required: { value: true, message: 'Radio radio'}})} type="radio" />
            {errors?.radios && <span role="alert">{errors.radios}</span>} */}
            <input title="submit" type="submit" />
        </form>
    )
}

export default ImMyOwnForm