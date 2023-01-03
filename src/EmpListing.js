import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';


const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadEdit = (bpartnerId) => {
        navigate("/employee/edit/" + bpartnerId);
    }
    const Deactivatefunction = (bpartnerId) => {
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    {
                        fetch("http://45.32.99.72:8087/assignmentBE/deactivateEmployee", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                "clientId": 101,
                                "orgId": 11,
                                "userId": 9,
                                "bpartnerId": bpartnerId
                            })
                        }).then((res) => {
                            // alert('Deactivate successfully.')
                            window.location.reload();
                        }).catch((err) => {
                            console.log(err.message)
                        })
                    }
                    swal("deactivated successfully.....!!", {
                        icon: "success",
                    });
                } else {
                    swal("Active..!");
                }
            });
    };
    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/viewEmployee", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            console.log(resp);
            empdatachange(resp.allEmployeeList);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Id</td>
                                <td>FirstName</td>
                                <td>LastName</td>
                                <td>Designation</td>
                                <td>Active</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.bpartnerId}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.designationName}</td>
                                        <td>{item.isActive ? <input type="checkbox" checked={true} /> : <input type="checkbox" checked={false} />}</td>
                                        <td><Link to={"employee/edit/" + item.bpartnerId} className="btn btn-success">Edit</Link>
                                            <Link onClick={() => { Deactivatefunction(item.bpartnerId) }} className="btn btn-danger">Deactivate</Link>
                                            <div className="divbtn">
                                                <Link to="pass/create" className="btn btn-secondary">Add passport details (+)</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;