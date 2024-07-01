import React from "react";
import { poketmonType } from "../_types/encyclopedia";
import style from "@/_styles/encyclopedia.module.scss";
import { useAppDispatch, useAppSelector } from "../_hooks/hooks";
import {
  moreDetail,
  poketBuyModalHandler,
  selectPoket,
} from "../_store/encyclopediaSlice";

function Poketmon({ poketmon }: { poketmon: poketmonType }) {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const poketBuyHandler = (poketmon: poketmonType) => {
    dispatch(selectPoket(poketmon));
    if (user?.my_poketmon.some(obj => obj.poke_id === poketmon.id)) {
      alert("이미 보유중인 포켓몬 입니다");
    } else {
      //팝업창 생성
      dispatch(poketBuyModalHandler());
    }
  };
  //상세보기 버튼
  const pokeDetail = () => {
    dispatch(moreDetail());
    dispatch(selectPoket(poketmon));
    console.log("상세보기버튼, Chart.js 써야함", poketmon.id);
  };
  return (
    <figure
      className={
        user?.my_poketmon.some(obj => obj.poke_id === poketmon.id)
          ? `${style.poke_card}`
          : `${style.poke_card} ${style.have}`
      }
      key={poketmon.id}
    >
      <div className={style.card_img_wrap}>
        <img src={poketmon.card_url} alt={poketmon.en_name}></img>
      </div>
      <figcaption className={style.card_info_wrap}>
        <p>
          No.{poketmon.id} &nbsp;
          {poketmon.ko_name}
        </p>
        <div className={style.info_btn_wrap}>
          {user?.my_poketmon.some(obj => obj.poke_id === poketmon.id) ? (
            <button disabled>구매하기</button>
          ) : (
            <button onClick={() => poketBuyHandler(poketmon)}>구매하기</button>
          )}
          <button onClick={() => pokeDetail()}>상세정보</button>
        </div>
      </figcaption>
    </figure>
  );
}

export default Poketmon;
