import axios from "axios";
import { useEffect, useState } from "react";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [userData, setUserData] = useState();
  const [page, setPage] = useState(1);
  const handleDelete = (id) => {
    try {
      const user = async () => {
        const user = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        };
        const { data } = await axios.delete(
          `https://neuronex-server-test.vercel.app/admin/user/${id}`,

          config
        );
        console.log(data);
        alert("user deleted");
      };
      user();
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
      alert("something went wrong");
      console.log("something went wrong");
    }
  };
  const handleUid = async (uid) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data: dataGet } = await axios.post(
        `https://neuronex-server-test.vercel.app/transaction/admin/all/${localStorage.getItem(
          "user_id"
        )}`,
        {
          uid,
        },
        config
      );
      console.log(dataGet);
      console.log(uid);
    } catch (error) {
      console.log(error);
      toast.error({
        title: "Error Occurred!",
        description: "Failed to fetch user session data.",
        status: "error",
        duration: 4000,
        isClosable: true,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    try {
      const user = async () => {
        const user = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        };
        const { data } = await axios.get(
          `https://neuronex-server-test.vercel.app/user/all?page=${page}&limit=8`,
          config
        );
        setUserData(data);
      };
      user();
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  return (
    <div className="w-full ">
      {!userData ? (
        <LoadingAnimation></LoadingAnimation>
      ) : (
        <div className="overflow-x-auto mx-10 mt-10">
          <div className="flex md:justify-between ">
            <h2 className="text-4xl font-bold mb-5">Manage Users</h2>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-info btn-xs  btn-rounded lg:hidden mt-5 ml-16"
            >
              Open drawer
            </label>
          </div>
          <table className="table w-full text-md">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Credential</th>
                <th>About</th>
                <th>Payed</th>
                <th>Token Remail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {userData?.map((userData) => (
                <tr
                  data-aos-duration="3000"
                  data-aos="fade-left"
                  key={userData._id}
                >
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={userData?.pic} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{userData?.name}</div>
                        <div className="text-sm opacity-50">Bangladesh</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {userData?.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {userData?.uid}
                    </span>
                  </td>
                  <td>Buyer</td>
                  <th>
                    {/* <button className="btn btn-ghost btn-xs">
                      Make Verified
                    </button> */}
                    <button
                      onClick={() => handleDelete(userData?._id)}
                      className="btn btn-error btn-outline btn-xs"
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleUid(userData?.uid)}
                      className="btn btn-error btn-outline btn-xs"
                    >
                      see all
                    </button>
                  </th>
                </tr>
              ))}
              {/* row 2 */}
            </tbody>
            {/* foot */}
            <tfoot className="flex">
              <div className="flex mt-2 xs:mt-0 items-center justify-center ">
                {/* <!-- Buttons --> */}
                <button
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Prev
                </button>
                <button
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 "
                >
                  Next
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
