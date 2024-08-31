import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FaWallet } from 'react-icons/fa6';
import Link from 'next/link';

export function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn(
                'fixed top-10 inset-x-0 max-w-2xl mx-auto z-50',
                className
            )}
        >
            <div className="relative rounded-md border border-transparent dark:bg-neutral-950 dark:border-white/[0.2] bg-white shadow-input flex justify-between space-x-4 px-4 py-4 ">
                <div className="flex gap-2">
                    <Link className="text-neutral-300 hover:text-purple-300" href="/products">
                        Products
                    </Link>
                    <Link className="text-neutral-300 hover:text-purple-300" href="/products">
                        API & Docs
                    </Link>
                    <Link className="text-neutral-300 hover:text-purple-300" href="/products">
                        FAQ
                    </Link>
                </div>
                <FaWallet className='text-neutral-300 hover:text-green-400'/>
            </div>
        </div>
    );
}
