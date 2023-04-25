import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminComponents/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

const ManageIdea = () => {
  const [ideas, setIdeas] = useState([]);

  const getAllIdea = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/idea");
      setIdeas(res.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIdea = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/admin/idea/${id}`);
      console.log(res.data);
      toast.success("Delete Idea successfully");
      getAllIdea();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllIdea();
  }, []);

  return (
    <div className="md:container md:m-auto">
      <div className="row">
        <div className="col-span-12">
          <AdminMenu />
        </div>
        <div className="col-span-12">
          <h5 className=" text-2xl">Manage Idea</h5>

          <div className=" mt-3">
            <table className="table mlg:hidden">
              <thead>
                <th>Title</th>
                <th>Content</th>
                <th>Description</th>
                <th>Like</th>
                <th>Dislike</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Action</th>
              </thead>
              <tbody>
                {ideas?.map((item, index) => (
                  <tr key={index}>
                    <>
                      <td className="font-bold">{item.title}</td>
                      <td>
                        {item.content.length > 100
                          ? item.content.slice(0, 100) + "...etc"
                          : item.content}
                      </td>
                      <td>{item.desc}</td>
                      <td>{item?.likes?.length || 0}</td>
                      <td>{item?.dislikes?.length || 0}</td>
                      <td>{item?.views?.length || 0}</td>
                      <td>{item?.comments?.length || 0}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteIdea(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
      <div className="lg:hidden">
      <div className=" container grid grid-cols-12 gap-4 px-0 msm:gap-0">
        {ideas?.map((item, index) => (
          <div
            key={index}
            // style={{
            //   color: moment(item.index).isBefore(moment())
            //     ? "red"
            //     : "black",
            // }}
            className=" relative w-[320px] h-[300px] rounded shadow-lg mb-[30px] col-span-6 mmd:col-span-12 mmd:mx-[10px] mx-auto msm:gap-0"
          >
            <div className="text-center px-6 py-4 ">
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <div className="">Content: {item.content.length > 100
                          ? item.content.slice(0, 100) + "...etc"
                          : item.content}</div>
              <div className="">Desc: {item.desc}</div>
              <div className="absolute bottom-0 w-[320px] left-[0px]">

              <div className="flex items-center justify-between p-[6px] ">
                <div className="px-[4px]">
                  <p className="font-bold">Like:</p>
                  {item?.likes?.length || 0}</div>
                <div className=""><p className="font-bold">Dislike:</p>{item?.dislikes?.length || 0}</div>
                <div className=""><p className="font-bold">View</p>{item?.views?.length || 0}</div>
                <div className=""><p className="font-bold">Comment</p>{item?.comments?.length || 0}</div>
              </div>
              <button
                          className="btn btn-danger w-[320px]"
                          onClick={() => {
                            deleteIdea(item._id);
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

export default ManageIdea;
