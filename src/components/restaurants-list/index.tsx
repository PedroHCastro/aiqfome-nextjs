import restaurants from "@/data/restaurants.json";
import { RestaurantCard } from "@/components/restaurant-card";
import styles from "./restaurants-list.module.css";

export default function RestaurantsList() {
  return (
    <div>
      <section>
        <h2 className={styles.titleSection}>abertos</h2>
        {restaurants.open.map((item) => (
          <RestaurantCard key={item.id} data={item} isOpen />
        ))}
      </section>
      <section>
        <h2 className={styles.titleSection}>fechados</h2>
        {restaurants.closed.map((item) => (
          <RestaurantCard key={item.id} data={item} />
        ))}
      </section>
    </div>
  );
}
