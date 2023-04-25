import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminComponents/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const ManageUser = () => {
  const [user, setUser] = useState([]);
  const getAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/user");
      setUser(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/admin/user/${id}`);
      console.log(res.data);
      toast.success("Delete Role successfully");
      getAllUser();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-span-12">
          <AdminMenu />
        </div>
        <div className="col-span-12">
          <h5>Manage User</h5>
          <NavLink to="/create-user-admin">
            <button className="btn btn-success m-2">New User</button>
          </NavLink>
          <div className="">
            <table className="table mlg:hidden">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th className="w-[200px] msm:w-[100px]" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {user?.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item?.profile?.phone}</td>
                      <td>{item?.profile?.email}</td>
                      <td>{item?.role?.name}</td>
                      <td>
                        <NavLink to={`/update-user/admin/${item._id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </NavLink>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            deleteUser(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className="lg:hidden">
      <div className=" container grid grid-cols-12 gap-4 px-0 msm:gap-0">
        {user?.map((item, index) => (
          <div
            key={index}
            // style={{
            //   color: moment(item.index).isBefore(moment())
            //     ? "red"
            //     : "black",
            // }}
            className=" w-[320px] h-[300px] rounded shadow-lg mb-[30px] col-span-6 mmd:col-span-12 mmd:mx-[10px] mx-auto msm:gap-0"
          >
            <div className="text-center px-6 py-4 ">
              <div className="font-bold text-xl mb-2">Name: {item.username}</div>
              <div className="">Phone: {item?.profile?.phone}</div>
              <div className="p-[4px]">
                  <p className="font-bold py-[6px]">Email:</p>
                  {item?.profile?.email}</div>
                <div className="my-[10px]"><p className="font-bold">Role:</p>{item?.role?.name}</div>

    
                
              <div className="flex flex-row justify-around">
                <NavLink to={`/update-user/admin/${item._id}`}>
                            <button className="btn btn-primary w-[100px]">Edit</button>
                          </NavLink>
                <button
                            className="btn btn-danger ml-2 w-[100px]"
                            onClick={() => { 
                              deleteUser(item._id);
                            }}
                          >
                            Delete
                          </button>
                </div>
              
              
            </div>
          </div>
        ))}
      </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
