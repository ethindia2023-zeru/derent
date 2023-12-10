// import { Toaster } from "@/components/ui/toaster";

import { SideBarRentals } from "@/components/myRentals/SideBarRentals";

export default function RootLayout({ children }) {
  return (
    <div className="flex gap-2">
      <SideBarRentals />
      {children}
    </div>
  );
}
