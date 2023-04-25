import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import moment from "moment";
import QAMenu from "../../../components/QAComponents/QAMenu";

const ManageSubQA = () => {
  const [submission, setSubmission] = useState([]);
  const getAllSub = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/submission");
      setSubmission(res.data.docs);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const isDeadlineExpired = (deadline) => {
    return moment(deadline).isBefore(moment());
  };

  const deleteSub = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/admin/submission/${id}`
      );
      toast.success("Delete Submission successfully");
      getAllSub();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSub();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-span-12 py-[10px]">
          <QAMenu />
        </div>
        <div className="col-span-12">
          <div className="">
            <div className="flex justify-between h-[60px] msm:my-[10px] px-[12px]">
            <h5 className="my-0 leading-[60px] text-2xl msm:hidden">Manage Submission</h5>
            <NavLink to="/create-sub-QA">
              <button className="btn btn-success m-0">New Submission</button>
            </NavLink>
            </div>
            
            <div className="">
              <table className="table">
                <thead>
                  <tr className="">
                    <th className="w-[100px] gap-1" scope="col">Name</th>
                    <th scope="col">Deadline 1</th>
                    <th scope="col">Deadline 2</th>
                    <th className="w-[200px] text-center msm:w-[100px]" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submission?.map((item, index) => (
                    <>
                      <tr key={index} className="">
                        <td className="font-bold">{item.name}</td>
                        <td
                          className={
                            isDeadlineExpired(item.deadline_1)
                              ? "text-red-500  font-bold"
                              : "text-black  font-normal"
                          }
                        >
                          {moment(item.deadline_1).format(
                            "DD - MM - YYYY h:mm a"
                          )}
                        </td>
                        <td
                          className={
                            isDeadlineExpired(item.deadline_2)
                              ? "text-red-500  font-bold"
                              : "text-black font-normal"
                          }
                        >
                          {moment(item.deadline_2).format(
                            "DD - MM - YYYY h:mm a"
                          )}
                        </td>
                        <td className="msm:w-[100px] gap-2">
                          <NavLink to={`/update-sub-QA/${item._id}`}>
                            <button className="btn btn-primary w-[80px] msm:my-[6px] ml-0 msm:ml-[8px]">Edit</button>
                          </NavLink>
                          <button
                            className="btn btn-danger w-[80px]  msm:ml-0"
                            onClick={() => {
                              deleteSub(item._id);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubQA;
