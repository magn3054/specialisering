import style from "./DefaultPage.module.css";

export default function NotFound() {
    return (
        <div className={style.main}>
            <section>
                <p> 
                    Hov! siden blev ikke fundet.
                </p>
            </section>
        </div>
    )
}