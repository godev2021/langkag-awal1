import Sidebar from "@/components/layouts/Sidebars";
import Topbar from "@/components/layouts/Topbar";
export default function PrivateLayout({ children }) {
    return (
      <div className="grid grid-rows-[auto_1fr]">
        {/* Header */}
        <Topbar />

        {/* Content Area with Sidebar + Page Content */}
        <div className="grid grid-cols-[16rem_1fr] h-full">
            <Sidebar />
            <main className="p-6 overflow-auto">{children}</main>
        </div>
      </div>
    );
  }