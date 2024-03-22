import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define Yup schema for form validation
const formSchema = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  phoneNumber: yup
    .string()
    .required("Phone number is required.")
    .matches(/^\d{10}$/, "Phone number must be 10 digits."),
  department: yup.string().required("Department is required."),
  address: yup.string().required("Address is required."),
  gender: yup.string().required("Gender is required."),
  aadharNumber: yup
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
  file2: yup
    .mixed()
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value && value[0].type === "application/pdf"
    ),
  year: yup.string().required("Gender is required."),
});

function addStudent() {
  // Initialize React Hook Form with Yup resolver and default form values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      department: "",
      address: "",
      gender: "",
      aadharNumber: "",
      file1: null,
      file2: null,
      year: "",
    },
  });

  // Define form submit handler
  function onSubmit(data) {
    const formDataWithFile = {
      ...data,
      file1: data.file1[0],
      file2: data.file2[0],
    };
    console.log("Form Data:", formDataWithFile);
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-black-100 font-montserrat"
      style={{ fontSize: "1.3rem" }}
    >
      <div className=" mt-6 space-y-0 bg-white shadow-2xl shadow-black rounded-2xl max-lg:flex-col max-lg:space-y-8 p-16">
        <div>
          <h1 className="text-3xl font-bold mb-6">Add Student Form</h1>
        </div>
        <div className="font-xl">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-white"
          >
            {/* File Upload */}
            <div>
              <label htmlFor="file1" className="block mb-1">
                Upload Aadhar Card (PDF only)
              </label>
              <input
                id="file1"
                type="file"
                {...register("file1")}
                accept="application/pdf"
              />
              <p className="text-red-500">{errors.file1?.message}</p>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label htmlFor="file2" className="block mb-1">
                Upload 12th Marksheet (PDF only)
              </label>
              <input
                id="file2"
                type="file"
                {...register("file2")}
                accept="application/pdf"
              />
              <p className="text-red-500">{errors.file?.message}</p>
            </div>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                placeholder="First Name"
                {...register("firstName")}
                style={{ fontSize: "1.3rem" }}
                bg-white
              />
              <p className="text-red-500">{errors.firstName?.message}</p>
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                placeholder="Last Name"
                {...register("lastName")}
                style={{ fontSize: "1.3rem" }}
                bg-white
              />
              <p className="text-red-500">{errors.lastName?.message}</p>
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
                bg-white
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block mb-1">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                style={{ fontSize: "1.3rem" }}
              />
              <p className="text-red-500">{errors.phoneNumber?.message}</p>
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
                {...register("aadharNumber")}
                style={{ fontSize: "1.3rem" }}
              />
              <p className="text-red-500">{errors.aadharNumber?.message}</p>
            </div>
            {/* Year */}
            <div>
              <label htmlFor="year" className="block mb-1">
                Year
              </label>
              <select
                id="year"
                {...register("year")}
                className="border w-full h-12 rounded-md p-2 font-xs"
              >
                <option value="FY">First Year</option>
                <option value="SY">Second Year</option>
                <option value="TY">Third Year</option>
                <option value="EY">Final Year</option>
              </select>
              <p className="text-red-500">{errors.year?.message}</p>
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

export default addStudent;
