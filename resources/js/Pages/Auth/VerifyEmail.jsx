import { useEffect, useState } from 'react';
import { useForm, usePage, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm();
  const [resent, setResent] = useState(false);
  const { auth } = usePage().props;

  const submit = (e) => {
    e.preventDefault();
    post(route('verification.send'), {
      onSuccess: () => setResent(true),
    });
  };

  useEffect(() => {
    if (status === 'verification-link-sent') {
      setResent(true);
    }
  }, [status]);

  return (
    <>
      <Head title="Email Verification" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-800">
              Verify Your Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="text-slate-700 text-sm flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
              <p>
                Thanks for signing up, <strong>{auth.user.name}</strong>! Before getting started,
                please verify your email address by clicking the link we just emailed you.
              </p>
            </div>

            {resent && (
              <div className="text-sm text-green-600 bg-green-100 p-2 rounded-md">
                A new verification link has been sent to your email address.
              </div>
            )}

            <form onSubmit={submit} className="space-y-2">
              <Button type="submit" disabled={processing} className="w-full">
                Resend Verification Email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
