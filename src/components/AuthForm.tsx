"use client"

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/users";

type Props = {
    type: "login" | "signup";
}

function AuthForm({ type }: Props) {
    const isLoginForm = type === "login";
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            let errorMessage, title, description;
            if(isLoginForm){
                errorMessage = (await loginAction(email, password)).errorMessage;
                title = "Logged in";
                description = "You have been successfully logged in";               
            } else {
                errorMessage = (await signUpAction(email, password)).errorMessage;
                title = "Signed up";
                description = "Check your email for a confirmation link";  
            }

            if(!errorMessage){
                toast.success(title, {
                   description
                });
                router.replace("/")
            }else {
                toast.error("Error", {
                   description
                })
            }
        })
    }

    return (
        <form action={handleSubmit}>
            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    type="email" 
                    required 
                    disabled={ isPending } />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    type="password" 
                    required 
                    disabled={ isPending } />
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex flex-col gap-4">
                <Button className="w-full">
                    { isPending ? <Loader2 className="animate-spin"/> 
                    : isLoginForm ? "Login" : "Sign Up"}
                </Button>
                <p className="text-xs">
                    { isLoginForm ? "Don't have an account yet ? " : "Already have an account ? " }
                    <Link href={isLoginForm ? "/sign-up" : "/login"}
                    className={`text-lime-400 ${isPending ? "pointer-events-none opacity-50" : ""}`}>
                        { isLoginForm ? "Sign Up" : "Login" }
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthForm