import Board from "./ui/board";
import Header from "./ui/header";
import Footer from "./ui/footer"

export default function Home() {
  return (
      <>
        <Header/>
        <main className="flex flex-column justify-center">
          <div>Some action buttons(game overview)</div>
          <Board/>
          <div>Some details about the game/ Action buttons(game specifics)</div>
        </main>
        <Footer/>
      </>

  );
}
