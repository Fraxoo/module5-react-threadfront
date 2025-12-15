export default function NewCommentComponent() {


    return (
        <div>
            <p>username</p>
            <form >
                <input type="text" name="content" placeholder="Tapez votere commentaire ici!" />
            </form>
            <p>Date</p>
            <button type="submit">Envoyer</button>
        </div>
    )
}