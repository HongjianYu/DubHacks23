import { getSortedPostsData } from '../lib/posts';
import App from './App';

export default function Home({ allPostsData }) {
  return (
    <App />
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
