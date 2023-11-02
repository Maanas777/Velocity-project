
import Drivers from "../../components/admin/drivers/verified_driver";
import Nav from "../../components/admin/navbar/navbar";
const drivers = () => {
  return (
    <div>
      <Nav />
      <div className="container">
        <div  className="row">
            <div className="col-sm-2 col-md-12 col-lg-12 m-5">
          <Drivers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default drivers;
