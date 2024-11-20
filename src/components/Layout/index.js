import Footer from "./Footer";
import Header from "./Header";
import styles from "@/styles/layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* <Header /> */}
      <main className={styles["main-content"]}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
