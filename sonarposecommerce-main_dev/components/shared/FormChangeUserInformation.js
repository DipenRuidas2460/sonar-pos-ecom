import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, baseAuthUrl } from '~/repositories/Repository';
import { Form } from 'antd';
import { notification } from 'antd';
import Router from 'next/router';
import { useSelector } from 'react-redux';
// import { uploadAWS } from '/components/partials/account/AWSHelper';
// import { AWS_IMAGE_FOLDER_ECOMMERCE_CUSTOMERS } from '/components/partials/account/Constant';

const FormChangeUserInformation = () => {
    const loginId = useSelector((state) => state.auth.loginId); // get the loginId from the Redux store
    const [changeImagename, setChangeImagename] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [imageUrl, setimageUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [formValues, setFormValues] = useState({
        username: '',
        firstname: '',
        lastname: '',
        phonenumber: '',
        email: '',
        address: '',
        city: '',
        country: '',
        profilepic: '',
    });

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    // to get the user information
    useEffect(() => {
        axios
            .get(`${baseUrl}/${baseAuthUrl}/userselectbyid?id=${loginId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    let Data = res.data.ResponseData[0];
                    const data = {
                        firstname: Data.Firstname,
                        lastname: Data.Lastname,
                        username: Data.Username,
                        email: Data.EmailId,
                        phonenumber: Data.Phonenumber,
                        address: Data.Address,
                        city: Data.City,
                        country: Data.Country,
                        profilepic: Data.ProfilePic,
                    };
                    setFormValues(data);
                    setSelectedImage(res.data.ResponseData[0].ProfilePic);
                    setimageUrl(Data.Profilepic);
                } else if (res.data.ResponseCode === 'ERROR') {
                    notification['error']({
                        message: 'ERROR!!!',
                        description: res.data.ResponseMessage,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // to update the user information
    const handleUpdate = (event) => {
        const data = {
            id: loginId,
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            username: formValues.username,
            email: formValues.email,
            phonenumber: formValues.phonenumber,
            address: formValues.address,
            city: formValues.city,
            country: formValues.country,
            profilepic: imageUrl ? imageUrl : formValues.profilepic,
        };

        axios
            .post(`${baseUrl}/${baseAuthUrl}/userupdate`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                if (res.data.ResponseCode === 'SUCCESS') {
                    notification['success']({
                        message: 'Data Update Succesfully!',
                        description: res.data.ResponseMessage,
                    });
                    Router.push('/');
                } else if (res.data.ResponseCode === 'ERROR') {
                    notification['error']({
                        message: 'ERROR!!!',
                        description: res.data.ResponseMessage,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const validation = (name, value) => {
        switch (name) {
            case 'SelectImage':
                if (!value.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return false;
                } else {
                    return true;
                }
            default: {
                return true;
            }
        }
    };

    const handleFileChange = (event, index) => {
        setChangeImagename(true);

        if (validation(event.target.name, event?.currentTarget?.files[0])) {
            uploadFile(
                event?.currentTarget?.files[0],
                event.target.name,
                index
            );
        }
        const files = event.target.files;
        if (files) {
            let images = [];
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    images.push({
                        name: files[i].name,
                        preview: e.target.result,
                    });
                    setPreviewImage(images);
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };

    // const uploadFile = async (file, type, index) => {
    //     await uploadAWS(file, AWS_IMAGE_FOLDER_ECOMMERCE_CUSTOMERS, (data) => {
    //         if (data) {
    //             if (type === 'profilepic') {
    //                 setimageUrl(data);
    //             }
    //         }
    //     });
    // };
    return (
        <Form className="ps-form--account-setting">
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>
            <div className="ps-form__content">
                {/* UserName */}
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Username or email address"
                        name="username"
                        onChange={handleChange}
                        value={formValues.username}
                    />
                </div>
                <div className="row">
                    {/* FirstName */}
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="First name"
                                name="firstname"
                                onChange={handleChange}
                                value={formValues.firstname}
                            />
                        </div>
                    </div>

                    {/* LastName */}
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Last name"
                                name="lastname"
                                onChange={handleChange}
                                value={formValues.lastname}
                            />
                        </div>
                    </div>

                    {/* PhoneNumber */}
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Phone Number"
                                name="phonenumber"
                                onChange={handleChange}
                                value={formValues.phonenumber}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Email Address"
                                name="email"
                                onChange={handleChange}
                                value={formValues.email}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Address"
                                name="address"
                                onChange={handleChange}
                                value={formValues.address}
                            />
                        </div>
                    </div>

                    {/* City */}
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="City"
                                name="city"
                                onChange={handleChange}
                                value={formValues.city}
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Country"
                                name="country"
                                onChange={handleChange}
                                value={formValues.country}
                            />
                        </div>
                    </div>

                    {/* Profile Pic */}
                    {/* <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                type="file"
                                id="profilepic"
                                name="profilepic"
                                onChange={(e) =>
                                    handleFileChange(e, setImagePreview)
                                }
                            />
                        </div>
                        <div
                            className={`${
                                imageUrl ? '' : selectedImage ? '' : 'd-none'
                            } form-group row`}>
                            <label className="col-form-label col-md-2 form-label"></label>
                            <div className="col-md-10">
                                <img
                                    src={`${
                                        imageUrl ? imageUrl : selectedImage
                                    }`}
                                    alt="Item_Image"
                                    className="ItemImage w-25 h-100"
                                />
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Submit */}
                <div className="form-group submit">
                    <button className="ps-btn" onClick={handleUpdate}>
                        Update profile
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default FormChangeUserInformation;
