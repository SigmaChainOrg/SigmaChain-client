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
import { usePatchUserInfo } from "@/features/auth/hooks/use-patch-me-user-info";
import { usePostSecureCodeValidate } from "@/features/auth/hooks/use-post-secure-code-validate";
import { usePostSignup } from "@/features/auth/hooks/use-post-signup";
import { useAuthStore } from "@/features/auth/state/auth-store";
import { IdType } from "@/features/auth/types/enums";
import { SecureCodeRead } from "@/features/auth/types/secure-code";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    secureCode,
    setSecureCode,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    idType,
    setIdType,
    idNumber,
    setIdNumber,
    birthDate,
    setBirthDate,
    error,
    setError,
    secureCodeId,
    setSecureCodeId,
  } = useSignupStore();

  const router = useRouter();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const { mutateAsync: secureCodeValidateMutate } = usePostSecureCodeValidate();

  const { mutateAsync: signupMutate } = usePostSignup();

  const { mutateAsync: userInfoUpdateMutate } = usePatchUserInfo();

  const searchParams = useSearchParams();

  const secureCodeIdParam = searchParams.get("secure-code-id");

  useEffect(() => {
    if (secureCodeIdParam) {
      setSecureCodeId(secureCodeIdParam);
      setStep(2);
    }
  }, [secureCodeIdParam]);

  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      setStep(3);
    }
  }, [accessToken]);

  async function handleEmailPasswordSubmit() {
    const validation = emailPasswordSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      const errorMessages = validation.error.flatten().fieldErrors;
      setError({
        email: errorMessages.email ? errorMessages.email[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
        confirmPassword: errorMessages.confirmPassword ? errorMessages.confirmPassword[0] : "",
      });
      return;
    }

    const result = await signupMutate({ email, password, confirmPassword });

    // ToDo: Handle error properly

    const secureCodeRead = result as SecureCodeRead;
    router.push(`${routes.signup}?secure-code-id=${secureCodeRead.secureCodeId}`);
    return;
  }

  async function handleValidationCodeSubmit() {
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

    const tokenRead = await secureCodeValidateMutate({
      secureCodeId: secureCodeId as string,
      code: secureCode,
    });

    // ToDo: Handle error properly

    setAccessToken(tokenRead.accessToken);
    setStep(3);
    return;
  }

  async function handleAdditionalDetailsSubmit() {
    const validation = additionalDetailsSchema.safeParse({
      firstName,
      lastName,
      idType,
      idNumber,
      birthDate,
    });

    if (!validation.success) {
      const errorMessages = validation.error.flatten().fieldErrors;
      setError({
        firstName: errorMessages.firstName ? errorMessages.firstName[0] : "",
        lastName: errorMessages.lastName ? errorMessages.lastName[0] : "",
        idType: errorMessages.idType ? errorMessages.idType[0] : "",
        idNumber: errorMessages.idNumber ? errorMessages.idNumber[0] : "",
        birthDate: errorMessages.birthDate ? errorMessages.birthDate[0] : "",
      });
      return;
    }

    await userInfoUpdateMutate({
      firstName,
      lastName,
      idType,
      idNumber,
      birthDate: birthDate?.toISOString().slice(0, 10),
    });

    // ToDo: Handle error properly

    router.push(routes.dashboard);
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error.confirmPassword && (
                  <p className="text-sm text-danger">{error.confirmPassword}</p>
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
                      { value: IdType.ID_CARD, label: "Cédula" },
                      { value: IdType.PASSPORT, label: "Pasaporte" },
                    ]}
                    onChange={(option) => setIdType(option.value as IdType)}
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
                      {birthDate ? format(birthDate, "PPP") : "Fecha de nacimiento"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div>
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={(e) => (e ? setBirthDate(e) : setBirthDate(new Date()))}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                {error.birthDate && <p className="text-sm text-danger">{error.birthDate}</p>}
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
