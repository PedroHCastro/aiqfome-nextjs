import Image from "next/image";
import { RestaurantsList } from "@/components/home";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Image
        src="/homeBanner.png"
        width={0}
        height={0}
        alt="Banner promicional"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          marginTop: 1,
        }}
      />
      <main className={styles.main}>
        <RestaurantsList />
      </main>
    </div>
  );
}
