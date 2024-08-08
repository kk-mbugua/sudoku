import Game from "./ui/game";
import Header from "./ui/header";
import Footer from "./ui/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow flex flex-col justify-center items-center">
        <Game></Game>
      </main>
      <Footer/>
    </div>

  );
}
