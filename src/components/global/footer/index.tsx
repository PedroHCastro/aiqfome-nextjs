"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./footer.module.css";

export function Footer() {
  const pathname = usePathname();
  const idProductScreen = pathname === "/catalogo/[slug]/[product]";

  console.log({ pathname });

  return (
    <footer className={styles.footer}>
      <p className={styles.footerLabel}>feito com 💜 em maringá-PR</p>
      <p className={styles.footerInfo}>
        aiqfome.com © 2007-2023 aiqfome LTDA .
      </p>

      <p className={styles.footerInfo}>CNPJ: 09.186.786/0001-58</p>

      {idProductScreen && (
        <Link href="/ticket">
          <button className={styles.seeTicketButton}>ver ticket</button>
        </Link>
      )}
    </footer>
  );
}
