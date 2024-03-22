import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define Yup schema for form validation
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  hoursWeek: yup
    .string()
    .required("Hours per week is required.")
    .matches(/^\d{1}$/, "Single digit only"),
  credit: yup
    .string()
    .required("Number of credits are required.")
    .matches(/^\d+(\.\d{1})?$/, "Single digit only or decimal only"),
});

function addCourse() {
  // Initialize React Hook Form with Yup resolver and default form values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      hoursWeek: "",
      credit: "",
    },
  });

  // Define form submit handler
  function onSubmit(data) {
    console.log("Form Data:", data);
  }

  return (
    <div
      className="flex min-h-screen flex-col items-start justify-between p-24 bg-black-100 font-montserrat"
      style={{ fontSize: "1.3rem" }}
    >
      <div className=" bg-teal-200 mt-6 space-y-0 shadow-2xl shadow-black rounded-2xl max-lg:flex-col max-lg:space-y-8 p-16">
        <div>
          <h1 className="text-3xl font-bold mb-6">Add Course Form</h1>
        </div>
        <div className="font-xl">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
            {/* Name of Course */}
            <div>
              <label htmlFor="name" className="block mb-1">
                Name of Course
              </label>
              <Input
                id="name"
                placeholder="Course Name"
                {...register("name")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </div>
            {/* Hours per Week */}
            <div>
              <label htmlFor="hoursWeek" className="block mb-1">
                Hours per Week
              </label>
              <Input
                id="hoursWeek"
                placeholder="Hours per Week"
                {...register("hoursWeek")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.hoursWeek?.message}</p>
            </div>
            {/* Credits */}
            <div>
              <label htmlFor="credit" className="block mb-1">
                Credits
              </label>
              <Input
                id="credit"
                type="credit"
                placeholder="Credits"
                {...register("credit")}
                style={{ fontSize: "1.3rem" }}
                className="bg-white"
              />
              <p className="text-red-500">{errors.credit?.message}</p>
            </div>

            {/* Submit Button */}
            <Button type="submit" style={{ fontSize: "1.3rem" }}>
              Add Course
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default addCourse;
