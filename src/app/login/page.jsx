import Image from 'next/image';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#2a93d6]" style={{ backgroundImage: "url('/images/background-desklab.svg')" }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        
        <div className='relative'>
          <Image
            src="/images/logo-desklab.png"
            alt="Logo Desklab"
            width={191}
            height={39}
            priority
            className="mx-auto mb-15 rounded-full"
          />
          <LoginForm />
        </div>
        
      </div>
    </div>
  );
}