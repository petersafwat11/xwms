import Image from "next/image";
import styles from "./page.module.css";
import FiltersAndActions from "@/ui/filtersAndActions/FiltersAndActions";

export default function Home() {
  return (
    <div className={styles.page}>
      <FiltersAndActions />
    </div>
  );
}
