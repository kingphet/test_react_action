import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import Swal from 'sweetalert2'
const App = () => {
  const [list, setlist] = useState("");
  const [save, setSave] = useState([]);
  const [chek, setShek] = useState(false);
  const [edit, setEdit] = useState("");

  const saveList = () => {
    if (!list) {
      Swal.fire('You are not information')
    }
    //this function from add()
    else if (chek && list) {
      const reles = save.map((item) => {
        if (item.id === edit) {
          return { ...item, title: list };
        }
        return item;
      });
      // setSave(reles);
      // setlist("");
      // setShek(false);

      //alert
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setSave(reles);
          setlist("");
          setShek(false);
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          setlist("");
          setShek(false);
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      //
    } //
    else {
      const listall = {
        id: uuidv4(),
        title: list,
      };
      setSave([...save, listall]);
      setlist("");
    }
  };

  function remove(id) {
    const removed = save.filter((item) => item.id !== id);
 //   setSave(removed);

 //alert
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setSave(removed);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }




  function add(id) {
    setShek(true);
    setEdit(id);
    const saveAdd = save.find((item) => item.id === id);
    setlist(saveAdd.title);
  }

  return (
    <>
      <div className="bg-blue-500 w-full h-screen flex items-center justify-center px-80 lg:px-30">
        <div className="w-2/3 h-auto bg-red-200 px-5 py-5 rounded-md">
          <h1 className="text-center text-lg font-bold my-5">Todo List App</h1>
          <div className="flex justify-center flex-col">
            <div className="">
              <input
                type="text"
                className="w-9/12 h-8 rounded-l-sm outline-none px-3 mt-1"
                value={list}
                onChange={(e) => setlist(e.target.value)}
              />
              <button
                type="submit"
                className="w-3/12 h-8 bg-blue-400 rounded-r-sm"
                onClick={saveList}
              >
                {chek ? "Updete" : "Send"}
              </button>
            </div>
            <div className="w-full h-auto my-2">
              {save.map((user, index) => {
                return (
                  <div
                    className="w-full h-auto bg-blue-100 mb-1 flex items-center justify-between px-2 rounded-sm py-2"
                    key={index}
                  >
                    <p>{user.title}</p>
                    <div className="flex">
                      <BsPencilSquare
                        className="text-lg mr-4 cursor-pointer"
                        onClick={() => add(user.id)}
                      />
                      <AiFillDelete
                        className="text-lg cursor-pointer"
                        onClick={() => remove(user.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default App;
