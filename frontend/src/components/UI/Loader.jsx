import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className="fixed top-2/5 left-[42%] sm:left-[48%]">
      <svg viewBox="25 25 50 50" className={styles.svg}>
        <circle
          r={20}
          cy={50}
          cx={50}
          className={`${styles.circle} stroke-teal-600`}
        />
      </svg>
    </div>
  );
};

export default Loader;
