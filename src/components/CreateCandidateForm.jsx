import { useState } from "react";
import { useForm } from "react-hook-form";
import PageHeader from "./PageHeader";

function CreateCandidateForm() {

  const [phoneMessage, setPhoneMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // 🔥 Fake DB
  // const users = [
  //   { email: "test@gmail.com", phone: "9876543210" },
  //   { email: "user@gmail.com", phone: "9999999999" },
  // ];

  // // 🔥 Fake API
  // const checkUserExists = ({ email, phone }) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       let exists = users.some(
  //         (u) => u.email === email
  //       );

  //       if(exists){
  //         resolve({code:409,type:"email",msg:'email exists'});
  //       }

  //       exists = users.some(
  //         (u) => u.phone === phone
  //       );

  //       if(exists){
  //         resolve({code:409,type:"phone",msg:'phone exists'});
  //       }

  //       resolve({code:200,msg:'submitted'});
        
  //     }, 1000);
  //   });
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  setLoading(true);
  setPhoneMessage("");
  setEmailMessage("");

  try {
    const res = await fetch("http://localhost:5000/api/candidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 409) {
      if (result.type === "email") setEmailMessage(result.msg);
      else setPhoneMessage(result.msg);
    } else if (res.status === 201) {
      alert(result.msg);
    }

  } catch (err) {
    console.error(err);
  }

  setLoading(false);
};

  return (
    // <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow border border-gray-200">
     <div className="p-6">
      <PageHeader/>
      <div className="bg-white p-6 rounded-xl shadow max-w-xl ml-28">  
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Candidate ID */}
          <div>
            <label className="block text-sm font-medium">
              Candidate ID <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="CAND0001"
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              {...register("candidateId", {
                required: "Candidate ID is required",
                pattern: {
                  value: /^CAND\d{4}$/,
                  message: "Format must be CAND0001",
                },
              })}
            />

            {errors.candidateId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.candidateId.message}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Unique identifier for the candidate
            </p>
          </div>

          {/* Name */}
          <div className="flex gap-4">
            
            {/* First Name */}
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabets allowed",
                  },
                })}
              />

              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabets allowed",
                  },
                })}
              />

              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center mt-1">
              <span className="px-3 py-2 bg-gray-100 border rounded-l-lg">
                +91
              </span>

              <input
                type="text"
                placeholder="9876543210"
                maxLength={10}
                className="w-full p-2 border-t border-b border-r rounded-r-lg outline-none focus:ring-2 focus:ring-blue-500"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Phone must be exactly 10 digits",
                  },
                })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}

            {phoneMessage && (
              <p className="text-red-500 text-xs mt-1">
                {phoneMessage}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="abc@example.com"
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}

            {emailMessage && (
              <p className="text-red-500 text-xs mt-1">
                {emailMessage}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Candidate will receive login credentials at this email
            </p>
          </div>

          {/* Note */}
          <div className="bg-indigo-50 border border-indigo-200 text-sm p-3 rounded-lg text-gray-600">
            <strong>Note:</strong> A default password will be sent to the candidate's email.
            The candidate can use these credentials to log in and complete their verification profile.
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800"
            >
              Create Candidate
            </button>

            <button
              type="button"
              className="flex-1 border border-indigo-200 text-indigo-700 py-2 rounded-lg hover:bg-indigo-50"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateCandidateForm;