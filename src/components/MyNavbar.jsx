import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function MyNavbar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navigate = useNavigate();
  console.log(localStorage);
  const isLoggedIn = localStorage.getItem("access_token");
  const username = localStorage.getItem("username");
  // const navList = (
  //   <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Pages
  //       </a>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Account
  //       </a>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <Button variant="text" onClick={ () => navigate('login')}>
  //           Login
  //       </Button>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Docs
  //       </a>
  //     </Typography>
  //   </ul>
  // );
  const handleLogout = () => {
    //TODO request to backend
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/");
  };

    return (
        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <div className="flex flex-row items-center">
                    <Typography
                        as="a"
                        onClick={() => navigate('/')}
                        variant="h5"
                        className="mr-4 cursor-pointer py-1.5 text-bold"
                    >
                        <span>NotesEE</span>
                    </Typography>
                    <Typography
                        variant="Button"
                        onClick={() => navigate('/notes')}
                        className="mr-4 cursor-pointer py-1.5 font-normal"
                    >
                        <span>Notes</span>
                    </Typography>
                    <Typography
                        variant="Button"
                        onClick={() => navigate('/todos')}
                        className="mr-4 cursor-pointer py-1.5 font-normal"
                    >
                        <span>Todos</span>
                    </Typography>
                </div>
                {/* <div className="hidden lg:block">{navList}</div> */}
                {isLoggedIn ? <div className="w-full"><Button onClick={handleLogout}
                                                                                            variant="gradient" size="sm"
                                                                                            className="hidden float-right lg:inline-block">
                        <span>Logout</span></Button><span className="font-bold float-right mr-4 mt-1">{username}</span></div> :
                    <Button onClick={() => navigate('/login')} variant="gradient" size="sm"
                            className="hidden lg:inline-block">
                        <span>Login / Signup</span>
                    </Button>}

        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {/* {navList} */}
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              variant="gradient"
              size="sm"
              className="mb-2"
            >
              <span>Logout</span>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("login")}
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
            >
              <span>Login / Signup</span>
            </Button>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
}
