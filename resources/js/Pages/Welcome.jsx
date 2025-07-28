import React from 'react'; // optional for some setups
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome({ canLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
       WELCOME
      </h1>
     

      {canLogin && (
        <Link href="/login">
          <Button size="lg" className="px-8">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
