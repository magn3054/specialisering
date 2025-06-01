import { Outlet } from "react-router-dom";
import TrophyButton from "./components/TrophyButton";
import BackButton from "./components/BackButton";


function Layout() {
    return (
        <>
            {/* <Header /> */}
            <Outlet />
            <div style={{ position: "fixed", top: "1rem", right: "1rem", display: "flex", gap: "1rem", width: "fit-content", zIndex: 1000 }}>
                <BackButton />
                <TrophyButton />
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Layout;