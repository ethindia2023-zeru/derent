
import { SideBarTenant } from "@/components/myHouse/SideBarTenant";

export default function RootLayout({ children }) {
    
  return (
    <div className="flex gap-2">
        <SideBarTenant/>
        {children}
    </div>
  );
}
