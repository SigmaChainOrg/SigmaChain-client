"use client";
import { Button } from "@/app/components/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/shadcn/card";
import { Input } from "@/app/components/shadcn/input";
import { routes } from "@/app/routes";
import { emailPasswordSchema, secureCodeSchema } from "@/app/signin/schemas/signin-schema";
import { useSigninStore } from "@/app/signin/state/signin-store";
import { usePostSecureCodeValidate } from "@/features/auth/hooks/use-post-secure-code-validate";
import { usePostSignin } from "@/features/auth/hooks/use-post-signin";
import { useAuthStore } from "@/features/auth/state/auth-store";
import { SecureCodeRead } from "@/features/auth/types/secure-code";
import { TokenRead } from "@/features/auth/types/token";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SingIn() {
  const {
    email,
    password,
    errors,
    secureCode,
    step,
    secureCodeId,
    setSecureCodeId,
    setEmail,
    setPassword,
    setSecureCode,
    setErrors,
    setStep,
  } = useSigninStore();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    mutateAsync: secureCodeValidateMutate,
    isPending: secureCodeValidatePending,
    error: secureCodeValidateError,
  } = usePostSecureCodeValidate();

  const {
    mutateAsync: signinMutate,
    isPending: signinPending,
    error: signinError,
  } = usePostSignin();

  const router = useRouter();
  const searchParams = useSearchParams();

  const secureCodeIdParam = searchParams.get("secure-code-id");

  useEffect(() => {
    if (secureCodeIdParam) {
      setSecureCodeId(secureCodeIdParam);
      setStep(2);
    }
  }, [secureCodeIdParam]);

  async function handleSigninSubmit() {
    const validation = emailPasswordSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      setErrors({
        ...errors,
        email: fieldErrors.email ? fieldErrors.email[0] : undefined,
        password: fieldErrors.password ? fieldErrors.password[0] : undefined,
      });

      return;
    }

    const result = await signinMutate({ email, password });

    // ToDo: Handle error properly
    if (signinError) {
      console.error("Error signing in:", signinError);
      return;
    }

    if ("accessToken" in result) {
      const tokenRead = result as TokenRead;
      setAccessToken(tokenRead.accessToken);
      router.push(routes.dashboard);
      return;
    }

    if ("secureCodeId" in result) {
      const secureCodeRead = result as SecureCodeRead;
      router.push(`${routes.signin}?secure-code-id=${secureCodeRead.secureCodeId}`);
      return;
    }
  }

  async function handleSecureCodeSubmit() {
    const validation = secureCodeSchema.safeParse({ secureCode });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      setErrors({
        ...errors,
        secureCode: fieldErrors.secureCode ? fieldErrors.secureCode[0] : undefined,
      });

      return;
    }

    const tokenRead = await secureCodeValidateMutate({
      secureCodeId: secureCodeId as string,
      code: secureCode,
    });

    // ToDo: Handle error properly
    if (secureCodeValidateError) {
      console.error("Error validating secure code:", secureCodeValidateError);
      return;
    }

    setAccessToken(tokenRead.accessToken);
    router.push(routes.dashboard);
  }

  return (
    <div className="m-0 grid h-screen w-screen grid-cols-12 gap-x-8 bg-primary px-16 sm:p-0">
      <div className="col-start-1 col-end-7 place-content-center bg-ucuenca bg-[auto_120%] bg-left-bottom bg-no-repeat"></div>
      <main className="col-start-8 col-end-12 place-content-center">
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Welcome</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex w-full flex-col space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-sm text-danger">{errors.email}</p>}

                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-sm text-danger">{errors.password}</p>}

                  <div className="w-full">
                    <Button className="w-full" onClick={handleSigninSubmit}>
                      {signinPending ? "Loading..." : "Sign In"}
                    </Button>
                    <p className="w-full py-2 text-center text-sm">OR</p>
                    <Button variant="secondary" className="w-full">
                      Sign In with Google
                    </Button>
                  </div>
                </div>
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
                <div className="flex w-full flex-col space-y-3">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={secureCode}
                    onChange={(e) => {
                      setSecureCode(e.target.value);
                    }}
                  />
                  {errors.secureCode && <p className="text-sm text-danger">{errors.secureCode}</p>}
                  <div className="w-full">
                    <Button className="w-full" onClick={handleSecureCodeSubmit}>
                      {secureCodeValidatePending ? "Loading..." : "Validate Code"}
                    </Button>
                  </div>
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
        </Card>
      </main>
    </div>
  );
}
