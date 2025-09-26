import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 bg-gray-100">
      <div></div>

      <h1 className="text-4xl font-bold text-center absolute left-1/2 transform -translate-x-1/2">
        TicketSystem
      </h1>

      <div className="flex justify-end">
        <Link to="/profile" >Profile</Link>
      </div>
    </div>
  );
}
export default Header