import React, { useEffect } from 'react';
import Footer from '../../Components/core/Footer';
import Navbar from '../../Components/core/Navbar';
import { useDispatch } from 'react-redux'
import { getMe } from '../../functions/auth';
const Home = ({ history, location }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(location.search.split('=')[0].split('?')[1] === 'google'){
      localStorage.setItem('ccAirlinesAuth', 'eheufhrigufhgr8gr8');
      getMe(dispatch)
      history.push('/')
    }
  },[])
  return (
    <div className="bodyy">
      <Navbar />
      <section className="colored-section" id="title">
        <div className="container-fluid">
          <nav className="navbarr navbar-expand-lg navbar-dark">
            <span className="navbar-brandd link-decoration">CC Airlines</span>
          </nav>

          <div className="row">
            <div className="col-lg-6">
              <h1 className="big-heading">
                Dedicated for happy flying experience.
              </h1>
              <button
                onClick={() => history.push('/flights/search')}
                type="button"
                className="download-button btn btn-dark btn-lg"
              >
                <i className="fab fa-google-play"></i>
                Book now
              </button>
              <button
                onClick={() => history.push('/web/check')}
                type="button"
                className="download-button btn btn-light btn-lg"
              >
                <i className="fab fa-google-play"></i> Web checkin
              </button>
            </div>

            <div className="col-lg-6">
              <img
                className="diya"
                src="https://images.unsplash.com/reserve/iFW2JucQi2520x6vB5wW_IMG_1735_edited.jpg?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGFpcmxpbmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="diwali-diya"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="white-section" id="features">
        <div className="container-fluid">
          <div className="row">
            <div className="feature-box col-lg-4">
              <i className="icon fa-4x fas fa-bullseye"></i>
              <h3 className="feature-title">Easy to book.</h3>
              <p>So easy to book, everyone can book it in just seconds.</p>
            </div>
            <div className="feature-box col-lg-4">
              <i className="icon fa-4x fas fa-plane"></i>
              <h3 className="features-headings">Elite Clientele</h3>
              <p>Get flights all over the country.</p>
            </div>
            <div className="feature-box col-lg-4">
              <i className="icon fa-4x fas fa-rupee-sign"></i>
              <h3 className="features-headings">Guaranteed value.</h3>
              <p>Get the best price.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div
          id="testimonial-carousel"
          className="carousel slide"
          data-ride="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active container-fluid">
              <h2 className="testimonial-text">
                The sky looks even more beautiful when you watch it from above
                through @CC_AIRLINES flight ✈️
              </h2>
              <img
                className="testimonial-image"
                src="/images/random-1.jpg"
                alt="man1-profile"
              />
              <em>Charles, New York</em>
            </div>
            <div className="carousel-item container-fluid">
              <h2 className="testimonial-text">
                Completed one of my long term wish ..going native by flights for
                both ways ..thank u @CC_AIRLINES made this possible !! Now I
                love flying 😍😍😍.
              </h2>
              <img
                className="testimonial-image"
                src="/images/random-2.jpg"
                alt="lady-profile"
              />
              <em>Beverly, Illinois</em>
            </div>
            <div className="carousel-item container-fluid">
              <h2 className="testimonial-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                sed a eos soluta.
              </h2>
              <img
                className="testimonial-image"
                src="/images/random-3.jpg"
                alt="man2-profile"
              />
              <em>Sid, Madhya Pradesh</em>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#testimonial-carousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </a>
          <a
            className="carousel-control-next"
            href="#testimonial-carousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </section>

      <section id="press">
        <img
          className="press-logo"
          src="/images/techcrunch.png"
          alt="tc-logo"
        />
        <img className="press-logo" src="/images/tnw.png" alt="tnw-logo" />
        <img
          className="press-logo"
          src="/images/bizinsider.png"
          alt="biz-insider-logo"
        />
        <img
          className="press-logo"
          src="/images/mashable.png"
          alt="mashable-logo"
        />
      </section>

      <section className="white-section" id="cta">
        <div className="container-fluid">
          <h3 className="big-heading">
            Find the Best Flights for your sweet journey Today.
          </h3>
          <button
            type="button"
            onClick={() => history.push('/flights/search')}
            className="download-button btn btn-dark btn-lg"
          >
            <i className="fab fa-google-play"></i>
            Book now
          </button>
          <button
            type="button"
            onClick={() => history.push('/web/check')}
            className="download-button btn btn-light btn-lg"
          >
            <i className="fab fa-google-play"></i>
            Web Checkin
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
