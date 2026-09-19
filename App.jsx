import { Routes, Route, Link } from "react-router-dom";
import Mercedes from "./Mercedes";
import BMW from "./BMW";
import Porsche from "./Porsche";
import CarDetails from "./CarDetails";
import TestDrive from "./TestDrive";
import Admin from "./Admin";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";
import MyRequests from "./MyRequests";

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">GERMAN MOTORS</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#brands">Brands</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </nav>

      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="small-title">PREMIUM GERMAN AUTOMOBILES</p>
          <h1>
            EXPERIENCE
            <br />
            <span>GERMAN ENGINEERING</span>
          </h1>
          <p className="hero-text">
            Discover performance, luxury and precision crafted for those who demand more.
          </p>
          <button className="explore-btn">Explore Collection</button>
        </div>
      </section>

      <section className="brands-section" id="brands">
        <div className="section-heading">
          <p>OUR BRANDS</p>
          <h2>Choose Your Experience</h2>
        </div>

        <div className="brand-container">
          <div className="brand-card mercedes">
            <div className="brand-content">
              <h3>Mercedes-Benz</h3>
              <p>Luxury, comfort and timeless elegance.</p>
              <Link to="/mercedes"><button>Explore Mercedes</button></Link>
            </div>
          </div>

          <div className="brand-card bmw">
            <div className="brand-content">
              <h3>BMW</h3>
              <p>Sheer driving pleasure and performance.</p>
              <Link to="/bmw"><button>Explore BMW</button></Link>
            </div>
          </div>

          <div className="brand-card porsche">
            <div className="brand-content">
              <h3>Porsche</h3>
              <p>Precision engineering and pure performance.</p>
              <Link to="/porsche"><button>Explore Porsche</button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <p>ABOUT GERMAN MOTORS</p>
        <h2>
          Where Luxury Meets
          <br />
          Engineering.
        </h2>
        <p className="about-text">
          German Motors brings together some of the world's most iconic German automobiles.
        </p>
      </section>

      <footer id="contact">
        <h3>GERMAN MOTORS</h3>
        <p>Experience German Engineering.</p>
        <p>© 2026 German Motors</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/mercedes" element={<Mercedes />} />
      <Route path="/bmw" element={<BMW />} />
      <Route path="/porsche" element={<Porsche />} />

      <Route path="/cars/:brand/:slug" element={<CarDetails />} />
      <Route path="/test-drive/:brand/:slug" element={<TestDrive />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/my-requests" element={<MyRequests />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}