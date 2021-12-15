import { SubmitHandler, useForm } from "../hooks/useForm";

import RadioButton from "../components/RadioButton"
import RadioGroup from "../components/RadioGroup"
import Select from "../components/Select"
import TextInput from "../components/TextInput"

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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
    if (typeof saveData !== 'undefined') { saveData(data) }
  }

  return (
    <main>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextInput data-testid="firstName" errorMessage={errors?.firstName?.message} label="First name" {...register("firstName", {
          required: { value: true, message: "Please enter you first name" }
        })} />
        
        <TextInput data-testid="lastName" errorMessage={errors?.lastName?.message} label="Last name" {...register("lastName", {
          required: { value: true, message: "Please enter you last name" }
        })} />
        
        <TextInput data-testid="company" errorMessage={errors?.company?.message} label="Company" {...register("company", {
          required: { value: true, message: "Please enter you company" }
        })} />
        
        <TextInput data-testid="email" errorMessage={errors?.email?.message} label="Email" type="email" {...register("email", {
          required: { value: true, message: "Please enter your email" },
          pattern: { value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, message: "Please enter a valid email" }
        })} />
        
        <TextInput data-testid="password" errorMessage={errors?.password?.message} label="Password" type="password" {...register("password", {
          required: { value: true, message: "Please enter a password" },
          pattern: { value: /^(?=.{8,100}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/ , message: "Please enter a valid password containing at least one number with a mixture of uppercase and lowercase letters" }
        })} />
        
        <TextInput data-testid="date" errorMessage={errors?.date?.message} label="Date" type="date" {...register("date", {
          required: { value: true, message: "Please enter a valid date" },
        })} />

        <RadioGroup errorMessage={errors?.desertIslandDisc?.message} name="desertIslandDisc" title="What's your desert island disc?">
          <RadioButton data-testid="floppyDisc" label="Floppy disc" value="floppy disc"
            {...register("desertIslandDisc", {
              required: { value: true, message: "Please radio in" }
            })}
          />
          <RadioButton data-testid="discus" label="Discus" value="discus"
            {...register("desertIslandDisc", {
              required: { value: true, message: "Please radio in" }
            })}
          />
          <RadioButton data-testid="slippedDisc" label="Slipped disc" value="slippedDisc"
            {...register("desertIslandDisc", {
              required: { value: true, message: "Please radio in" }
            })}
          />
        </RadioGroup>

        <Select data-testid="favouriteThing" errorMessage={errors?.favouriteThing?.message} label="Favourite thing" options={[{label: "Dogs", value: "dogs"}, {label: "Computers", value: "computers"}, {label: "Form comparison applications", value: "form comparison applications"}]} {...register("favouriteThing", {
          required: { value: true, message: "Please pick a favourite thing from the options" }
        })} />

        <input type="submit" data-testid="save" value="Save" />
      </form>
    </main>
  );
}