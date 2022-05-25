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
interface Props {
  posts: Post[];
  //   market: Post[];
}

const asWeek1_1: NextPage<Props> = ({ ftx, binance }) => {
  // const deff = ftx>binance? ftx - binance : binance - ftx;
  // const deff = ftx - binance;


  // ftx: 1000,
  // binance: 500,

  const deff = binance - ftx
 
  // หาของbinance
  const percent = ((ftx - binance)/binance)*100

  // console.log(percent)

  // const percent= (deff / (binance >= ftx ? binance : ftx))*100;
  // console.log(binance >= ftx ? binance : ftx)
  // console.log(percent);
  return (
    <div>
      <div>Hello</div>
      <div>
        FTX BTC Price: {ftx} USDT
        {/* <ul>
          { data.map(item => {
            return (
              // <li key={i}>{i}</li>
              <li key={item.id}>{item.name}</li>
            );
          })}
        </ul> */}
      </div>
      <div>binance BTC Price: {binance} USDT</div>
      <div>Diff: {deff.toFixed(2)} USDT { percent.toFixed(6) }% เมื่อเทียบกับ Binance BTC Price</div>
      {/* <div>{ posts }</div> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let response = await fetch(
    "https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
  );
  let resMarket = await fetch("https://ftx.com/api/markets/BTC/USDT");

  let resultMarket = await resMarket.json();
  let result = await response.json();
  return {
    props: {

      ftx: resultMarket.result.price,
      binance: result.price,

      // ftx: 47538,
      // binance: 47517.75954371,
      // 0.0425955610793873


      // },
      //   ],
    },
  };
};
export default asWeek1_1;
