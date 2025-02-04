import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RedirectPage() {
  const router = useRouter();
  const { accountId } = router.query;

  useEffect(() => {
    if (accountId) {
      window.location.href = `https://onsocial.id/#/widget/MyPage?accountId=${accountId}`;
    }
  }, [accountId]);

  return <p>Redirecting...</p>;
}
