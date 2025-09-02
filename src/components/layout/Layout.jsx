import { Header } from "./Header"
import { Footer } from "./Footer"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Layout() {
    return <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto py-6 max-w-[1024px] mt-20">
            <Outlet /> 
        </main>
        <Footer />
        <ToastContainer />
    </div>
}