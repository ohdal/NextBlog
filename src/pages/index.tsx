import Image from "next/image";
import { Inter } from "next/font/google";
import homeStyles from "@/styles/home.module.css";
import { GetStaticProps } from "next";
import { getSortedPostsData } from "../../posts/post";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  allPostsData: { id: string; title: string; date: string }[];
};

export default function Home({ allPostsData }: Props) {
  return (
    <div>
      <section className={homeStyles.headingMd}>
        <p>[OHDAL Introduction]</p>
        <p>[This is a website]</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({ id, title, date }, idx) => (
            <li key={idx} className={homeStyles.listItem}>
              <a>{title}</a>
              <br />
              <small className={homeStyles.lightText}>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
};
