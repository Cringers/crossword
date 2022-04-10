import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CrosswordBoxContainer from "./components/VerticalWord/CrosswordBoxContainer";
import CrosswordInputBox from "./components/VerticalWord/CrosswordInputBox";
import { Modal } from "./components/Modal";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>crossword</title>
        <meta name="description" content="Co-op crosswords" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Ethan is?</h1>
      <CrosswordBoxContainer value={"dralssa"} />
    </div>
  );
};

export default Home;
