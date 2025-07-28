import { useForm, Head, Link } from '@inertiajs/react'; // ✅ include Link
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({ email: '' });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <>
      <Head title="Forgot Password" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-800">
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status && (
              <div className="mb-4 text-sm text-green-600">{status}</div>
            )}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
              <Input
  id="email"
  type="email"
  placeholder="Enter your email"
  value={data.email}
  onChange={(e) => setData('email', e.target.value)}
  required
  className="placeholder:text-slate-500 placeholder:font-medium"
/>

                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={processing}>
                Email Password Reset Link
              </Button>
              <div className="text-center mt-4">
                <Link
                  href={route('login')}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Remember your password? Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
