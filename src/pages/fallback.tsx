// fallback page
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Fallback() {
  const router = useRouter();

  return (
    <div>
      <h1>404</h1>
      <Button onClick={() => router.push('/')}>Go to home</Button>
    </div>
  );
}
