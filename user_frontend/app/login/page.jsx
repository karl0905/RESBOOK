import { LoginForm } from "@/features/login"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div>
      <div className="mx-auto w-[70%] max-w-[70.5rem]">
        <div className="flex items-center h-20">
          <Image
            src="/resbooklogo.png"
            alt="Logo"
            width={60}
            height={48}
            style={{ width: "auto", height: "auto" }}
          />
          <h2 className="font-bold ml-2">RESBOOK</h2>
        </div>
      </div>
      <div className="bg-gray-700 h-1 w-full"></div>
      <div className="flex flex-col justify-center items-center  ">
        <h2
          className="text-xl font-semibold text-center  mt-10 mb-5"
          variant="primary"
        >
          Welcome back
        </h2>

        <LoginForm />
      </div>
    </div>
  )
}
