export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/sign-in",
      permanent: true,
    },
  };
}

export default function Home() {
  return null;
}
