import homeCss from '../styling/home.module.css'

export default function Home(){
    return (
        <>
            <div className={homeCss.body}>
                <h1 className={homeCss.text}>This is the home page</h1>

            </div>
        </>
    )
}

