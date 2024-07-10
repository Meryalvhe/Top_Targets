import React from "react";
import "../../styles/about.css";
import mar from "../../img/mar.jpg";
import mery from "../../img/mery.jpg";
import fide from "../../img/fide.jpg";
import profes from "../../img/edo y hector.jpg";
import { Link } from "react-router-dom";

export const About = () => {
    return (
        <div className="bg-dark p-5">
            <section className="row bg-dark text-white">
                <h1 className="text-center text-white title">About</h1>
                <article className="col-12 pt-3 pb-3">
                    <h3 className="text-white title">What is <strong>Top Target</strong>?</h3>
                    <p className="body ps-4">It is a web application that, with the assistance of IA, generates stories based on real criminals. The user will be able to use these stories to generate their own stories.</p>
                    <h3 className="text-white title">Our main <strong>Goal</strong></h3>
                    <p className="body ps-4">Our main goal is to help writers generate </p>
                    <h3 className="text-white title">Why <strong>Top Target</strong></h3>
                    <p className="body ps-4">There is an increase in the interest of people on real life crime stories </p>
                    <h3 className="text-white title">About the <strong>API</strong> we use</h3>
                    <p className="body ps-4">The API that we use contains the information of about one thousand people. The information contains data about the crimes, age, weight, and location of where the crime was committed.</p>
                    <h3 className="text-white title">Main <strong>features</strong></h3>
                    <ul>
                        <li className="body">Provide information to users about the most wanted criminals and missing persons</li>
                        <li className="body">Save the cards of the most wanted criminals and missing persons in the profile</li>
                        <li className="body">Generate stories using IA based on the stories of the most wanted criminals and missing persons</li>
                    </ul>

                    <div className="d-flex justify-content-center justify-content-md-start">
                        <span className="m-3 icono">
                            <a href="mailto:toptargets@protonmail.com">
                                <i className="fas fa-inbox fa-xl" style={{ color: "#ffffff" }} />
                            </a>
                        </span>
                        <span className="m-3 icono">
                            <a href="https://www.facebook.com/profile.php?id=61561687935433&locale=ca_ES">
                                <i className="fab fa-facebook fa-xl" style={{ color: "#ffffff" }} />
                            </a>
                        </span>
                    </div>
                </article>
            </section>

            <section className="row">
                <h1 className="mt-3 mb-3 title text-white">Developers</h1>

                <div className="col-12 col-md-4 px-1 mb-3">
                    <aside className="card bg-primary text-white fixed-size-card rounded-3 cardAbout">
                        <img className="card-img-top mt-3 img-fluid w-75 mx-auto d-block rounded-3" src={mar} alt="Mar Aguayo" />
                        <div className="card-body">
                            <h5 className="card-title">Mar Aguayo</h5>
                            <p className="card-text">Living in survival mode while learning to code. Student at 4Geeks.</p>
                            <aside className="d-flex justify-content-center">
                                <span className="m-3 icono">
                                    <a href="https://www.linkedin.com/in/mar-aguayo-florit-a49a77135/">
                                        <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>

                <div className="col-12 col-md-4 px-1 mb-3">
                    <aside className="card bg-primary text-white fixed-size-card rounded-3 cardAbout">
                        <img className="card-img-top mt-3 img-fluid w-75 mx-auto d-block rounded-3" src={mery} alt="Mery Alvarez" />
                        <div className="card-body">
                            <h5 className="card-title">Mery Alvarez</h5>
                            <p className="card-text">"It's just murder. All God's creatures do it. You look in the forests and you see species killing other species, our species killing all species including the forests, and we just call it industry, not murder" - Natural born killers</p>
                            <aside className="d-flex justify-content-center">
                                <span className="m-3 icono">
                                    <a href="https://www.linkedin.com/in/luz-mery-alvarez-herrera-223533129/">
                                        <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>

                <div className="col-12 col-md-4 px-1 mb-3">
                    <aside className="card bg-primary text-white fixed-size-card rounded-3 cardAbout">
                        <img className="card-img-top mt-3 img-fluid w-75 mx-auto d-block rounded-3" src={fide} alt="José Fidel Paredes" />
                        <div className="card-body">
                            <h5 className="card-title">José Fidel Paredes</h5>
                            <p className="card-text">Frankestein is considered a monster, but he ain't done a website application. So if we are speaking about monsters, I am the biggest one! </p>
                            <aside className="d-flex justify-content-center">
                                <span className="m-3 icono">
                                    <a href="https://www.linkedin.com/in/josé-fidel-paredes">
                                        <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="row">
                <h1 className="mt-3 mb-3 text-white">Project Managers</h1>

                <div className="col-12 col-md-4 px-1 mb-3">
                    <aside className="card bg-primary text-white fixed-size-card rounded-3 cardAbout">
                        <img className="card-img-top mt-3 img-fluid w-75 mx-auto d-block rounded-3" src={profes} alt="Hector Chocobar & Eduardo Fernandez" />
                        <div className="card-body">
                            <h5 className="card-title">Hector Chocobar & Eduardo Fernandez</h5>
                            <p className="card-text">Driving some crazy people onto the fascinating world of coding.</p>
                            <aside className="d-flex justify-content-center">
                                <span className="m-3 icono">
                                    <a href="https://www.linkedin.com/school/4geeksacademyes/posts/?feedView=all">
                                        <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};
