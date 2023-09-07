import React from "react";
import Navbar from "../../components/admin/navbar/navbar";
import Users from "../../components/admin/users/user";

const users = () => {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-sm-2 col-md-12 col-lg-12 m-5">
              <Users />
            </div>
          </div>
        </div>
      </div>
    );
  }

export default users;
