import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData } from "../../../posts/post";
import postStyles from "@/styles/Post.module.css";
import Head from "next/head";

type Props = {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
};

export default function Post({ postData }: Props) {
  return (
    <div className={postStyles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={postStyles.headingXl}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: {} };
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
