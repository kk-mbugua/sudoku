import Board from "./ui/board";
import Game from "./ui/game";
import Header from "./ui/header";
import Footer from "./ui/footer"

export default function Home() {
  return (
      <>
        <Header/>
        <main className="flex flex-col justify-center items-center">
          <Game></Game>
        </main>
        <Footer/>
      </>

  );
}
