import OTPVerification from "./OTPVerification";

const Main: React.FC = () => {
    return (
        <section className="w-full h-[90vh] flex items-center justify-center">
            <div className="w-2/5 min-w-[350px] max-w-xl bg-chatWindowBg px-6 md:px-10 py-7 md:py-12 rounded-2xl">
                <div className="w-full flex items-center justify-between">
                    <h1 className="font-extrabold text-xl md:text-3xl lg:text-4xl">QuickConverse</h1>
                    <p className="text-blue-800 text-sm md:text-lg">Login</p>
                </div>
                <div className="w-full my-3 md:my-5">
                    <OTPVerification />
                </div>
            </div>

        </section>
    )
}

export default Main;