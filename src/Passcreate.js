import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import PassList from "./PassList";


const PassCreate = () => {
    const [bpartnerId, idchange] = useState(75);
    const [passportId, passportIdchange] = useState(0);
    const [passportNo, passportNochange] = useState("");
    const [passportTypeId, passportTypeIdchange] = useState("");
    const [issueDate, issueDatechange] = useState("");
    const [expireDate, expireDatechange] = useState("");
    const [documentId, documentIdchange] = useState("");
    const [attachment, attachmentchange] = useState("");
    const [attachmentExtension, attachmentExtensionchange] = useState("");
    const [isModified, isModifiedchange] = useState("");
    const [remark, remarkchange] = useState("");
    const [isCollected, isCollectedchange] = useState(false);
    const [isActive, isActivechange] = useState(true);
    const [imageData, setImageData] = useState([]);

    // dropdown values
    const [passporttypeList, setpassporttypeList] = useState([]);

    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/getAllActivePassportType", {
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
            setpassporttypeList(resp);
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [])

    const navigate = useNavigate();

    const resetForm = () => {
        passportIdchange("");
        passportNochange("");
        passportTypeIdchange("");
        issueDatechange("");
        expireDatechange("");
        documentIdchange("");
        attachmentchange("");
        attachmentExtensionchange("");
        isModifiedchange("");
        remarkchange("");
        isCollectedchange("");
        isActivechange("")
    };

    const handlesubmit = (e) => {
        e.preventDefault();

        const value_passportNo = document.getElementById(
            "id_input_fm_1_passportNo"
        ).value;
        const value_passportTypeId = document.getElementById(
            "id_input_fm_1_passportTypeId"
        ).value;
        const value_issueDate = document.getElementById(
            "id_input_fm_1_issueDate"
        ).value;
        const value_expireDate = document.getElementById(
            "id_input_fm_1_expireDate"
        ).value;
        // const value_attachment = document.getElementById(
        //     "id_input_fm_1_attachment"
        // ).value;
        // const value_remark = document.getElementById(
        //     "id_input_fm_1_remarks"
        // ).value;
        const value_isCollected = document.getElementById(
            "id_input_fm_1_isCollected"
        ).Checked;
        const value_isActive = document.getElementById(
            "id_input_fm_1_isActive"
        ).Checked;

        if (value_passportNo === "") {
            document.getElementById("errorMsg_passportNo").innerHTML =
                "Enter the number";
        } else {
            document.getElementById("errorMsg_passportNo").innerHTML = "";
        }
        if (value_passportTypeId === "") {
            document.getElementById("errorMsg_passportTypeId").innerHTML =
                "select the passport type";
        } else {
            document.getElementById("errorMsg_passportTypeId").innerHTML = "";
        }
        if (value_issueDate === "") {
            document.getElementById("errorMsg_issueDate").innerHTML = "Select the issueDate";
        } else {
            document.getElementById("errorMsg_issueDate").innerHTML = "";
        }
        if (value_expireDate === "") {
            document.getElementById("errorMsg_expireDate").innerHTML =
                "Select the expireDate";
        } else {
            document.getElementById("errorMsg_expireDate").innerHTML = "";
        }
        // if (value_attachment === "") {
        //     document.getElementById("errorMsg_attachment").innerHTML = "Select the documents";
        // } else {
        //     document.getElementById("errorMsg_attachment").innerHTML = "";
        // }
        // if (value_remark === "") {
        //     document.getElementById("errorMsg_remark").innerHTML =
        //         "Enter the remark";
        // } else {
        //     document.getElementById("errorMsg_remark").innerHTML = "";
        // }
        if (value_isCollected === false) {
            document.getElementById("errorMsg_isCollected").innerHTML =
                "This field is required";
        } else {
            document.getElementById("errorMsg_isCollected").innerHTML = "";
        }
        if (value_isActive === false) {
            document.getElementById("errorMsg_isActive").innerHTML = "This field is required";
        } else {
            document.getElementById("errorMsg_isActive").innerHTML = "";
        }

        // check all fields not empty
        if (
            value_passportNo !== "" &&
            value_passportTypeId !== "" &&
            value_issueDate !== "" &&
            value_expireDate !== "" &&
            // value_attachment !== "" &&
            // value_remark !== "" &&
            value_isCollected !== false &&
            value_isActive !== false
        ) {
            const passdata = {
                bpartnerId,
                passportId,
                passportNo,
                passportTypeId,
                issueDate,
                expireDate,
                attachment,
                remark,
                isCollected,
                isActive,
            };

            fetch("http://45.32.99.72:8087/assignmentBE/customer/savePassportTab", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    "clientId": 101,
                    "orgId": 101,
                    "bpartnerId": 75,
                    "userId": 9,
                    "attachmentList": imageData, ...passdata
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
                    //navigate("/pass/create");
                    //window.location.reload(true);

                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    const [file, setFile] = useState([]);
    function handleChange(e) {
        console.log("Uploaded File Data");
        const uploadedFile = e.target.files[0]
        const fileCount = imageData.length
        const fileSize = uploadedFile.size
        console.log(fileSize)
        console.log(fileCount);
        if (fileSize <= 3145728) {
            if (fileCount < 3) {
                let reader = new FileReader();
                reader.onload = () => {
                    // printing base64 image
                    console.log(reader.result)
                    // image extension
                    console.log("image extension", uploadedFile.type.split("/")[1]);
                    let imageObject = {
                        documentId: 0,
                        isModified: true,
                        attachmentExtension: uploadedFile.type.split("/")[1],
                        attachment: reader.result
                    }
                    setImageData(
                        prevData => [...prevData, imageObject]
                    )
                    console.log(imageData);
                }
                // setting the uploaded file to convert to base64 
                reader.readAsDataURL(e.target.files[0])

                setFile(prev => [...prev, URL.createObjectURL(e.target.files[0])]);
                e.target.nextSibling.innerHTML = ""
            } else {
                e.target.nextSibling.innerHTML = "Only 3 files allows here"
            }
        } else {
            // alert("please select lessthan 3mp file")
            console.log("please select lessthan 3mp file")
            e.target.nextSibling.innerHTML = "please select lessthan 3mp file"
        }

    }

    const removeImage = (index) => {
        console.log(index);
        let previewList = file;
        let imageDataList = imageData;
        previewList.splice(index, 1);
        imageDataList.splice(index, 1)
        console.log(previewList);
        setFile([...previewList])
        setImageData([...imageDataList]);
        // setImageData(imgArray =>  imgArray.filter((item) => item.id !== id));
    };

    const numbervalidation = (e) => {
        console.log(e.target.value.match(/[^\d]/))
        if (e.target.value.match(/[^\d]/)) {
            e.target.nextSibling.innerHTML = "Number should only be consisted of digits"
        } else {
            e.target.nextSibling.innerHTML = ""
            passportNochange(e.target.value);
        }
    }
    return (
        <div>
            <div className="row mt-4">
                <div className="offset-lg-1 col-lg-10">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h3 className="mt-4 mx-2">Passport Details</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>Number <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_passportNo"
                                                placeholder="Enter Passport Number"
                                                type="text"
                                                value={passportNo}
                                                onChange={(e) => numbervalidation(e)}
                                                className="form-control"
                                            />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_passportNo"
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>Passport Type <sup style={{ color: "red" }}>*</sup></label>
                                            <select
                                                id="id_input_fm_1_passportTypeId"
                                                onChange={(e) => passportTypeIdchange(parseInt(e.target.value))}
                                                className="form-control"
                                            >
                                                <option selected="true" value="">
                                                    -select-
                                                </option>
                                                {passporttypeList.map((passport_item, index) => <option key={index} value={passport_item.passportTypeId}>{passport_item.name}</option>)}
                                            </select>
                                            <span className="text-danger" id="errorMsg_passportTypeId"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>Issue Date<sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_issueDate"
                                                value={issueDate}
                                                type="date"
                                                onChange={(e) => issueDatechange(e.target.value)}
                                                className="form-control"
                                            />
                                            <span className="text-danger" id="errorMsg_issueDate"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>Expire Date <sup style={{ color: "red" }}>*</sup></label>
                                            <input
                                                id="id_input_fm_1_expireDate"
                                                value={expireDate}
                                                type="date"
                                                onChange={(e) => expireDatechange(e.target.value)}
                                                className="form-control"
                                            />
                                            <span className="text-danger" id="errorMsg_expireDate"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Documents</label>
                                            <input type="file"
                                                value={attachment}
                                                multiple
                                                accept=".pdf,image/*"
                                                className="form-control"
                                                onChange={handleChange} />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_attachment"
                                            ></span>
                                            <div className="img">
                                                {file.length > 0 ? file.map((file_item, index) =>
                                                    <div>
                                                        <button type="button" className="rmbtn" onClick={() => removeImage(index)}>X</button>
                                                        <img src={file_item} className="item unselectable" />
                                                    </div>

                                                ) : null}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Remark</label>
                                            <textarea
                                                id="id_input_fm_1_remarks"
                                                rows={5}
                                                cols={5}
                                                maxLength={250}
                                                placeholder="Enter Remark"
                                                value={remark}
                                                onChange={(e) => remarkchange(e.target.value)}
                                                className="form-control"
                                            />
                                            {/* <span className="text-danger" id="errorMsg_remark"></span> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-check">
                                            <input
                                                checked={isCollected}
                                                onChange={(e) => isCollectedchange(e.target.checked)}
                                                type="checkbox"
                                                className="form-check-input"
                                                id="id_input_fm_1_isCollected"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="id_input_fm_1_isCollected"
                                            >
                                                Collected
                                            </label>
                                            <span className="text-danger" id="errorMsg_isCollected"></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-check">
                                            <input
                                                checked={isActive}
                                                onChange={(e) => isActivechange(e.target.checked)}
                                                type="checkbox"
                                                className="form-check-input"
                                                id="id_input_fm_1_isActive"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="id_input_fm_1_isActive"
                                            >
                                                Active
                                            </label>
                                            <span className="text-danger" id="errorMsg_isActive"></span>
                                        </div>
                                    </div>
                                    <div className=" nav justify-content-end"  >
                                        <div className="form-group">
                                            <input
                                                className="resetbtn "
                                                type="reset"
                                                onClick={() => resetForm()}
                                            />
                                            <button
                                                className="submitbtn "
                                                type="submit">
                                                submit
                                            </button>

                                            {/* <Link to="/" className="btn btn-dark">
                                                Back
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <>
                <div className="row mt-3">
                    <PassList />
                </div>
            </>
        </div>

    );
};

export default PassCreate;