import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter, NextRouter } from "next/router";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
interface Post {
  id: string;
  title: string;
}

interface Qhlc {
  openTime: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

// interface Data {
//   qhlc: Qhlc[];
// }

interface Props {
  posts: Post[];
  //   market: Post[];
  data: number[];
  qhlc: string[];
  ob: string[];
}
const asWeek1_2: NextPage<Props> = ({ data }) => {
  // const data = [1, 2, 3, 4, 5];
  // console.log(data);
  // candle.length

  // Array
  // push,
  // pop,
  // map,
  // filter,
  // forEach,
  // reduce,
  // sort
  // ฟังก์ชัน Object (Object.values, Object.keys, Object.entries) Destructuring, spread operator

  


  let ob = {};
  data.forEach((item) => {
    // item    
    const result = {
      [new Date(item[0]).toISOString().slice(0, 16).replace("T", " ")]: {
        openTime: item[1],
        open: item[2],
        high: item[3],
        low: item[4],
        close: item[5],
      }
    
    };
    Object.assign(ob, result);
  });
  // = Object.assign({}, data);
  // let arr = {...data};
  console.log(ob);






  // const qhlc = [];
  // console.log(candle.length)

  // for (let index = 0; index < candle.length; index++) {
  //   const qhlc[index] = candle[index];

  // }

  // console.log(data);

  // console.log(candle[0][0]);
  //   console.log(ftx);
  return (
    <div>
      <div>Hello</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let response = await fetch(
    "https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT"
  );

  let data = await response.json();
  return {
    props: {
      //   posts: [
      // {
      //   posts: result,
      //   // id:"1",
      //   // title:"hello world"
      // },
      // {
      // candle: result
      data,
      // high: result[1],
      // low: result[2],
      // close: result[3],
      // },
      //   ],
    },
  };
};
export default asWeek1_2;
