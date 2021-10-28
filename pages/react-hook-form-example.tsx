import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  firstName: string,
  lastName: string,
  company: string,
  email: string,
  password: string,
  newsletter: boolean
};

export default function ReactHookFormExample({ saveData }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
    if (typeof saveData !== 'undefined') { saveData(data) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input type="text" data-testid="firstName" {...register("firstName", { required: true, maxLength: 50 })} />
      {errors.firstName && <p role="alert">Enter your first name</p>}

      <label>Last name</label>
      <input type="text" data-testid="lastName" {...register("lastName", { required: true, maxLength: 50 })} />
      {errors.lastName && <p role="alert">Enter your last name</p>}

      <label>Company</label>
      <input type="text" data-testid="company" {...register("company", { required: true, maxLength: 50 })} />
      {errors.company && <p role="alert">Enter your company</p>}

      <label>Email</label>
      <input type="email" data-testid="email" {...register("email", { required: true, pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i })} />
      {errors.email && <p role="alert">Enter a valid email</p>}

      <label>Choose password</label>
      <input type="password" data-testid="password" {...register("password", { required: true, pattern: /^(?=.{8,100}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/ })} />
      {errors.password && <p role="alert">Choose a password at least 8 characters long, containing at least one number with a mixture of uppercase and lowercase letters</p>}

      <input type="submit" data-testid="save" value="Save" />
    </form>
  );
}