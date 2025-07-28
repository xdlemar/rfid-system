import { useForm, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors } = useForm({
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.confirm'));
  };

  return (
    <>
      <Head title="Confirm Password" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-800">
              Confirm Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">
              For your security, please confirm your password before continuing.
            </p>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  required
                  autoFocus
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={processing}>
                Confirm
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
