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
      let cost: number = form.usdtInput; 
      let btcTotal: number = 0; 
      for (let index = 0; index < 5; index++) {
        console.log("price: ", dataBids[index][0], "btc: ", dataBids[index][1])
      }
      console.log("cost usdt total of btc: ",dataBids[0][0] * dataBids[0][1]," USDT")
      let index = 0;
      while (cost > 0){

          const element = dataBids[index];
        // for (let index = 0; index < dataBids.length; index++) {
          const usdtTotal = Number(element[0]) * Number(element[1])
          if(cost >= usdtTotal){
            cost =  cost - usdtTotal;
            btcTotal += Number(element[1]);
            console.log("if cost: ", cost, "btc: ",btcTotal)
          }
          // ????? กรณีน้อยกว่า
          else if(cost < usdtTotal){
            btcTotal += (cost * (Number(element[1])/usdtTotal));
            cost = 0;
            console.log("final btc: " + btcTotal);
          }
          
          index = index + 1;
        }
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
