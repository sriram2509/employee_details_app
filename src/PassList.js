import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';


const PassList = () => {
    const [passdata, passdatachange] = useState(null);
    const navigate = useNavigate();

    const loadEdit = (passportId) => {
        navigate("/pass/edit/" + passportId);
    }
    const Deactivatefunction = (passportId) => {
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
                        fetch("http://45.32.99.72:8087/assignmentBE/customer/deletePassport", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                "clientId": 101,
                                "orgId": 11,
                                "userId": 9,
                                "passportId": passportId
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
        fetch("http://45.32.99.72:8087/assignmentBE/customer/viewPassportTab", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9,
                "bpartnerId": 75
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            console.log(resp);
            passdatachange(resp.allCustomerPassportTableList);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])

    const dateFormatter = (date_in_millis) => {
        var date = new Date(date_in_millis);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);

        // console.log(`${month}-${day}-${year}`); 
        return `${month}-${day}-${year}`
    }
    return (
        <div className="container-lg">
            <div className="card">
                <div className="card-title">
                    <h2>Passport List</h2>
                </div>
                <div className="card-body" >

                    <table className="table table-bordered">
                        <thead
                        // className="bg-dark text-white"
                        >
                            <tr>
                                {/* <td>Id</td> */}
                                <td>Number</td>
                                <td>PassportType</td>
                                <td>Issue Date</td>
                                <td>Expire Date</td>
                                <td>Collected</td>
                                <td>Remarks</td>
                                <td>Active</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {passdata &&
                                passdata.map((item, index) => (
                                    <tr key={index}>
                                        {/* <td>{item.passportId}</td> */}
                                        <td>{item.passportNo}</td>
                                        <td>{item.passportTypeName}</td>
                                        <td>{dateFormatter(item.issueDate)}</td>
                                        <td>{dateFormatter(item.expireDate)}</td>
                                        <td>{item.isCollected ? <input type="checkbox" checked={true} /> : <input type="checkbox" checked={false} />}</td>
                                        <td>{item.remark}</td>
                                        <td>{item.isActive ? <input type="checkbox" checked={true} /> : <input type="checkbox" checked={false} />}</td>
                                        <td><Link to={"pass/edit/" + item.passportId} className="btn btn-outline-success">Edit</Link>
                                            <Link onClick={() => { Deactivatefunction(item.passportId) }} className="btn btn-outline-danger">Delete</Link>
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

export default PassList;