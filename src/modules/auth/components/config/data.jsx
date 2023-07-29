export const LoginData = {
  title: "login",
  data: [
    {
      id: "username",
      label: "User's Name or Email",
      type: "text",
      required: true,
    },
    { id: "password", label: "Password", type: "password", required: true },
  ],
  children: {
    data: [{ id: "email", label: "Email", type: "text", required: true }],
    children: {
      data: [
        {
          id: "passwordToken",
          label: "Your Secret Code",
          type: "text",
          required: true,
        },
        {
          id: "newPassword",
          label: "Enter Your New Password",
          type: "password",
          required: true,
        },
        {
          id: "confirmPassword",
          label: "Enter Your New Password Again",
          type: "password",
          required: true,
        },
      ],
    },
  },
};

export const RegisterData = {
  data: [
    { id: "firstname", label: "First Name", type: "text", required: true },
    { id: "lastname", label: "Last Name", type: "text", required: true },
    { id: "username", label: "User's Name", type: "text", required: true },
    { id: "email", label: "Email", type: "text", required: true },
    { id: "password", label: "Password", type: "password", required: true },
  ],
};

export const UpdateUserData = {
  personal: {
    data: [
      { id: "firstname", label: "First Name", type: "text", required: true },
      { id: "lastname", label: "Last Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of birth", type: "date" },
      { id: "phoneNumber", label: "Phone Number", type: "text" },
      {
        id: "gender",
        label: "Gender",
        type: "select",
        data: [{ title: "Male" }, { title: "Female" }, { title: "Non-binary" }],
      },
      { id: "nationality", label: "Nationality", type: "select" },
    ],
  },
  security: {
    data: [
      {
        id: "password",
        label: "Your Current Password",
        type: "password",
        required: true,
      },
      {
        id: "newPassword",
        label: "Your New Password",
        type: "password",
        required: true,
      },
      {
        id: "confirmPassword",
        label: "Enter Your New Password Again",
        type: "password",
        required: true,
      },
    ],
  },
};
