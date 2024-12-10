import React from 'react'

const Navbar = () => {
    return (
        <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <h4 className="navbar-brand">RTK</h4>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" >Post</a>
                                </li>
                                <li className="nav-item cursor-pointer">
                                    <a className="cursor-pointer nav-link active" >ReadAll</a>
                                </li>

                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar