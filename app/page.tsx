import Signin from "./components/sign/Signin";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {
        //여기에 로그인 확인 후 로그인창 띄울 것인지 바로 메인인지 띄워놔야함
      }
      <Signin />
    </main>
  );
}
