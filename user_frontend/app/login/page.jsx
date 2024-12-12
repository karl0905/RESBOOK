import { LoginForm } from "@/features/login"

export default function LoginPage() {
  return (
    <div>
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
