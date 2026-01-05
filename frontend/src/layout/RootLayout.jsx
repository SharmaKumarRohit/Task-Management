import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Container from "../components/UI/Container";

function RootLayout() {
  return (
    <>
      <div className="min-h-screen font-inter bg-neutral-50 text-neutral-900">
        <Container>
          <header className="bg-neutral-50 mb-8">
            <Nav />
          </header>
          <main>
            <Outlet />
          </main>
        </Container>
      </div>
    </>
  );
}

export default RootLayout;
