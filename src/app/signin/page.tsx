"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { routes } from "@/lib/routes";
import fetchUserData from "@/signin/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/shadcn/button";
const emailPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }),
  password: z.string().min(8),
});

const validationCodeSchema = z.object({
  validationCode: z.string().length(8, {
    message: "Validation code must be exactly 8 characters",
  }),
});

export default function SingIn() {
  const [step, setStep] = useState(1);

  const emailPasswordForm = useForm<z.infer<typeof emailPasswordSchema>>({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const validationCodeForm = useForm<z.infer<typeof validationCodeSchema>>({
    resolver: zodResolver(validationCodeSchema),
    defaultValues: {
      validationCode: "",
    },
  });

  async function handleEmailPasswordSubmit(
    data: z.infer<typeof emailPasswordSchema>,
  ) {
    console.log("Email and Password:", data);
    const userData = await fetchUserData(data);
    console.log("User Data:", userData);
    setStep(2); // Move to the next step
  }
  const router = useRouter();
  function handleValidationCodeSubmit(
    data: z.infer<typeof validationCodeSchema>,
  ) {
    console.log("Validation code:", data.validationCode);
    router.push(routes["dashboard"]);
    // Handle validation code submission
  }

  return (
    <div className="m-0 grid h-screen w-screen grid-cols-12 gap-x-8 bg-primary px-16 font-[family-name:var(--font-geist-sans)] sm:p-0">
      <div className="col-start-1 col-end-7 place-content-center bg-[url(./ucuenca.jpg)] bg-[auto_120%] bg-left-bottom bg-no-repeat"></div>
      <main className="col-start-8 col-end-12 place-content-center">
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Welcome</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...emailPasswordForm}>
                  <form
                    className="flex w-full flex-col space-y-3"
                    onSubmit={emailPasswordForm.handleSubmit(
                      handleEmailPasswordSubmit,
                    )}
                  >
                    <FormField
                      control={emailPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {emailPasswordForm.formState.errors.email?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailPasswordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {
                              emailPasswordForm.formState.errors.password
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <div className="w-full">
                      <Button className="w-full" type="submit">
                        Sign In
                      </Button>
                      <p className="w-full py-2 text-center text-sm">OR</p>
                      <Button variant="secondary" className="w-full">
                        Sign In with Google
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <p>
                  Do not have an account?{" "}
                  <Button
                    variant="link"
                    className="w-auto px-0"
                    onClick={() => router.push(routes["signup"])}
                  >
                    Sign up here
                  </Button>
                </p>
              </CardFooter>
            </>
          )}
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...validationCodeForm}>
                  <form
                    className="flex w-full flex-col space-y-3"
                    onSubmit={validationCodeForm.handleSubmit(
                      handleValidationCodeSubmit,
                    )}
                  >
                    <FormField
                      control={validationCodeForm.control}
                      name="validationCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            We sent a verification code to your email.
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter 8-digit code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {
                              validationCodeForm.formState.errors.validationCode
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <div className="w-full">
                      <Button className="w-full" type="submit">
                        Validate Code
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <p>
                  Did not receive the code?{" "}
                  <Button variant="link" className="w-auto px-0">
                    Resend code
                  </Button>
                </p>
              </CardFooter>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
