'use client';

import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login submitted:', { email, password });
        router.push('/dashboard')
        // TODO: call login API here
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <Input
                    id='email'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
            </div>

            <div>
                <Input
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Masukan Password'
                />
            </div>
            <div className='flex w-full justify-center'>
                <button
                    type='submit'
                    className='btn btn-primary justify-center px-14 rounded-[99px] btn-lg'
                >
                    Login
                </button>
            </div>
        </form>
    );
}
