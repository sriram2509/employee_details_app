import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';


const EmpCreate = () => {
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
  
  const [imageData, setImageData] = useState({
    profilePicture: "",//base64,
    isProfilePictureChange: false,//boolean
    profilePictureNameExtension: ""//image ext,
})

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

  const resetForm = () => {
    idchange("");
    firstnamechange("");
    lastnamechange("");
    titlechange("");
    genderchange("");
    nicchange("");
    dateofbirthchange("");
    contactnumberchange("");
    emailchange("");
    departmentchange("");
    designationchange("");
    nationalitychange("");
    addresschange("");
    countrychange("");
    citychange("");
    profilePicturechange("");
    isProfilePictureChangechange("");
    profilePictureNameExtensionchange("");
    descriptionchange("");
    remarkschange("");
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const value_firstName = document.getElementById(
      "id_input_fm_1_first_name"
    ).value;
    const value_lastName = document.getElementById(
      "id_input_fm_1_last_name"
    ).value;
    const value_title = document.getElementById("id_input_fm_1_title").value;
    const value_gender = document.getElementById("id_input_fm_1_gender").value;
    const value_nic = document.getElementById("id_input_fm_1_nic").value;
    const value_dob = document.getElementById(
      "id_input_fm_1_date_of_birth"
    ).value;
    const value_contactNumber = document.getElementById(
      "id_input_fm_1_contact_number"
    ).value;
    const value_email = document.getElementById("id_input_fm_1_email").value;
    const value_department = document.getElementById(
      "id_input_fm_1_department"
    ).value;
    const value_designation = document.getElementById(
      "id_input_fm_1_designation"
    ).value;
    const value_nationality = document.getElementById(
      "id_input_fm_1_nationality"
    ).value;
    const value_address = document.getElementById(
      "id_input_fm_1_address"
    ).value;
    const value_country = document.getElementById(
      "id_input_fm_1_country"
    ).value;
    const value_city = document.getElementById(
      "id_input_fm_1_city"
    ).value;
    const value_active = document.getElementById(
      "id_input_fm_1_active"
    ).checked;

    if (value_firstName === "") {
      document.getElementById("errorMsg_firstName").innerHTML =
        "Enter the firstname";
    } else {
      document.getElementById("errorMsg_firstName").innerHTML = "";
    }
    if (value_lastName === "") {
      document.getElementById("errorMsg_lastName").innerHTML =
        "Enter the lastname";
    } else {
      document.getElementById("errorMsg_lastName").innerHTML = "";
    }
    if (value_title === "") {
      document.getElementById("errorMsg_title").innerHTML = "Select the title";
    } else {
      document.getElementById("errorMsg_title").innerHTML = "";
    }
    if (value_gender === "") {
      document.getElementById("errorMsg_gender").innerHTML =
        "Select the gender";
    } else {
      document.getElementById("errorMsg_gender").innerHTML = "";
    }
    if (value_nic === "") {
      document.getElementById("errorMsg_nic").innerHTML = "Enter the NIC";
    } else {
      document.getElementById("errorMsg_nic").innerHTML = "";
    }
    if (value_dob === "") {
      document.getElementById("errorMsg_dob").innerHTML =
        "Enter the Date of Birth";
    } else {
      document.getElementById("errorMsg_dob").innerHTML = "";
    }
    if (value_contactNumber === "") {
      document.getElementById("errorMsg_contactNumber").innerHTML =
        "Enter the contact number";
    } else {
      document.getElementById("errorMsg_contactNumber").innerHTML = "";
    }
    if (value_email === "") {
      document.getElementById("errorMsg_email").innerHTML = "Enter the email";
    } else {
      document.getElementById("errorMsg_email").innerHTML = "";
    }
    if (value_department === "") {
      document.getElementById("errorMsg_department").innerHTML =
        "Select the department";
    } else {
      document.getElementById("errorMsg_department").innerHTML = "";
    }
    if (value_designation === "") {
      document.getElementById("errorMsg_designation").innerHTML =
        "Select the designation";
    } else {
      document.getElementById("errorMsg_designation").innerHTML = "";
    }
    if (value_nationality === "") {
      document.getElementById("errorMsg_nationality").innerHTML =
        "Select the nationality";
    } else {
      document.getElementById("errorMsg_nationality").innerHTML = "";
    }
    if (value_address === "") {
      document.getElementById("errorMsg_address").innerHTML =
        "Enter the address";
    } else {
      document.getElementById("errorMsg_address").innerHTML = "";
    }
    if (value_country === "") {
      document.getElementById("errorMsg_country").innerHTML =
        "Select the country";
    } else {
      document.getElementById("errorMsg_country").innerHTML = "";
    }
    if (value_city === "") {
      document.getElementById("errorMsg_city").innerHTML = "Select the city";
    } else {
      document.getElementById("errorMsg_city").innerHTML = "";
    }
    if (value_active === false) {
      document.getElementById("errorMsg_active").innerHTML =
        "This field is required";
    } else {
      document.getElementById("errorMsg_active").innerHTML = "";
    }

    // check all fields not empty
    if (
      value_firstName !== "" &&
      value_lastName !== "" &&
      value_title !== "" &&
      value_gender !== "" &&
      value_nic !== "" &&
      value_dob !== "" &&
      value_contactNumber !== "" &&
      value_email !== "" &&
      value_department !== "" &&
      value_designation !== "" &&
      value_nationality !== "" &&
      value_address !== "" &&
      value_country !== "" &&
      value_city !== "" &&
      value_active !== false
    ) {
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
      };

    

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
                text: "New Record has successfully added !",
                icon: "success",
                button: "okay",
              });
              // alert("Saved successfully.");
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
  };

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log("Uploaded File Data");
    const uploadedFile = e.target.files[0]
    
    // converting images to base64
    let reader = new FileReader();
    reader.onload = () => {
      // printing base64 image
      console.log(reader.result)
      // image extension
      console.log("image extension", uploadedFile.type.split("/")[1]);
      setImageData({
        isProfilePictureChange: true,
        profilePicture: reader.result,
        profilePictureNameExtension: uploadedFile.type.split("/")[1]
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
      <div className="row mt-4">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h3 className="mt-4 mx-2">Create Employee</h3>
              </div>

              {/* <div className="col-lg-6">
                    <div className="form-group">
                      <label>Id</label>
                      <input
                        id="bpartnerId"
                      
                        type="text"
                        value={bpartnerId}
                        onChange={(e) => idchange(e.target.value)}
                        className="form-control"
                      />
              </div>
              </div> */}


              <div className="card-body">
                <div className="row">
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
                        value={dateOfBirth}
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
                      <img src={profilePicture} alt={"Image"} width="300" height="300" text-align="left" style={{display:'block'}} />
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
                      <img src={file} style={{ height: "200px", width: "900px" }} />
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
                  <div className="col-lg-4">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        submit
                      </button>
                      <input
                        className="btn btn-danger"
                        type="reset"
                        onClick={() => resetForm()}
                      />
                      <Link to="/" className="btn btn-dark">
                        Back
                      </Link>
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
};

export default EmpCreate;