import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <>
      <Head title="Login" />
      <div className="min-h-screen flex flex-col md:flex-row">
       
        <div className="w-full md:w-1/2 bg-slate-900 text-white flex items-center justify-center p-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-slate-300 max-w-md">
             WELCOME TO LOGIN PAGE
            </p>
          </div>
        </div>

       
        <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-950 px-6 py-12">
          <div className="w-full max-w-md text-white">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            {status && (
              <div className="mb-4 text-sm text-green-500">{status}</div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="bg-slate-800 text-white"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                  autoFocus
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="bg-slate-800 text-white"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="accent-slate-500"
                  />
                  <span className="text-slate-300">Remember me</span>
                </label>

                <a
                  href={route('password.request')}
                  className="text-blue-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={processing}>
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
