import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";


const IdeaPage = () => {
  const [ideaMap, setIdeaMap] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const token = JSON.parse(localStorage.getItem("auth")).accessToken;

  const getAllIdeas = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/user/idea?page=${currentPage}&limit=${pageSize}`
      );
      setIdeaMap(res.data.docs);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const increaseViewCount = async (id) => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8080/auth/views/${id}`,
        headers: {
          "x-access-token": `${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Something error at view");
    }
  };

  const increaseLike = async (id) => {
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/auth/like/${id}`,
        headers: {
          "x-access-token": `${token}`,
        },
      });
      getAllIdeas();
    } catch (error) {
      console.log(error);
      toast.error("Somethign went error at like and dislike ");
    }
  };

  const increaseDislike = async (id) => {
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/auth/dislike/${id}`,
        headers: {
          "x-access-token": `${token}`,
        },
      });
      getAllIdeas();
    } catch (error) {
      console.log(error);
      toast.error("Something went err at disslike");
    }
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getAllIdeas();
  }, [currentPage, pageSize]);
  return (
    <div
      className="xl:h-[740px] xl:container m-auto mx-[10px]"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    > 
      <table className="table mlg:hidden">
        <thead>
          <tr className="text-center">
            <th>STT</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Submission</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>Views</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ideaMap?.map((item, index) => (
            <tr key={item._id} className="h-[70px] mmd:h-[140px]">
              <td className="text-center leading-[70px]">{index + 1}</td>
              <td className="leading-[70px]">{item.title}</td>
              <td className="leading-[70px]">{item.desc}</td>
              <td className="text-center leading-[70px]">{item.category?.name}</td>
              <td className="text-center leading-[70px]">{item.submission?.name}</td>
              <td className="text-center leading-[70px]">{item.likes?.length || 0}</td>
              <td className="text-center leading-[70px]">{item.dislikes?.length || 0} </td>
              <td className="text-center leading-[70px]">{item.views?.length || 0}</td>
              <td className="text-center leading-[70px]">
                <Link to={`/idea/${item._id}`}>
                  <button
                    className="btn btn-primary mmd:w-[100px]"
                    onClick={() => increaseViewCount(item._id)}
                  >
                    Detail Idea
                  </button>
                </Link>
                <button
                  className="mx-2 btn btn-success m-[10px] mmd:w-[100px]"
                  onClick={() => increaseLike(item._id)}
                >
                  Like
                </button>
                <button
                  className="btn btn-danger mmd:w-[100px]"
                  onClick={() => {
                    increaseDislike(item._id);
                  }}
                >
                  Dislike
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="lg:hidden">
      <div className=" container grid grid-cols-12 gap-4 px-0 msm:gap-0">
        {ideaMap?.map((item, index) => (
          <div
            key={index}
            style={{
              color: moment(item.index).isBefore(moment())
                ? "red"
                : "black",
            }}
            className="max-w-[320px] rounded shadow-lg mb-[30px] col-span-6 mmd:col-span-12 mmd:mx-[10px] mx-auto msm:gap-0"
          >
            <div className="text-center px-6 py-4">
              <img
                className="w-full"
                src="https://cms.greenwich.edu.vn/pluginfile.php/1/theme_adaptable/frontpagerendererdefaultimage/1671766848/edu-survey-landing-image.jpg"
                alt="logoSub"
              />
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <div className="font-bold">Submission: {item.submission?.name}</div>
              <div className="font-bold">Category: {item.category?.name}</div>
              <p>
                Desc:
                {item.desc}
              </p>
              <div className="flex items-center justify-between ">
                <button
                  className="btn btn-success m-[10px] mlg:w-[100px] msm:mx-[8px]"
                  onClick={() => increaseLike(item._id)}
                >
                  Like {item.likes?.length || 0}
                </button>
                <button
                  className="btn btn-danger mmd:w-[100px]  msm:mx-[10px]"
                  onClick={() => {
                    increaseDislike(item._id);
                  }}
                >
                  Dislike {item.dislikes?.length || 0}
                </button>
                <button
                  className="mx-2 btn btn-success mmd:w-[100px] msm:mx-0 "
                  onClick={() => increaseViewCount(item._id)}
                >
                  View {item.views?.length || 0}
                </button>
              </div>
              <Link to={`/idea/${item._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full my-[10px] min-w-full">
                  Detail Ideas
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>

      <div className="text-center text-2xl my-[20px]">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <AiFillLeftCircle />
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="ml-2"
        >
          <AiFillRightCircle />
        </button>
      </div>
    </div>
  );
};

export default IdeaPage;
