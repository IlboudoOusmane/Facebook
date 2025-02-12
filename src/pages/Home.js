import LeftSidebar from '../composents/LeftSidebar';
import Navbar from '../composents/Navbar';
import RightSidebar from '../composents/RightSidebar';
import '../styles/Home.css';
import PostsList from './PostsList';


const Home = () => {

    return (
        <div>
            <Navbar />
            <LeftSidebar />
            <RightSidebar />
            <PostsList />
        </div>
    );
};

export default Home;
