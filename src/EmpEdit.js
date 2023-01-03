
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';

const EmpEdit = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/viewEmployee", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) => res.json())
            .then((response) => {
                // first you have to get the employees array data
                let empArr = response.allEmployeeList
                // then you have to filter the empliyee you need
                let resp = empArr.find(customer => customer.bpartnerId === parseInt(empid))
                console.log(resp);
                idchange(resp.bpartnerId);
                firstnamechange(resp.firstName);
                lastnamechange(resp.lastName);
                titlechange(resp.titleId);
                genderchange(resp.genderId);
                nicchange(resp.nicNo);
                dateofbirthchange(resp.dateOfBirth);
                contactnumberchange(resp.contactNumber);
                emailchange(resp.email);
                departmentchange(resp.departmentId);
                designationchange(resp.designationId);
                nationalitychange(resp.nationalityId);
                addresschange(resp.address);
                countrychange(resp.countryId);
                citychange(resp.cityId);
                profilePicturechange(resp.profilePicture);
                isProfilePictureChangechange(resp.isProfilePictureChange);
                profilePictureNameExtensionchange(resp.profilePictureNameExtension);
                descriptionchange(resp.description);
                remarkschange(resp.remark);
                setFile("https://pms.saprosolutions.com/image" + resp.profilePicturePath + `?id=2`)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []);

    const [imageData, setImageData] = useState({
        profilePicture: "",//base64,
        isProfilePictureChange: false,//boolean
        profilePictureNameExtension: ""//image ext,
    })

    const [bpartnerId, idchange] = useState(0);
    const [firstName, firstnamechange] = useState("");
    const [lastName, lastnamechange] = useState("");
    const [titleId, titlechange] = useState("");
    const [genderId, genderchange] = useState("");
    const [nicNo, nicchange] = useState("");
    const [dateOfBirth, dateofbirthchange] = useState("");
    const [contactNumber, contactnumberchange] = useState("");
    const [email, emailchange] = useState("");
    const [departmentId, departmentchange] = useState("");
    const [designationId, designationchange] = useState("");
    const [nationalityId, nationalitychange] = useState("");
    const [address, addresschange] = useState("");
    const [countryId, countrychange] = useState("");
    const [cityId, citychange] = useState("");
    const [profilePicture, profilePicturechange] = useState("");
    const [isProfilePictureChange, isProfilePictureChangechange] = useState("");
    const [profilePictureNameExtension, profilePictureNameExtensionchange] = useState("");
    const [description, descriptionchange] = useState("");
    const [remark, remarkschange] = useState("");
    const [isActive, activechange] = useState(true);


    // dropdown values
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/getAllActiveCountry", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            setCountryList(resp);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])


    const [titleList, setTitleList] = useState([]);

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/getAllActiveTitle", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            setTitleList(resp);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])

    const [genderList, setGenderList] = useState([]);

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/getAllActiveGender", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            setGenderList(resp);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])


    const [departmentList, setDepartmentList] = useState([]);

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/getAllActiveDepartment", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            setDepartmentList(resp);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])


    const [designationList, setDesignationList] = useState([]);

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/getAllActiveDesignation", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            setDesignationList(resp);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])


    const [nationalityList, setNationalityList] = useState([]);

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/getAllActiveNationality", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            setNationalityList(resp);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])


    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/getAllActiveCity", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            setCityList(resp);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])


    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = {
            bpartnerId,
            firstName,
            lastName,
            titleId,
            genderId,
            nicNo,
            dateOfBirth,
            contactNumber,
            email,
            departmentId,
            designationId,
            nationalityId,
            address,
            countryId,
            cityId,
            description,
            remark,
            isActive,
        }


        fetch("http://45.32.99.72:8087/assignmentBE/checkEmployeeExist", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "clientId": 101,
                "bpartnerId": parseInt(empdata.bpartnerId),
                "nicNo": empdata.nicNo
            }),
        }).then(res => res.json()).then(res => {
            /**
             * ExistType Values:
             * 0 = Not exist / New record
             * 1 = NIC exist
             */
            if (res.existType === 0) {
                console.log("New Record")
                /** call save employee method here to create/edit employee */

                fetch("http://45.32.99.72:8087/assignmentBE/saveEmployee", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        "clientId": 101,
                        "orgId": 101,
                        "userId": 9, ...empdata,...imageData
                    }),
                })
                    .then((res) => {

                        swal({
                            title: "Request Successful!",
                            text: "Record has Edited successfully  !",
                            icon: "success",
                            button: "okay",
                        });
                        // alert("Edited successfully.");
                        navigate("/");
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            } else {
                console.log("Employee already exists.")
                /** you can add a sweet alert here too. if you want to show this alert message. */
            }
        })
    }
    let timestamp = Number(dateOfBirth.toString().split());
    const date = new Date(timestamp);
    console.log(date)
    const dateValues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    ];
    console.log(dateValues)


    const [file, setFile] = useState();
    function handleChange(e) {
        console.log("Uploaded File Data");
        console.log(e.target.files[0].type);

        // converting images to base64
        let reader = new FileReader();
        reader.onload = () => {
            // printing base64 image
            console.log(reader.result)
            // image extension
            console.log("image extension", e.target.files[0].type.split("/")[1]);
            setImageData({
                isProfilePictureChange: true,
                profilePicture: reader.result,
                profilePictureNameExtension: e.target.files[0].type.split("/")[1]
            })
        }
        // setting the uploaded file to convert to base64 
        reader.readAsDataURL(e.target.files[0])

        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const validateMobile = (e) => {
        console.log(e.target.value.match(/[^\d]/))
        if(e.target.value.match(/[^\d]/)){
          e.target.nextSibling.innerHTML = "Number should only be consisted of digits"
        }else{
          contactnumberchange(e.target.value);
        }
      }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    {/* <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Id</label>
                                            <input id="bpartnerId"  type="text" required value={bpartnerId}   onChange={e=>idchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>First Name <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_first_name"
                                                placeholder="Enter FirstName"
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => firstnamechange(e.target.value)}
                                                className="form-control"
                                            />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_firstName"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Last Name <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_last_name"
                                                placeholder="Enter LastName"
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => lastnamechange(e.target.value)}
                                                className="form-control"
                                            />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_lastName"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>Title <sup style={{ color: "red" }}>*</sup></label>
                                            <select
                                                id="id_input_fm_1_title"
                                                onChange={(e) => titlechange(parseInt(e.target.value))}
                                                className="form-control"
                                                value={titleId}
                                            >
                                                <option value={""}>
                                                    -select-
                                                </option>
                                                {titleList.map((title_item, index) => <option key={index} value={title_item.titleId}>{title_item.name}</option>)}
                                            </select>
                                            <span className="text-danger" id="errorMsg_title"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>Gender <sup style={{ color: "red" }}>*</sup></label>
                                            <select
                                                id="id_input_fm_1_gender"
                                                onChange={(e) => genderchange(parseInt(e.target.value))}
                                                className="form-control"
                                                value={genderId}
                                            >
                                                <option selected="true" value="">
                                                    -select-
                                                </option>
                                                {genderList.map((gender_item, index) => <option key={index} value={gender_item.genderId}>{gender_item.name}</option>)}
                                            </select>
                                            <span className="text-danger" id="errorMsg_gender"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>NIC <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_nic"
                                                placeholder="Enter NIC number"
                                                value={nicNo}
                                                pattern="^([0-9]{9}[x|X|v|V]|[0-9]{12})$"
                                                size="12"
                                                minlength="10"
                                                maxlength="12"
                                                onChange={(e) => nicchange(e.target.value)}
                                                className="form-control"
                                            />
                                            <span className="text-danger" id="errorMsg_nic"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>Date of Birth <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_date_of_birth"
                                                value={dateValues[0] + '-' + dateValues[1] + '-' + dateValues[2]}
                                                type="date"
                                                onChange={(e) => dateofbirthchange(e.target.value)}
                                                className="form-control"
                                            />
                                            <span className="text-danger" id="errorMsg_dob"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Contact Number <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_contact_number"
                                                value={contactNumber}
                                                type="text"
                                                placeholder="Ender the correct phone number"
                                                minLength="10"
                                                maxLength="10"
                                                onChange={(e) => validateMobile(e)}
                                                className="form-control"
                                            />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_contactNumber"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Email <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_email"
                                                placeholder="Enter Email"
                                                type="email"
                                                onChange={(e) => emailchange(e.target.value)}
                                                className="form-control"
                                                value={email}
                                            />
                                            <span className="text-danger" id="errorMsg_email"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Department <sup style={{ color: "red" }}>*</sup></label>
                                            <select
                                                id="id_input_fm_1_department"
                                                onChange={(e) => departmentchange(parseInt(e.target.value))}
                                                className="form-control"
                                                value={departmentId}
                                            >
                                                <option selected="true" value="">
                                                    -select-
                                                </option>
                                                {departmentList.map((department_item, index) => <option key={index} value={department_item.departmentId}>{department_item.name}</option>)}
                                            </select>
                                            <span
                                                className="text-danger"
                                                id="errorMsg_department"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Designation <sup style={{ color: "red" }}>*</sup></label>
                                            <select
                                                id="id_input_fm_1_designation"
                                                onChange={(e) => designationchange(parseInt(e.target.value))}
                                                className="form-control"
                                                value={designationId}
                                            >
                                                <option selected="true" value="">
                                                    -select-
                                                </option>
                                                {designationList.map((designation_item, index) => <option key={index} value={designation_item.designationId}>{designation_item.name}</option>)}
                                            </select>
                                            <span
                                                className="text-danger"
                                                id="errorMsg_designation"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Nationality <sup style={{ color: "red" }}>*</sup></label>
                                            <select
                                                id="id_input_fm_1_nationality"
                                                onChange={(e) => nationalitychange(parseInt(e.target.value))}
                                                className="form-control"
                                                value={nationalityId}
                                            >
                                                <option selected="true" value="">
                                                    -select-
                                                </option>
                                                {nationalityList.map((nationality_item, index) => <option key={index} value={nationality_item.nationalityId}>{nationality_item.name}</option>)}
                                            </select>
                                            <span
                                                className="text-danger"
                                                id="errorMsg_nationality"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_address"
                                                placeholder="Enter Address"
                                                type="text"
                                                onChange={(e) => addresschange(e.target.value)}
                                                className="form-control"
                                                value={address}
                                            />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_address"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Country <sup style={{ color: "red" }}>*</sup></label>
                                            <select
                                                id="id_input_fm_1_country"
                                                onChange={(e) => countrychange(parseInt(e.target.value))}
                                                className="form-control"
                                                value={countryId}
                                            >
                                                <option selected="true" value="">
                                                    -select-
                                                </option>
                                                {countryList.map((country_item, index) => <option key={index} value={country_item.countryId}>{country_item.name}</option>)}
                                            </select>
                                            <span
                                                className="text-danger"
                                                id="errorMsg_country"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>City <sup style={{ color: "red" }}>*</sup></label>
                                            <select
                                                id="id_input_fm_1_city"
                                                onChange={(e) => citychange(parseInt(e.target.value))}
                                                className="form-control "
                                                value={cityId}
                                            >
                                                <option selected="true" value="">
                                                    -select-
                                                </option>
                                                {cityList.map((city_item, index) => <option key={index} value={city_item.cityId}>{city_item.name}</option>)}
                                            </select>
                                            <span className="text-danger" id="errorMsg_city"></span>
                                        </div>
                                    </div>

                                    {/* <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Profile Picture</label>
                                            <input
                                                id="id_input_fm_1_profile_picture"
                                                type="file"
                                                value={profilePicture}
                                                onChange={(e) => profilePicturechange(e.target.value)}
                                                className="form-control"
                                            />
                                            <img src={profilePicture} alt={"Image"} width="300" height="300" text-align="left" style={{ display: 'block' }} />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_profilePicture"
                                            ></span>
                                        </div>
                                    </div> */}

                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Profile Picture</label>
                                            <input type="file"
                                                value={profilePicture}
                                                className="form-control"
                                                onChange={handleChange} />
                                            <img src={file} style={{ height: "200px", width: "200px" }} />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_profilePicture"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input
                                                id="id_input_fm_1_description"
                                                type="textarea"
                                                placeholder="Enter Description"
                                                value={description}
                                                onChange={(e) => descriptionchange(e.target.value)}
                                                className="form-control"
                                            />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_description"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Remarks</label>
                                            <input
                                                id="id_input_fm_1_remarks"
                                                type="textarea"
                                                placeholder="Enter Remarks"
                                                value={remark}
                                                onChange={(e) => remarkschange(e.target.value)}
                                                className="form-control"
                                            />
                                            <span className="text-danger" id="errorMsg_remark"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-check">
                                            <input
                                                checked={isActive}
                                                onChange={(e) => activechange(e.target.checked)}
                                                type="checkbox"
                                                className="form-check-input"
                                                id="id_input_fm_1_active"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="id_input_fm_1_active"
                                            >
                                                Active <sup style={{ color: "red" }}>*</sup>
                                            </label>
                                            <span className="text-danger" id="errorMsg_active"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmpEdit;