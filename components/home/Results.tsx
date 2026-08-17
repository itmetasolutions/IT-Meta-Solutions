import { Counter } from "@/components/motion/Counter";
import styles from "./Results.module.scss";

const stats = [
  { value: 50, suffix: "+", label: "Projects shipped" },
  { value: 40, suffix: "+", label: "Businesses worked with" },
  { value: 100, suffix: "%", label: "Commitment to the work" },
];

export function Results() {
  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>Where things stand</span>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <Counter value={stat.value} suffix={stat.suffix} className={styles.value} />
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
