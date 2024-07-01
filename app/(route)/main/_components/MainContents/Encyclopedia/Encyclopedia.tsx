import React, { useEffect, useState } from "react";
import style from "@/_styles/encyclopedia.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { poketmonType } from "@/app/_types/encyclopedia";
import Poketmon from "@/app/_components/Poketmon";
import { poketBuyModalHandler } from "@/app/_store/encyclopediaSlice";

function Encyclopedia() {
  const [poketmon, setpoketmon] = useState<poketmonType[]>();
  const user = useAppSelector(state => state.user.user);
  //Poketmon.tsx에서 선택한 포켓몬 각종 정보
  const selectPoketmon = useAppSelector(state => state.selectPoket);
  //poketmon.tsx에서 구매하기 버튼 누르면 나오는 modal창
  const poketBuyModal = useAppSelector(state => state.ModalControl);
  //상세정보 누르면 나오는 모달창 컨트롤
  const moreDetail = useAppSelector(state => state.moreDetail);
  const dispatch = useAppDispatch();
  const modalClick = (e: React.MouseEvent<HTMLElement>) => {
    // if (e.target.id === "aa") {
    // dispatch(poketBuyModalHandler());
    // }
  };
  const yes = () => {
    console.log("구매하기 yes버튼");
  };
  const no = () => {
    dispatch(poketBuyModalHandler());
  };
  const changeRep = () => {
    console.log("대표 포켓몬 변경 버튼");
  };

  useEffect(() => {
    const getEncyclopedia = async () => {
      try {
        const poketmon = await fetch(`/api/getencyclopedia`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await poketmon.json();
        setpoketmon(res);
      } catch (err) {
        console.log(err);
      }
    };
    getEncyclopedia();
  }, [user]);

  return (
    <>
      <article className={style.encyclopedia_container}>
        {poketmon &&
          poketmon.map(poketmon => {
            return <Poketmon poketmon={poketmon} key={poketmon.id} />;
          })}
        <div
          className={
            poketBuyModal
              ? `${style.sticky_tray} ${style.on}`
              : style.sticky_tray
          }
        >
          <div
            id="aa"
            className={style.encyclopedia_modal}
            onClick={e => modalClick(e)}
          >
            <div className={style.modal_wrap}>
              <div className={style.modal_wrap_first}>
                <p>{selectPoketmon.ko_name}</p>
                <p>{selectPoketmon.credit} 크레딧</p>
              </div>
              <div className={style.modal_wrap_second}>
                <p>
                  <img src={`${selectPoketmon.card_url}`} alt="사진" />
                </p>
                <div className={style.modal_detail_wrap}>
                  <div>
                    <p>{"보유중 크레딧: "}</p>
                    <p>{"차감 크레딧: "}</p>
                    <p>{"TOTAL 크레딧: "}</p>
                  </div>
                  <div>
                    <p>{user && user.credit}</p>
                    <p>{selectPoketmon.credit}</p>
                    <p>{user && user.credit - selectPoketmon.credit}</p>
                  </div>
                </div>
              </div>
              <div className={style.modal_wrap_third}>
                <p>구매하시겠습니까?</p>
                <div className={style.btn}>
                  <button onClick={yes}>예</button>
                  <button onClick={no}>아니오</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            moreDetail
              ? `${style.sticky_tray}  ${style.on}`
              : `${style.sticky_tray}`
          }
        >
          <div
            id="aa"
            className={style.encyclopedia_modal}
            onClick={e => modalClick(e)}
          >
            <div className={style.pickup}>
              {/* <div><Chart num={selectPoketmon.id}></Chart></div> */}
              <button onClick={() => changeRep()}>
                <p>대표캐릭터 설정</p>
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default Encyclopedia;
