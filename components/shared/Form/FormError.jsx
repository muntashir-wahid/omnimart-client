const FormError = ({ formik, name }) => {
  return (
    <>
      {formik.touched[name] ? (
        <p className="text-sm font-medium text-red-600">
          {formik.errors[name]}
        </p>
      ) : null}
    </>
  );
};

export default FormError;
