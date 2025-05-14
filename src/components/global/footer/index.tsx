"use client";

import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerLabel}>feito com 💜 em maringá-PR</p>
      <p className={styles.footerInfo}>
        aiqfome.com © 2007-2023 aiqfome LTDA .
      </p>

      <p className={styles.footerInfo}>CNPJ: 09.186.786/0001-58</p>
    </footer>
  );
}
