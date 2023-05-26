import * as React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import S from "./Authentification.module.scss";
import { ChangeEvent } from "react";
import {
  setChatNumber,
  setInstance,
  setToken,
} from "../../store/AuthenticationSlice";
import { Link } from "react-router-dom";

const Authentification: React.FC = () => {
  const data = useSelector((state: RootState) => state.Authentication);
  const dispatch = useAppDispatch();
  return (
    <div className={S.body}>
      <h1>Ведите данные</h1>
      <form>
        <div className={S.block_input}>
          <p className={S.Input_info}>Введите Инстанс</p>
          <input
            placeholder={"Инстанс"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(setInstance(e.target.value));
            }}
            type="text"
            value={data.Instance}
          />
        </div>{" "}
        <div className={S.block_input}>
          <p className={S.Input_info}>Введите Токен</p>
          <input
            placeholder={"Токен"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(setToken(e.target.value));
            }}
            type="text"
            value={data.IDToken}
          />
        </div>{" "}
        <div className={S.block_input}>
          <p className={S.Input_info}>Введите Номер абонента </p>
          <div className={S.input_tel}>
            +7
            <input
              placeholder={"Номер абонента"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                dispatch(setChatNumber(e.target.value));
              }}
              type="text"
              value={data.ChatNumber}
            />
          </div>
        </div>
      </form>
      <Link className={S.btn} to={"/chat"}>
        Войти в чат
      </Link>
    </div>
  );
};

export default Authentification;
