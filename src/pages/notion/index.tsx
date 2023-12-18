import type { GetStaticProps } from 'next';

export const getServerSideProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/notion/notice',
      permanent: false,
    },
  };
};

export default function Notion() {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
