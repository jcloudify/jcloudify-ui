import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Labeled} from "react-admin";
import {Stack, TextField, Button, Snackbar, Alert} from "@mui/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LandContainer, userRegistrationSchema} from "@/security";
import {Heading} from "@/components/head";
import {InferSubmitHandlerFromUseForm} from "@/types/react-hook-form";
import {CreateUser} from "@jcloudify-api/typescript-client";
import {authTokenCache, userProvider} from "@/providers";

export const AuthRegistration: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const registerUser: InferSubmitHandlerFromUseForm<typeof form> = async (
    details
  ) => {
    const user: CreateUser = {
      ...details,
      token: authTokenCache.get()?.access_token,
    };
    setIsRegistering(true);
    try {
      await userProvider.save(user);
      navigate("/");
    } catch (e: any) {
      setErrorMessage(e.message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <LandContainer>
      <Stack
        flex={1}
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={1000 * 5}
          anchorOrigin={{vertical: "bottom", horizontal: "right"}}
          onClose={() => {
            setErrorMessage("");
          }}
        >
          <Alert severity="error" variant="filled" sx={{width: "100%"}}>
            {errorMessage}
          </Alert>
        </Snackbar>

        <Heading
          textAlign="center"
          title="Complete your registration!"
          subtitle="Please provide the required details to finish setting up your account."
          mb={4}
        />

        <Stack
          direction="column"
          spacing={2}
          component="form"
          onSubmit={form.handleSubmit(registerUser)}
        >
          <Labeled label="First name">
            <TextField variant="outlined" {...form.register("first_name")} />
          </Labeled>

          <Labeled label="Last name">
            <TextField variant="outlined" {...form.register("last_name")} />
          </Labeled>

          <Labeled label="Email">
            <TextField variant="outlined" {...form.register("email")} />
          </Labeled>

          <Button
            data-testid="complete-registration"
            size="large"
            variant="contained"
            type="submit"
            disabled={isRegistering}
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </LandContainer>
  );
};
