import './navbar.css'



export default function NavBarComponent() {



    return (
        <div className='footer'>
            <div className="navigation">
                <li className="list">
                    <a href="">
                        <span className="icon">
                            <img src="assets/Createplus.svg" alt="create plus" />
                        </span>

                    </a>

                </li>
                <li className="list">
                    <a href="">
                        <span className="icon">
                            <img src="assets/GoHome.svg" alt="Go Home " />
                        </span>

                    </a>

                </li>
                <li className="list">
                    <a href="">
                        <span className="icon">

                            <img src="assets/comment-alt.svg" alt="comment" />   </span>

                    </a>

                </li>

            </div>
        </div>
    )
}