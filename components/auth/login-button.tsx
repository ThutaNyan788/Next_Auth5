"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps{
    children:React.ReactNode,
    mode?:"modal" | "redirect",
    asChild?:boolean
}


export default function LoginButton({
    children,
    mode="redirect",
    asChild
}:LoginButtonProps) {
const router = useRouter();


    if(mode == "modal"){
        return(
            <span>
                TODO:: Implement Modal
            </span>
        )
    }

    const onClick=()=>{
        router.push("/auth/login");
    }

  return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
