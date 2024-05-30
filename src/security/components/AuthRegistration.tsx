import {Labeled} from "react-admin";
import {Stack, TextField, Button, FormHelperText} from "@mui/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LandContainer, userRegistrationSchema} from "@/security";
import {Heading} from "@/components/head";
import {InferSubmitHandlerFromUseForm} from "@/types/react-hook-form";
import {CreateUser} from "@jcloudify-api/typescript-client";
import {authTokenCache, userProvider} from "@/providers";
import {useState} from "react";

export const AuthRegistration: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
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
