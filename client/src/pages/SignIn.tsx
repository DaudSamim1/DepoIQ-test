import { SignIn } from "@clerk/clerk-react"
import SpinLoader from "../components/SpinLoader"

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        fallback={<SpinLoader />}
        appearance={{
          elements: {
            footer: "hidden"
          }
        }}
      />
    </div>
  )
}

export default SignInPage
