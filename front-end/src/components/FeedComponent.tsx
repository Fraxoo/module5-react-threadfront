import PostComponent from "./PostComponent";
import Title from "./TitleComponent";

export default function FeedComponent() {
    return (
        <div>

            <Title text="Feed" />
            <PostComponent />
        </div>
    )
}