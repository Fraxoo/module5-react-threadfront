import './navbar.css';


export default function NavBarComponent() {



    return (
        <div className='footer'>
            <div className="navigation">
                <li className="list">
                    <a href="">
                        <span className="icon">
                            <img src="Createplus.svg" alt="create plus" />
                        </span>

                    </a>

                </li>
                <li className="list">
                    <a href="">
                        <span className="icon">
                            <img src="GoHome.svg" alt="create plus" />
                        </span>

                    </a>

                </li>
                <li className="list">
                    <a href="">
                        <span className="icon">

                            <img src="comment-alt.svg" alt="create plus" />   </span>

                    </a>

                </li>

            </div>
        </div>
    )
}