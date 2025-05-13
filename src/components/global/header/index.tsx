"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./header.module.css";
import { SearchIcon } from "@/assets/icons";

export function Header() {
  const pathname = usePathname();
  const isHomeScreen = pathname === "/";

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

      {isHomeScreen && (
        <div className={styles.searchWrapper}>
          <SearchIcon />
          <input
            className={styles.inputSearch}
            type="text"
            placeholder="busque pela loja ou culinária"
          />
        </div>
      )}
    </header>
  );
}
