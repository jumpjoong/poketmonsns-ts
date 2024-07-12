"use client";
import React, { useEffect, useRef } from "react";
import {
  poketBuyModalHandler,
  moreDetail,
  resetMoreDetail,
  resetPoketBuyModalHandler,
} from "@/app/_store/encyclopediaSlice";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { poketmonType } from "@/app/_types/encyclopedia";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PoketmonStatus from "./_components/PoketmonStatus";
import Poketmon from "./_components/Poketmon";
import style from "@/_styles/encyclopedia.module.scss";

function Encyclopedia() {
  const [refView, inView] = useInView();
  const user = useAppSelector(state => state.user.user);
  //Poketmon.tsx에서 선택한 포켓몬 각종 정보
  const selectPoketmon = useAppSelector(state => state.selectPoket);
  //poketmon.tsx에서 구매하기 버튼 누르면 나오는 modal창
  const poketBuyModal = useAppSelector(state => state.ModalControl);
  //상세정보 누르면 나오는 모달창 컨트롤
  const moreDetailControl = useAppSelector(state => state.moreDetail);
  const dispatch = useAppDispatch();
  //구매하기 모달창 부모 ref
  const parentRef = useRef<HTMLDivElement>(null);
  //스탯 모달창 ref
  const statsRef = useRef<HTMLDivElement>(null);

  //구매하기, 상세보기 눌렀을 때 뜨는 모달창 컨트롤
  const modalClick = (e: React.MouseEvent<HTMLElement>) => {
    //실제 내가 클릭하는 event
    const clickEvent = e.target as HTMLElement;
    //구매하기 눌렀을 때 모달창 로직
    if (clickEvent.className === parentRef.current?.className) {
      //모달창 외부 클릭할 경우 모달창 닫는 로직
      dispatch(poketBuyModalHandler());
    } else if (clickEvent.className === statsRef.current?.className) {
      //상세보기의 모달창 외부를 눌렀을 경우의 모달창 닫는 로직
      dispatch(moreDetail());
    }
  };
  const yes = async () => {
    //크레딧이 부족하여 못사는 로직
    if (user && user?.credit < selectPoketmon.credit) {
      window.alert("구매하실 수 없습니다!");
      dispatch(poketBuyModalHandler());
    } else {
      const updateCredit = user && user?.credit - selectPoketmon.credit;
      //have_poke에 행 추가
      await fetch(`/api/encyclopedia`, {
        method: "POST",
        body: JSON.stringify({
          user_id: user?.id,
          poke_id: selectPoketmon.id,
        }),
      });
      await fetch(`/api/userdata`, {
        method: "POST",
        body: JSON.stringify({
          user_id: user && user.id,
          credit: updateCredit,
        }),
      });
      location.reload();
    }
  };
  //아니오 버튼
  const no = () => {
    dispatch(poketBuyModalHandler());
  };
  //대표 포켓몬 변경
  const changeRep = async () => {
    if (user?.my_poketmon.some(obj => obj.poke_id === selectPoketmon.id)) {
      await fetch(`/api/changerep`, {
        method: "POST",
        body: JSON.stringify({
          user_id: user.id,
          rep: selectPoketmon.id,
        }),
      });
      location.reload();
    } else {
      alert("구매 먼저 진행해주세요!");
      dispatch(resetMoreDetail());
    }
  };

  const fetchPoketmon = async (pageParam: number) => {
    const poketmon = await fetch(
      `/api/encyclopedia?page=${pageParam}&limit=30`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return poketmon.json();
  };
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["todos"],
      queryFn: ({ pageParam = 1 }) => fetchPoketmon(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.length ? allPage.length + 1 : null;
      },
    });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    return () => {
      dispatch(resetMoreDetail());
      dispatch(resetPoketBuyModalHandler());
    };
  }, [inView, fetchNextPage, hasNextPage]);
  return (
    <>
      <article className={style.encyclopedia_container}>
        {data?.pages &&
          data?.pages.map(poketmon =>
            poketmon.map((obj: poketmonType) => {
              return (
                <Poketmon poketmon={obj} key={obj.id} innerRef={refView} />
              );
            })
          )}
        <div
          className={
            poketBuyModal
              ? `${style.sticky_tray} ${style.on}`
              : style.sticky_tray
          }
        >
          <div
            className={style.encyclopedia_modal}
            onClick={e => modalClick(e)}
            ref={parentRef}
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
            moreDetailControl
              ? `${style.sticky_tray}  ${style.on}`
              : `${style.sticky_tray}`
          }
        >
          <div
            className={`${style.encyclopedia_modal} ${style.stats}`}
            onClick={e => modalClick(e)}
            ref={statsRef}
          >
            <div className={style.pickup}>
              <PoketmonStatus />
              <button onClick={() => changeRep()}>
                <p>대표캐릭터 설정</p>
              </button>
            </div>
          </div>
        </div>
        {isFetchingNextPage && <h3>로딩 이미지 또는 스피너 css구현할 것</h3>}
      </article>
    </>
  );
}

export default Encyclopedia;
