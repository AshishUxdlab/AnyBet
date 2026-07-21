import { LoginForm } from "@/components/login-form"
import Header from "../Header/Header"

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-svh w-full bg-background">
            <Header showSidebarTrigger={false} />
            <div className="flex flex-1 items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
