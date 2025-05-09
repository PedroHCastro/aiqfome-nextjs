import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.flexWrapper}>
        <Link href="/">
          <Image
            src="/aiqfome-icon.svg"
            alt="aiqfome logo"
            width={32}
            height={32}
            priority
          />
        </Link>

        <div className={`${styles.flexWrapper} ${styles.addressWapper}`}>
          <Image
            src="/location-icon.svg"
            alt="icone de localização"
            className={styles.locationIcon}
            width={24}
            height={24}
            priority
          />
          <div>
            <span className={styles.addressLabel}>entregando em</span>
            <div className={styles.flexWrapper}>
              <span className={styles.addressValue}>Rua Mandaguari, 198</span>
              <Image
                src="/chevron-right-icon.svg"
                alt="seta"
                width={6}
                height={10}
                priority
              />
            </div>
          </div>
        </div>

        <Image
          src="/profile-icon.svg"
          alt="icone de perfil"
          width={24}
          height={24}
          priority
        />
      </div>
      <h1 className={styles.visuallyHidden}>
        Comida, bebida, mercado e muito mais no aplicativo de delivery do
        interior
      </h1>
    </header>
  );
}
