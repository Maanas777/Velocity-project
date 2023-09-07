import React from "react";
import "./driverhero.css";

const driverhero = () => {
  return (
    <div className="driver-background ">
      <div className="container ">
        <div className="row">
          <div className="col-lg-12 my-5">
            <button className=" togglebutton">Take Ride</button>
            <p className="text-uppercase d-block my-3">
              enable take ride option to see available trips
            </p>
          </div>
          <div className="container">
            <main className="table ">
           
              <div className="table-responsive">
                <table col-sm-12>
                  <thead>
                    <tr>
                      <th>
                        Id <span></span>
                      </th>
                      <th>
                        Customer <span>&UpArrow;</span>
                      </th>
                      <th>
                        Location <span>&UpArrow;</span>
                      </th>
                      <th>
                        Action <span></span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> 1 </td>
                      <td> Zinzu Chan Lee</td>
                      <td> Seoul </td>

                      <td>
                        <button className="bg-primary">Take the trip</button>
                      </td>
                    </tr>
                    <tr>
                      <td> 1 </td>
                      <td> Zinzu Chan Lee</td>
                      <td> Seoul </td>

                      <td>
                        <button className="bg-primary">Take the trip</button>
                      </td>
                    </tr> <tr>
                      <td> 1 </td>
                      <td> Zinzu Chan Lee</td>
                      <td> Seoul </td>

                      <td>
                        <button className="bg-primary">Take the trip</button>
                      </td>
                    </tr> <tr>
                      <td> 1 </td>
                      <td> Zinzu Chan Lee</td>
                      <td> Seoul </td>

                      <td>
                        <button className="bg-primary">Take the trip</button>
                      </td>
                    </tr> <tr>
                      <td> 1 </td>
                      <td> Zinzu Chan Lee</td>
                      <td> Seoul </td>

                      <td>
                        <button className="bg-primary">Take the trip</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
             
             
            </main>
           
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default driverhero;
