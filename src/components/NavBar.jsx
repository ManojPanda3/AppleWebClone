import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constant";
const NavBar = () => {
  return (
    <header className="w-full sm:px-10 p-5 flex justify-between items-center z-1">
      <nav className="w-full screen-max-width flex">
        <img src={appleImg} alt="Apple" width={14} />
        <div className="flex flex-1 justify-center max-md:hidden">
          {navLists.map((elm, index) => (
            <div
              key={elm + index}
              className="px-5 text-gray text-sm cursor-pointer hover:text-white"
            >
              {elm}
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-6 max-md:flex-1 max-md:justify-end">
          <img src={searchImg} alt="Search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;