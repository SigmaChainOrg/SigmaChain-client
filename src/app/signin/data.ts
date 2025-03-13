"use server";

interface UserCredentials {
  email: string;
  password: string;
}

export default async function fetchUserData(userCredentials: UserCredentials) {
  try {
    const payload = new URLSearchParams();
    payload.append("email", userCredentials.email);
    payload.append("password", userCredentials.password);

    const response = await fetch(
      "https://sigmachain.albertsorianodev.com/api/v1/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      },
    );
    if (!response.ok) {
      console.log("API Response: ", response);
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch user data", error);
  }
}
