"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import FloatingNav from "@/components/FloatingNav";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { BACKEND_URL } from "../config";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        username: email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />

      {/* Spacer so nav doesn't overlap */}
     <div className="pt-36 md:pt-40" />

      <div className="flex justify-center">
        <div className="flex max-w-5xl w-full flex-col md:flex-row gap-12 px-6">

          {/* Left Section */}
          <div className="flex-1">
            <div className="font-bold text-3xl leading-snug pb-4">
              Join millions worldwide who automate their work using Zapy.
            </div>

            <div className="space-y-5 pt-4 text-muted-foreground">
              <CheckFeature label="Easy setup, no coding required" />
              <CheckFeature label="Free forever for core features" />
              <CheckFeature label="14-day trial of premium features & apps" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 border border-border rounded-xl bg-card shadow-sm p-6 transition-colors">

            <div className="space-y-4">
              <div className="space-y-1">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  type="email"
                  placeholder="Your Email"
                  className="bg-background border-border focus:ring-foreground"
                />
              </div>

              <div className="space-y-1">
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type="password"
                  placeholder="Password"
                  className="bg-background border-border focus:ring-foreground"
                />
              </div>

              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] transition-all duration-300 shadow-md"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
              <div className="h-[1px] bg-border w-full" />
              <span className="text-muted-foreground text-sm mx-2">or</span>
              <div className="h-[1px] bg-border w-full" />
            </div>

            {/* Google Login */}
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-3 w-full border border-border rounded-lg px-4 py-2 hover:bg-muted/50 transition-all duration-300"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium text-foreground">Continue with Google</span>
            </button>

            {/* Link to signup */}
            <div className="text-sm text-center pt-4 text-muted-foreground">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
