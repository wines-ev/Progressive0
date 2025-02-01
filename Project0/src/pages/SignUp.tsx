import { useState, useEffect } from "react";

import { Button, Fieldset, Input, Box } from "@chakra-ui/react";
import { Field } from '../components/ui/field';

const SignUp = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [validUsername, setValidUsername] = useState(true);

  const [emailInput, setEmailInput] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [passwordInput, setPasswordInput] = useState("");
  const [validPassword, setValidPassword] = useState(true);


  const [validFields, setValidFields] = useState(true);

  const validateUsername = () => {
    setValidUsername(usernameInput !== "");
  }
  
  const validateEmail = () => {
    setValidEmail(emailInput !== "");
  }
  const validatePassword = () => {
    setValidPassword(passwordInput !== "");
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
              <Input name="username" onChange={(e) => setUsernameInput(e.target.value)} />
            </Field>

            <Field label="Email address" invalid={!validEmail}>
              <Input name="email" type="email" onChange={(e) => setEmailInput(e.target.value)}/>
            </Field>
            
            <Field label="Password" invalid={!validPassword}>
              <Input name="password" type="password" onChange={(e) => setPasswordInput(e.target.value)}/>
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