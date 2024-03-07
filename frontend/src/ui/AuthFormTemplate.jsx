const AuthFormTemplate = ({ heading, children }) => {
  return (
    <div className="flex min-h-screen justify-center ">
      <div className="p-8 w-96">
        <h2 className="mb-4 text-2xl font-bold">{heading}</h2>
        <form className="flex flex-col gap-5" autoComplete="off">
          {children}
        </form>
      </div>
    </div>
  );
};

export default AuthFormTemplate;
