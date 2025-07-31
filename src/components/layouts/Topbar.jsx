import Image from "next/image";

export default function Topbar() {
    return (
      <header className="flex bg-base-100 shadow-sm px-6 h-16 justify-between items-center">
        <div className="flex flex-col justify-center h-full">
          <Image
                      src="/images/logo-desklab.png"
                      alt="Logo Desklab"
                      width={191}
                      height={39}
                      priority
                      
                    />
        </div>
        <div className="flex items-center">
          <span className="mr-4">Minggu, 27 Juli 2025</span>
          <div className="dropdown dropdown-end">
            
              <div className="rounded-md bg-primary text-white px-4 py-1 flex items-center justify-center">Alfian Purnomo</div>
            
          </div>
        </div>
      </header>
    );
  }
  