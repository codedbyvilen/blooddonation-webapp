import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DonorProvider from "./context/donationContext";


export const metadata = {
  title: "BloodConnect | Donate & Save Lives",
  description: "BloodConnect is a platform that connects blood donors with those in need. Donate blood, request help, and make a life-saving difference today.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='antialiased bg-[#F9F9F9] text-[#121212]'
      >
        <DonorProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar/>
          <div className="flex flex-col flex-1 overflow-auto">

            <div className="max-w-7xl mx-auto w-full">
              <Header/>
            <main>{children}</main>
            </div>

          </div>

        </div>  
        </DonorProvider>
   
      </body>
    </html>
  );
}
