
import Driververif from "../../components/admin/driververification/table";
import Nav from "../../components/admin/navbar/navbar";

const driververify = () => {
  return (
    <div>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-md-12 col-lg-12 m-5">
            <Driververif />
          </div>
        </div>
      </div>
    </div>
  );
};

export default driververify;
