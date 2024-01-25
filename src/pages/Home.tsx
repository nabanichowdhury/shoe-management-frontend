import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold"> Your Ultimate Shoe Odyssey Begins Here</h1>
                    <p className="mb-5">Step into a world of endless possibilities as you explore our incredible inventory. Whether you crave comfort or crave style, we have the perfect pair waiting just for you.</p>
                    <button className="btn btn-primary">
                        <Link to="/login">Get Started</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;