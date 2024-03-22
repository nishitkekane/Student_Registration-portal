import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define Yup schema for form validation
const formSchema = yup.object().shape({
  courseId: yup.string().required("Course ID is required."),
  type: yup.string().required("Type is required."),
  date: yup
    .string()
    .required("Date is required")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/,
      "Invalid date format. Please use dd-mm-yyyy"
    ),
});

function addExam() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Initialize React Hook Form with Yup resolver and default form values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      courseId: "", // Added courseId field
      type: "",
      date: "",
    },
  });

  // Define form submit handler
  async function onSubmit(data) {
    const send = {
      courseId: data.courseId, // Include courseId in the data
      type: data.type,
      date: data.date,
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Make the POST request using Axios
      await axios.post("http://localhost:8080/api/v1/exam/register", send, {
        headers,
      });

      navigate("/courses");
    } catch (error) {
      console.error("Registration Failed:", error);
    }
    console.log("Form Data:", data);
  }

  return (
    <div
      className="flex min-h-screen flex-col items-start justify-between p-24 bg-black-100 font-montserrat"
      style={{ fontSize: "1.3rem" }}
    >
      <div className=" bg-teal-200 mt-6 space-y-0 shadow-2xl shadow-black rounded-2xl max-lg:flex-col max-lg:space-y-8 p-16">
        <div>
          <h1 className="text-3xl font-bold mb-6">Add Exam Form</h1>
        </div>
        <div className="font-xl">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
            {/* Course ID */}
            <div>
              <label htmlFor="courseId" className="block mb-1">
                Course ID
              </label>
              <Input
                id="courseId"
                placeholder="Course ID"
                {...register("courseId")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.courseId?.message}</p>
            </div>
            {/* Type of Exam */}
            <div>
              <label htmlFor="type" className="block mb-1">
                Type of Exam
              </label>
              <select
                id="type"
                {...register("type")}
                className="border w-full h-12 rounded-md p-2 font-xs"
              >
                <option value="MST">MST</option>
                <option value="ESE">ESE</option>
              </select>
              <p className="text-red-500">{errors.type?.message}</p>
            </div>
            {/* Date */}
            <div>
              <label htmlFor="date" className="block mb-1">
                Date (dd-mm-yyyy)
              </label>
              <Input
                id="date"
                placeholder="Exam Date (dd-mm-yyyy)"
                {...register("date")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.date?.message}</p>
            </div>

            {/* Submit Button */}
            <Button type="submit" style={{ fontSize: "1.3rem" }}>
              Add Exam
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default addExam;
