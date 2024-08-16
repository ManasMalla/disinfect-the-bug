"use client";
import { Button, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("gdg_token")) {
      router.push("/home");
    }
    setIsLoading(false);
  });
  return (
    <main className="flex flex-col items-center justify-center h-screen p-24">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdMkscxEdGHevdxOWdnyRrDEQi6-mbD5PEA&s"
        className="size-16 mb-8"
      />
      <div>
        <h1 className="text-4xl font-bold text-center mb-6">
          Disinfect the Bug
        </h1>
        <form>
          <TextField
            label="Email address"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email address"
            className="block"
            fullWidth={true}
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
            placeholder="Enter your password"
            className="block my-4"
          />
          <div className="flex">
            <Button className="mr-auto">Forgot password?</Button>
            <Button
              onClick={() => {
                fetch("http://localhost:3003/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                })
                  .then((response) => {
                    if (response.status === 200) {
                      return response.json();
                    }
                    throw new Error("Login failed");
                  })
                  .then((data) => {
                    console.log(data);
                    localStorage.setItem("gdg_token", data.message.apiKey);
                    localStorage.setItem("gdg_email", data.message.email);
                    localStorage.setItem("gdg_name", data.message.name);
                    router.push("/home");
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
              variant="contained"
            >
              Login
            </Button>
          </div>
          <p className="mt-8 inline-flex mr-8">No account? </p>
          <Button variant="outlined">Create Account</Button>
        </form>
      </div>
    </main>
  );
}
