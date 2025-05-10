import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-purple-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/campaigns" className="text-white font-bold text-xl">Ad Dashboard</Link>
        <div className="flex space-x-4">
          <Link to="/campaigns" className="text-white hover:bg-purple-700 px-3 py-2 rounded">Campaigns</Link>
          <Link to="/upload" className="text-white hover:bg-purple-700 px-3 py-2 rounded">Create New</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;