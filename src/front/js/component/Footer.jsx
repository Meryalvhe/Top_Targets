import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/footer.css";

export const Footer = () => (
    <footer className="footer bg-primary mt-auto py-3">
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link p-2">
                                <button className="cta">
                                    <span className="hover-underline-animation body text-light"> Contact </span>
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cookies" className="nav-link p-2">
                                <button className="cta">
                                    <span className="hover-underline-animation body text-light"> Cookies </span>
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/privacy-policy" className="nav-link p-2">
                                <button className="cta">
                                    <span className="hover-underline-animation body text-light"> Privacy Policy </span>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                    <span className="m-2">
                        <a href="mailto:toptargets@protonmail.com">
                            <i className="fas fa-inbox" style={{ color: "#ffffff" }} />
                        </a>
                    </span>
                    <span className="m-2">
                        <Link to="https://www.google.com">
                            <i className="fab fa-instagram" style={{ color: "#ffffff" }} />
                        </Link>
                    </span>
                    <span className="m-2">
                        <Link to="https://www.google.com">
                            <i className="fab fa-linkedin" style={{ color: "#ffffff" }} />
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    </footer>
);
