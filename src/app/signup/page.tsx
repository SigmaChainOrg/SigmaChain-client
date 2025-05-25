"use client";
import { Button } from "@/app/components/shadcn/button";
import { Calendar } from "@/app/components/shadcn/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/shadcn/card";
import { Combobox } from "@/app/components/shadcn/combobox";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/shadcn/popover";
import { routes } from "@/app/routes";
import {
  additionalDetailsSchema,
  emailPasswordSchema,
  secureCodeSchema,
} from "@/app/signup/schemas/sign-up-schema";
import { useSignupStore } from "@/app/signup/state/signup-store";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const step = useSignupStore((state) => state.step);
  const setStep = useSignupStore((state) => state.setStep);
  const email = useSignupStore((state) => state.email);
  const setEmail = useSignupStore((state) => state.setEmail);
  const password = useSignupStore((state) => state.password);
  const setPassword = useSignupStore((state) => state.setPassword);
  const repeatPassword = useSignupStore((state) => state.repeatPassword);
  const setRepeatPassword = useSignupStore((state) => state.setRepeatPassword);
  const secureCode = useSignupStore((state) => state.secureCode);
  const setSecureCode = useSignupStore((state) => state.setSecureCode);
  const firstName = useSignupStore((state) => state.firstName);
  const setFirstName = useSignupStore((state) => state.setFirstName);
  const lastName = useSignupStore((state) => state.lastName);
  const setLastName = useSignupStore((state) => state.setLastName);
  const idType = useSignupStore((state) => state.idType);
  const setIdType = useSignupStore((state) => state.setIdType);
  const idNumber = useSignupStore((state) => state.idNumber);
  const setIdNumber = useSignupStore((state) => state.setIdNumber);
  const birthdate = useSignupStore((state) => state.birthdate);
  const setBirthdate = useSignupStore((state) => state.setBirthdate);
  const error = useSignupStore((state) => state.error);
  const setError = useSignupStore((state) => state.setError);

  const router = useRouter();
  function handleEmailPasswordSubmit() {
    const validation = emailPasswordSchema.safeParse({
      email,
      password,
      repeatPassword,
    });

    if (!validation.success) {
      const errorMessages = validation.error.flatten().fieldErrors;
      setError({
        email: errorMessages.email ? errorMessages.email[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
        repeatPassword: errorMessages.repeatPassword ? errorMessages.repeatPassword[0] : "",
      });
      return;
    }
    setStep(2);
  }

  function handleValidationCodeSubmit() {
    const validation = secureCodeSchema.safeParse({
      secureCode,
    });

    if (!validation.success) {
      const errorMessages = validation.error.flatten().fieldErrors;
      setError({
        secureCode: errorMessages.secureCode ? errorMessages.secureCode[0] : "",
      });
      return;
    }

    setStep(3);
  }

  function handleAdditionalDetailsSubmit() {
    const validation = additionalDetailsSchema.safeParse({
      firstName,
      lastName,
      idType,
      idNumber,
      birthdate,
    });

    if (!validation.success) {
      const errorMessages = validation.error.flatten().fieldErrors;
      setError({
        firstName: errorMessages.firstName ? errorMessages.firstName[0] : "",
        lastName: errorMessages.lastName ? errorMessages.lastName[0] : "",
        idType: errorMessages.idType ? errorMessages.idType[0] : "",
        idNumber: errorMessages.idNumber ? errorMessages.idNumber[0] : "",
        birthdate: errorMessages.birthdate ? errorMessages.birthdate[0] : "",
      });
      return;
    }
    router.push(routes["dashboard"]);
  }

  return (
    <div className="m-0 grid h-screen w-screen grid-cols-12 gap-8 bg-primary bg-ucuenca bg-contain bg-left-top bg-no-repeat px-4">
      <main className="col-start-7 col-end-11 place-content-center">
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Create an account!</CardTitle>
                <CardDescription>It&apos;s free, it&apos;s open source.</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && <p className="text-sm text-danger">{error.email}</p>}
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && <p className="text-sm text-danger">{error.password}</p>}
                <Input
                  type="password"
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                {error.repeatPassword && (
                  <p className="text-sm text-danger">{error.repeatPassword}</p>
                )}
                <div className="w-full">
                  <Button className="w-full px-0" onClick={() => handleEmailPasswordSubmit()}>
                    Sign Up
                  </Button>
                  <p className="w-full py-2 text-center text-sm">OR</p>
                  <Button variant="secondary" className="w-full">
                    Sign Up with Google
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="w-auto"
                    onClick={() => router.push(routes["signin"])}
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
                <CardDescription>We sent a verification code to your email.</CardDescription>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={secureCode}
                  onChange={(e) => setSecureCode(e.target.value)}
                />
                {error.secureCode && <p className="text-sm text-danger">{error.secureCode}</p>}
                <div className="w-full">
                  <Button className="w-full" onClick={() => handleValidationCodeSubmit()}>
                    Validate Code
                  </Button>
                </div>
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
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {error.firstName && <p className="text-sm text-danger">{error.firstName}</p>}
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {error.lastName && <p className="text-sm text-danger">{error.lastName}</p>}
                <Label>Seleccione el tipo de identificación</Label>
                {error.idType && <p className="text-sm text-danger">{error.idType}</p>}
                <div className="flex-cols flex gap-2">
                  <Combobox
                    selectDefault={{ label: "select", value: "Seleccione" }}
                    options={[
                      { value: "id", label: "Cédula" },
                      { value: "passport", label: "Pasaporte" },
                    ]}
                    onChange={(option) => setIdType(option.value)}
                  />

                  <Input
                    type="text"
                    placeholder="ID number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </div>
                {error.idNumber && <p className="text-sm text-danger">{error.idNumber}</p>}
                <Popover>
                  <PopoverTrigger className="w-full" asChild>
                    <Button variant="secondary" className="w-full">
                      {birthdate ? format(birthdate, "PPP") : "Fecha de nacimiento"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div>
                      <Calendar
                        mode="single"
                        selected={birthdate}
                        onSelect={(e) => (e ? setBirthdate(e) : setBirthdate(new Date()))}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                {error.birthdate && <p className="text-sm text-danger">{error.birthdate}</p>}
                <div className="w-full pt-3 pb-5">
                  <Button className="w-full" onClick={() => handleAdditionalDetailsSubmit()}>
                    Create Account
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
