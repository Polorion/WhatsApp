import * as React from "react";
import S from "./ChatPage.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { getAllMessages, sendMessage } from "../../store/ChatSlice";
import { ChangeEvent } from "react";

const ChatPage = () => {
  const params = useSelector((state: RootState) => state.Authentication);
  const messages = useSelector((state: RootState) => state.ChatSlice.message);
  const dispatch = useAppDispatch();
  const [valueInput, setValueInput] = React.useState<string>("");
  const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValueInput(e.target.value);
  };

  const interval = React.useRef<any>();
  React.useEffect(() => {
    interval.current = setInterval(() => {
      dispatch(getAllMessages(params));
    }, 5000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(sendMessage({ params, valueInput }));
    setValueInput("");
  };
  return (
    <div className={S.body}>
      <Link to={"/"}> выбрать другой чат</Link>
      <div className={S.areaText}>
        {messages &&
          messages.map((el) => {
            return (
              <div
                key={Math.random()}
                className={`${!el.from ? S.right : S.left} ${S.message}`}
              >
                <div className={S.text}>
                  <span>{el.value}</span>
                </div>
                <div className={S.time}>
                  <span>{el.time}</span>
                </div>
              </div>
            );
          })}
      </div>
      <form className={S.form}>
        <textarea value={valueInput} onChange={inputHandler} />
        <button
          onClick={(e) => {
            buttonHandler(e);
          }}
          type={"submit"}
        >
          Отправить сообщение
        </button>{" "}
      </form>
    </div>
  );
};

export default ChatPage;
