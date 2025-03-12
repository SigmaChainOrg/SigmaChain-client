"use client";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const emailPasswordSchema = z
  .object({
    email: z.string().email({
      message: "Email is invalid",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%_*?&-]/,
        "Password must contain at least one special character",
      ),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

const validationCodeSchema = z.object({
  validationCode: z.string().length(8, {
    message: "Validation code must be exactly 8 characters",
  }),
});

const additionalDetailsSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits",
  }),
});

export default function Sign_up() {
  const [step, setStep] = useState(1);

  const emailPasswordForm = useForm<z.infer<typeof emailPasswordSchema>>({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const validationCodeForm = useForm<z.infer<typeof validationCodeSchema>>({
    resolver: zodResolver(validationCodeSchema),
    defaultValues: {
      validationCode: "",
    },
  });
  const router = useRouter();
  const additionalDetailsForm = useForm<
    z.infer<typeof additionalDetailsSchema>
  >({
    resolver: zodResolver(additionalDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  function handleEmailPasswordSubmit(
    data: z.infer<typeof emailPasswordSchema>,
  ) {
    console.log("Email and Password:", data);
    setStep(2); // Move to the next step
  }

  function handleValidationCodeSubmit(
    data: z.infer<typeof validationCodeSchema>,
  ) {
    console.log("Validation code:", data.validationCode);
    router.push("/dashboard");
    setStep(3); // Move to the next step
  }

  function handleAdditionalDetailsSubmit(
    data: z.infer<typeof additionalDetailsSchema>,
  ) {
    console.log("Additional details:", data);
    router.push("/Dashboard");
    // Handle final submission
  }

  return (
    <div className="bg-primary m-0 grid min-h-screen w-screen grid-cols-12 gap-8 bg-[url(./ucuenca.jpg)] bg-contain bg-left-top bg-no-repeat font-[family-name:var(--font-geist-sans)] sm:p-0">
      <main className="col-start-7 col-end-11 place-content-center">
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Create an account!</CardTitle>
                <CardDescription>
                  It&apos;s free, it&apos;s open source.
                </CardDescription>
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
                              placeholder="Email"
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
                              placeholder="Password"
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
                    <FormField
                      control={emailPasswordForm.control}
                      name="repeatPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Repeat password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {
                              emailPasswordForm.formState.errors.repeatPassword
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <p className="text-md text-gray-500">
                      At least 8 characters.
                    </p>
                    <div className="w-full">
                      <Button className="w-full px-0" type="submit">
                        Sign Up
                      </Button>
                      <p className="w-full py-2 text-center text-sm">OR</p>
                      <Button variant="secondary" className="w-full">
                        Sign Up with Google
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <p>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="w-auto"
                    onClick={() => router.push("/Sing_in")}
                  >
                    Sign in
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
          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>You are almost done!</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We need some additional details to complete your account.
                </CardDescription>
                <Form {...additionalDetailsForm}>
                  <form
                    className="flex w-full flex-col space-y-4"
                    onSubmit={additionalDetailsForm.handleSubmit(
                      handleAdditionalDetailsSubmit,
                    )}
                  >
                    <FormField
                      control={additionalDetailsForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="First Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {
                              additionalDetailsForm.formState.errors.firstName
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={additionalDetailsForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Last Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {
                              additionalDetailsForm.formState.errors.lastName
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={additionalDetailsForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Phone Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {
                              additionalDetailsForm.formState.errors.phoneNumber
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <div className="w-full pt-3 pb-5">
                      <Button className="w-full" type="submit">
                        Create Account
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
