import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  firstName: string,
  lastName: string,
  company: string,
  email: string,
  password: string,
  date: string,
  newsletter: boolean
};

export default function ReactHookFormExample({ saveData }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
    if (typeof saveData !== 'undefined') { saveData(data) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input
        type="text"
        aria-invalid={errors.firstName ? "true" : "false"}
        data-testid="firstName"
        {...register("firstName", {
          required: { value: true, message: "Please enter you first name" }
        })}
      />
      {errors.lastName && <span role="alert">{errors.lastName.message}</span>}

      <label>Last name</label>
      <input
        type="text"
        aria-invalid={errors.lastName ? "true" : "false"}
        data-testid="lastName"
        {...register("lastName", {
          required: { value: true, message: "Please enter you last name" }
        })}
      />
      {errors.firstName && <span role="alert">{errors.firstName.message}</span>}

      <label>Company</label>
      <input
        type="text"
        aria-invalid={errors.company ? "true" : "false"}
        data-testid="company"
        {...register("company", {
          required: { value: true, message: "Please enter you company" }
        })}
      />
      {errors.company && <span role="alert">{errors.company.message}</span>}

      <label>Email</label>
      <input
        type="email"
        aria-invalid={errors.email ? "true" : "false"}
        data-testid="email"
        {...register("email", {
          required: { value: true, message: "Please enter your email" },
          pattern: { value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, message: "Please enter a valid email" }
        })}
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <label>Choose password</label>
      <input
        type="password"
        aria-invalid={errors.password ? "true" : "false"}
        data-testid="password"
        {...register("password", {
          required: { value: true, message: "Please enter a password" },
          minLength:  { value: 8, message: "Please enter a password at least 8 characters long" },
          maxLength:  { value: 100, message: "Please enter a password no more than 100 characters long" },
          pattern: { value: /^(?=.{8,100}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/ , message: "Please enter a valid password containing at least one number with a mixture of uppercase and lowercase letters" }
        })}
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}

      <label>Date</label>
      <input
        type="date"
        aria-invalid={errors.date ? "true" : "false"}
        data-testid="date"
        {...register('date', {
          required: { value: true, message: "Please enter a date" },
        })}
      />
      {errors.date && <span role="alert">{errors.date.message}</span>}

      <input type="submit" data-testid="save" value="Save" />
    </form>
  );
}