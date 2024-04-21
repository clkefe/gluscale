import BottomNav from "../../components/BottomNav";

export default function Layout({ children }) {
  return (
    <>
      <main>
        {children}
        <BottomNav />
      </main>
    </>
  );
}
