export async function getServerSideProps({ params }) {
  const { accountId } = params;

  return {
    redirect: {
      destination: `https://onsocial.id/#/${accountId}/widget/MyPage?accountId=${accountId}`,
      permanent: false, // Set to true for a permanent (301) redirect
    },
  };
}

export default function RedirectPage() {
  return <p>Redirecting...</p>;
}
