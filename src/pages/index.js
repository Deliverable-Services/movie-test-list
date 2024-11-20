export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/movie-list",
      permanent: true,
    },
  };
}

export default function Home() {
  return null;
}
