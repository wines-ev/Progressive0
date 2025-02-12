import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Fieldset, Input, Box, Text, Flex, Link } from "@chakra-ui/react";
import { Field } from '../components/ui/field';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../utils';

const SignUp = () => {
  const { register, handleSubmit } = useForm();

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


  const doSubmit = async (values : any) => {
    try {
      console.log('Submitting values:', values);
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      // Check if the response content-type is JSON
      const contentType = res.headers.get('content-type');
      let data;
  
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text(); // Get the text response
      }
  
      if (res.status === 200) {
        toast.success('Sign Up Successful. You are now logged in');
      } else {
        toast.error(data.message || 'Unexpected error occurred');
        console.log('Server response:', data); // Log the response text if not JSON
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Fetch error:', error);
    }
  }
  



  return (
    <div>
      <Box p="3" maxW="lg" mx="auto">
        <form onSubmit={handleSubmit(doSubmit)}>
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
          <Flex gap="2">
            <Text> Already have an account?</Text>
            <Link variant="underline" href="signin">Sign In.</Link>
          </Flex>
          
        </form>
      </Box>
    </div>
  )
}

export default SignUp;