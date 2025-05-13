import Image from "next/image";
import styles from "./restaurant-id.module.css";

interface Params {
  logo: string;
  name: string;
  extraInformation?: string;
}

export function RestaurantId({ logo, name, extraInformation }: Params) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src={`/${logo}`}
        alt={`Logo ${name}`}
        width={36}
        height={36}
      />
      <div className={styles.titleWrapper}>
        {extraInformation && (
          <span className={styles.extraInformation}>{extraInformation}</span>
        )}
        <h1
          className={`${styles.title} ${
            extraInformation ? styles.titleWithExtraInformation : ""
          }`}
        >
          {name}
        </h1>
      </div>
    </div>
  );
}
