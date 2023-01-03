
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';

const PassEdit = () => {
    const { passid } = useParams();
    const [passdata, passdatachange] = useState({});
    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/customer/viewPassportTab", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "clientId": 101,
                "orgId": 101,
                "userId": 9,
                "bpartnerId": 75
            })
        }).then((res) => res.json())
            .then((response) => {
                let passArr = response.allCustomerPassportTableList
                let resp = passArr.find(passport => passport.passportId === parseInt(passid))
                console.log(resp);
                idchange(resp.bpartnerId);
                passportIdchange(resp.passportId);
                passportNochange(resp.passportNo);
                passportTypeIdchange(resp.passportTypeId);
                issueDatechange(resp.issueDate);
                expireDatechange(resp.expireDate);
                documentIdchange(resp.documentId);
                attachmentchange(resp.attachment);
                attachmentExtensionchange(resp.attachmentExtension);
                isModifiedchange(resp.isModified);
                remarkchange(resp.remark);
                isCollectedchange(resp.isCollected);
                isActivechange(resp.isActive);

            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []);


    const [imageData, setImageData] = useState([])
    const [uploadedfile, setUploadedFile] = useState([]);
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

    // dropdown values

    const [passporttypeList, setpassporttypeList] = useState([]);
    useEffect(() => {
        fetch("http://45.32.99.72:8087/assignmentBE/customer/getPassportAttachmentListByPassportId", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "passportId": passportId
            })
        }).then((res) =>
            res.json()
        ).then((resp) => {
            let imageList = []
            let imageDataList = []
            resp.forEach(element => {
                imageList.push("https://pms.saprosolutions.com/image" + element.filePath + `?id=2`)
                imageDataList.push({
                    documentId: element.id,
                    isModified: false,
                    attachmentExtension: "",
                    attachment: ""
                })
            });


            setImageData(
                imageDataList
            )
            setUploadedFile(imageList);
            // setFile("https://pms.saprosolutions.com/image" + resp[0].filePath + `?id=2`)
        }).catch((err) => {
            //console.log(err.message);
        })
    }, [passportId])

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
    const handlesubmit = (e) => {
        e.preventDefault();
        const passdata = {
            passportId,
            passportNo,
            passportTypeId,
            issueDate,
            expireDate,
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
                navigate("/pass/create");
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    let timestamps = Number(issueDate.toString().split());
    const date = new Date(timestamps);
    console.log(date)
    const dateValues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    ];
    console.log(dateValues)

    const dateFormatter = (date_in_millis) => {
        var date = new Date(date_in_millis);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        if (month >= 10) {
            return `${year}-${month}-${day}`
        } else {
            return `${year}-${month}-${day}`
        }
        // console.log(`${month}-${day}-${year}`); 
        // return `${month}-${day}-${year}`
    }

    const [file, setFile] = useState([]);
    function handleChange(e) {
        console.log("Uploaded File Data");
        console.log(e.target.files[0].type);
        const fileSize = e.target.files[0].size
        const fileCount = imageData.length
        console.log(fileCount);
        console.log(fileSize);
        if (fileSize <= 3145728) {
            if (fileCount < 3) {
                // converting images to base64
                let reader = new FileReader();
                reader.onload = () => {
                    // printing base64 image
                    console.log(reader.result)
                    // image extension
                    console.log("image extension", e.target.files[0].type.split("/")[1]);
                    let imageObject = {
                        documentId: 0,
                        isModified: true,
                        attachmentExtension: e.target.files[0].type.split("/")[1],
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

    const removeImage = (index, is_uploaded_image) => {
        console.log(index);
        let previewList = file;
        let imageDataList = imageData;
        let uploadedImageList = uploadedfile;

        imageDataList.splice(index, 1)

        console.log(previewList);
        setImageData([...imageDataList]);
        if (is_uploaded_image) {
            uploadedImageList.splice(index, 1)
            setUploadedFile([...uploadedImageList]);
        }
        else {
            previewList.splice(index, 1);
            setFile([...previewList])
        }
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
                <div className="offset-lg-3 col-lg-6">
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
                                                value={passportTypeId}
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
                                                id="id_input_fm_1_date_of_birth"
                                                value={dateFormatter(issueDate)}
                                                // value="2021-1-01"
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
                                                value={dateFormatter(expireDate)}
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
                                                className="form-control"
                                                onChange={handleChange} />
                                            <span
                                                className="text-danger"
                                                id="errorMsg_attachment"
                                            ></span>
                                            <div className="img">
                                                {file.length > 0 ? file.map((file_item, index) =>
                                                    <div>
                                                        <button className="rmbtn" type="button" onClick={() => removeImage(index, false)}>X</button>
                                                        <img src={file_item} className="item" />
                                                    </div>
                                                ) : null}
                                                {uploadedfile.length > 0 ? uploadedfile.map((file_item, index) =>
                                                    <div>
                                                        <button className="rmbtn" type="button" onClick={() => removeImage(index, true)}>X</button>
                                                        <img src={file_item} className="item" />
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
                                            <span className="text-danger" id="errorMsg_remark"></span>
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

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/pass/create" className="btn btn-danger">Back</Link>
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

export default PassEdit;