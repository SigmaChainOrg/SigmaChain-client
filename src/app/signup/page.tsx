"use client";
import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Combobox } from "@/components/shadcn/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/shadcn/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
  idType: z.string(),
  id: z
    .string()
    .length(10, { message: "Insert a 10-digits number" })
    .regex(/^\d+$/, "ID must contain only numbers"),
  birthdate: z.date({
    required_error: "A date of birth is required.",
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
      idType: "Cédula",
      id: "",
      birthdate: undefined,
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
    setStep(3); // Move to the next step
  }

  function handleAdditionalDetailsSubmit(
    data: z.infer<typeof additionalDetailsSchema>,
  ) {
    console.log("Additional details:", data);
    router.push(routes["dashboard"]);
    // Handle final submission
  }
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="m-0 grid h-screen w-screen grid-cols-12 gap-8 bg-primary bg-[url(./ucuenca.jpg)] bg-contain bg-left-top bg-no-repeat px-4">
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
                    onClick={() => router.push(routes["singin"])}
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
                    <div className="flex-cols flex gap-2">
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
                    </div>
                    <div className="flex-cols flex gap-2">
                      <FormField
                        control={additionalDetailsForm.control}
                        name="idType"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Combobox selectDefault="Tipo de ID" {...field} />
                            </FormControl>
                            <FormMessage>
                              {
                                additionalDetailsForm.formState.errors.idType
                                  ?.message
                              }
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={additionalDetailsForm.control}
                        name="id"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Número de ID"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage>
                              {
                                additionalDetailsForm.formState.errors.id
                                  ?.message
                              }
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={additionalDetailsForm.control}
                      name="birthdate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de nacimiento</FormLabel>
                          <Popover>
                            <PopoverTrigger className="w-full" asChild>
                              <FormControl>
                                <Button variant="secondary" className="w-full">
                                  {field.value
                                    ? format(field.value, "PPP")
                                    : "Fecha de nacimiento"}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <div>
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormMessage>
                            {
                              additionalDetailsForm.formState.errors.birthdate
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
