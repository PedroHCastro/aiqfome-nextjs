import RestaurantsList from "@/components/restaurants-list";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <RestaurantsList />
      </main>
    </div>
  );
}
