import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// const fs = require("fs");
// const FormData = require("form-data");
// Define Yup schema for form validation
const formSchema = yup.object().shape({
  firstname: yup.string().required("First name is required."),
  lastname: yup.string().required("Last name is required."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  department: yup.string().required("Department is required."),
  address: yup.string().required("Address is required."),
  gender: yup.string().required("Gender is required."),
  aadharNo: yup
    .string()
    .required("Aadhar number is required.")
    .matches(/^\d{12}$/, "Aadhar number must be 12 digits."),
  file1: yup
    .mixed()
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value && value[0].type === "application/pdf"
    ),
});

function addTeacher() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      department: "",
      gender: "",
      aadharNo: "",
      address: "",
      file1: null,
    },
  });

  // Define form submit handler
  async function onSubmit(data) {
    const send = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      department: data.department,
      gender: data.gender,
      aadhaarNo: data.aadharNo,
      address: data.address,
      year: "FY",
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const headers2 = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      const formData = new FormData();
      formData.append("aadhar", "as");
      console.log(formData);
      // Make the POST request using Axios
      await axios({
        method: "POST",
        url: "http://localhost:8080/api/v1/register/teacher",
        headers,
        data: send,
      });

      await axios.post(
        `http://localhost:8080/api/v1/register/upload-aadhaar?email=${data.email}`,
        formData,
        { headers2 }
      );
      navigate("/courses");
    } catch (error) {
      console.error("Registration Failed:", error);
    }
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-black-100 font-montserrat"
      style={{ fontSize: "1.3rem" }}
    >
      <div className=" mt-6 space-y-0  shadow-2xl shadow-black rounded-2xl max-lg:flex-col bg-teal-200 max-lg:space-y-8 p-16">
        <div>
          <h1 className="text-3xl font-bold mb-6">Add Teacher Form</h1>
        </div>
        <div className="font-xl">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
            {/* File Upload */}
            <div>
              <label htmlFor="file1" className="block mb-1">
                Upload Aadhar Card (PDF only)
              </label>
              <input
                name="file1"
                id="file1"
                type="file"
                {...register("file1")}
                accept="application/pdf"
              />
              <p className="text-red-500">{errors.file1?.message}</p>
            </div>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                placeholder="First Name"
                {...register("firstname")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.firstname?.message}</p>
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                placeholder="Last Name"
                {...register("lastname")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.lastname?.message}</p>
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            {/* Department */}
            <div>
              <label htmlFor="department" className="block mb-1">
                Department
              </label>
              <select
                id="department"
                {...register("department")}
                className="border w-full h-12 rounded-md p-2 font-xs"
              >
                <option value="CSIT">CSIT</option>
                <option value="HUMANITIES">HUMANITIES</option>
                <option value="ELECTRICAL">ELECTRICAL</option>
                <option value="ELECTRONICS">ELECTRONICS</option>
                <option value="PHYSICS">PHYSICS</option>
                <option value="CHEMISTRY">CHEMISTRY</option>
                <option value="MECHANICAL">MECHANICAL</option>
              </select>
              <p className="text-red-500">{errors.department?.message}</p>
            </div>
            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-1">
                Address
              </label>
              <Input
                id="address"
                placeholder="Address"
                {...register("address")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.address?.message}</p>
            </div>
            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block mb-1">
                Gender
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="border w-full h-12 rounded-md p-2 font-xs"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <p className="text-red-500">{errors.gender?.message}</p>
            </div>
            {/* Aadhar Number */}
            <div>
              <label htmlFor="aadharNumber" className="block mb-1">
                Aadhar Number
              </label>
              <Input
                id="aadharNumber"
                placeholder="Aadhar Number"
                {...register("aadharNo")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.aadharNo?.message}</p>
            </div>
            {/* Submit Button */}
            <Button type="submit" style={{ fontSize: "1.3rem" }}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default addTeacher;
