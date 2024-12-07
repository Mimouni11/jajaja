import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios"; // For making HTTP requests

const AddUserForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    role: Yup.string(),
  });

  const handleAddUser = async (values, { resetForm }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Add user role to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: values.email,
        role: values.role || "User",
      });

      // Send email to the new user
      await axios.post("http://localhost:5000/send-email", {
        email: values.email,
        password: values.password,
      });

      alert("User added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding user or sending email:", error);
      alert("Failed to add user or send email.");
    }
  };

  return (
    <Box my={4} p={3} border={1} borderRadius={2} borderColor="grey.300">
      <Typography variant="h6" gutterBottom>
        Add New User
      </Typography>
      <Formik
        initialValues={{ email: "", password: "", role: "User" }}
        validationSchema={validationSchema}
        onSubmit={handleAddUser}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="role"
                label="Role"
                fullWidth
                helperText="e.g., Admin, User"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddUserForm;
