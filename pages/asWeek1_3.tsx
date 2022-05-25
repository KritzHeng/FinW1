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
  data: number[];
  // bids:string[];
  qhlc: string[];
  ob: string[];
}
type InputTodo = {usdtInput: number;}

const asWeek1_2: NextPage<Props> = ({ data }: any) => {
  const [form, setForm] = useState<InputTodo>({ usdtInput: 0});
  const [inputData, setInputData] = useState<InputTodo>(0);
  const [result, setResult] = useState(0);

  const [dataBids, setDataBids] = useState(data.bids);
  const [dataAsks, setDataAsks] = useState(data.asks);
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://api1.binance.com/api/v3/depth?symbol=BTCUSDT")
        .then((res) => {
          return res.json();
        })
        .then((resJson) => {
          setDataBids(resJson.bids);
          setDataAsks(resJson.asks);
        });
    }, 1000);
  }, []);
  // console.log(dataBids);
  
  const handleSubmit = async () => {
    
    try {
      // setInputData(form.usdtInput);
      // console.log(inputData)
      // let m: number;
      let cost: number = form.usdtInput; 
      let btc: number = 0; 
      console.log(dataBids[0][0])
      console.log(dataBids[0][1])
      for (let index = 0; index < dataBids.length; index++) {
        const element = dataBids[index];
        // const element = 29367.99000000;
        
        if(cost >= Number(element[0])){
          cost =  cost - Number(element[0]);
          btc =  btc + Number(element[1]);

          console.log("cost: " + cost);
          console.log("btc: " + btc);
          // setForm();
          // console.log(form.usdtInput);
          // cost = cost - element[0];
        }
// ????? กรณีน้อยกว่า
        // else if()
        
      }

      // const res = 1;
      // console.log(form.usdtInput);
    } catch (error) {}
  };


  return (
    <div>
      <div>
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
        >
          <input
            type="number"
            value={form.usdtInput}
            placeholder="usdt"
            onChange={e => setForm({...form, usdtInput: e.target.value})}
            required
          ></input>
          <button
            type="submit"
            value="update"
          >buy</button>
        </form>

      <div>{result}</div>
      </div>
      {/* <input type="text" placeholder=" usdt "></input> */}
      {/* {dataBids[0]} */}
        bids
        <div>

        {dataBids.map((item: any, index: number) => {
          if(index<5){
            return (
              <div>
              Price: {item[0]} Amount BTC: {item[1]}
            </div>
          );
        }
        })}
        
        </div>
        asks
        <div>
        {dataAsks.map((item:any, index: number)=>
        {
          if(index<5){
          return(
            <div>Price: {item[0]} Amount BTC: {item[1]}</div>
          )
        }
        })}
        </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let response = await fetch(
    "https://api1.binance.com/api/v3/depth?symbol=BTCUSDT"
  );
  let data = await response.json();
  return {
    props: {
      data,
    },
  };
};
export default asWeek1_2;
