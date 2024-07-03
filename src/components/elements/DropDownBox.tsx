interface props {
  session?: boolean | false; //test api session login: session : Section
  setMenu: (value: boolean) => void;
  listDropdownItem: React.ReactNode[];
}

const DropDownBox = ({ session, setMenu, listDropdownItem }: props) => {
  // handle event click: check/login
  function handleClick() {
    //check session -> session
    setMenu(false);
  }

  return (
    <div
      id="basic-menu"
      aria-labelledby={"basic-button"}
      className={`w-[12rem] h-fit text-sm flex flex-col items-center absolute top-[50px] rounded-b-xl z-50 bg-white shadow text-green-5`}
    >
      {/* // test session : Session -> assumption session false/true */}
      {listDropdownItem &&
        listDropdownItem.map((element, index) => {
          return (
            <div className="w-full" key={index}>
              {element}
            </div>
          );
        })}
    </div>
  );
};

export default DropDownBox;
