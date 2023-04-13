import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import QAMenu from "../../../components/QAComponents/QAMenu";

const ManageQA = () => {
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
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <QAMenu />
        </div>
        <div className="col-md-10 ">
          <h5 className=" text-2xl">Manage Idea</h5>

          <div className=" mt-3">
            <table className="table">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQA;
