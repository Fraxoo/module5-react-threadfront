import FeedComponent from "../../components/FeedComponent";
import TitleComponent from "../../components/TitleComponent";




export default function Profile() {




    return (
        <main>
            <TitleComponent title="Profile" />
            <div>
                <h2>{user}</h2>
                <div className="post-card">
                    <p>dernier post le <span>15:25 - 13 aout 25</span></p>
                </div>
                <p>5</p>
                <FeedComponent />
            </div>
        </main>
    )
}