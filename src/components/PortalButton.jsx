import style from "../views/DefaultPage.module.css";

export default function PortalButton({ isSpinning, onClick }) {
    return (
        <>
            <div
                className={`${style.portal} ${isSpinning ? style.portalActive : ""}`}
            />
            <div
                className={style.portalClickArea}
                onClick={onClick}
            />
        </>
    );
}
