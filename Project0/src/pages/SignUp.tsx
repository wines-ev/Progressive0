import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Fieldset, Input, Box } from "@chakra-ui/react";
import { Field } from '../components/ui/field';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [usernameInput, setUsernameInput] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [usernameErrorText, setUsernameErrorText] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [emailErrorText, setEmailErrorText] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [validFields, setValidFields] = useState(true);


  const validateUsername = () => {
    if (usernameInput === "") {
      setValidUsername(false);
      setUsernameErrorText("Username is required");
    }
    else {
      setValidUsername(true);
      setUsernameErrorText("");
    }
  }
  
  const validateEmail = () => {
    if (emailInput === "") {
      setValidEmail(false);
      setEmailErrorText("Email is required");
    }
    else{
      setValidEmail(true);
      setEmailErrorText("");
    }
  }
  const validatePassword = () => {
    if(passwordInput === ""){ 
      setValidPassword(false);
      setPasswordErrorText("Password is required");
    } 
    else {
      setValidPassword(true);
      setPasswordErrorText("");
    }
  }

  const validateFields = () => {
    validateUsername();
    validateEmail();
    validatePassword();
  }

  useEffect(() => {
    setValidFields(validUsername && validPassword && validEmail);
    
  }, [validUsername, validEmail, validPassword]);

  return (
    <div>
      <Box p="3" maxW="lg" mx="auto">
        <Fieldset.Root size="lg" my="10" invalid={!validFields}>
          <Fieldset.Legend textAlign="center" fontSize="3xl" fontWeight="semibold">Create an Account</Fieldset.Legend>
          <Fieldset.HelperText textAlign="center" my="4">
            Please provide your details below.
          </Fieldset.HelperText>
          <Fieldset.Content>
            <Field label="Username" invalid={!validUsername}>
              <Input id="username" {...register("username", { onChange: (e) => setUsernameInput(e.target.value) })}/>
              <Fieldset.ErrorText>{usernameErrorText}</Fieldset.ErrorText>
            </Field>

            <Field label="Email address" invalid={!validEmail}>
              <Input id="email" type="email" {...register("email", { onChange: (e) => setEmailInput(e.target.value) })}/>
              <Fieldset.ErrorText>{emailErrorText}</Fieldset.ErrorText>
            </Field>
            
            <Field label="Password" invalid={!validPassword}>
              <Input id="password" type="password" {...register("password", { required: "Password is required", onChange: (e) => setPasswordInput(e.target.value) })}/>
              <Fieldset.ErrorText>{passwordErrorText}</Fieldset.ErrorText>
            </Field>
          </Fieldset.Content>
          <Button type="submit" alignSelf="flex-start" onClick={validateFields}>
            Submit
          </Button>
          <Fieldset.ErrorText>
            Some fields are invalid. Please check them.
          </Fieldset.ErrorText>
        </Fieldset.Root>
      </Box>
    </div>
  )
}

export default SignUp;