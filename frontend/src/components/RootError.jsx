import { Link } from "react-router-dom";

function RootError() {
  return (
    <div className="fixed inset-0 bg-neutral-100 flex flex-col gap-4 items-center justify-center font-inter">
      <h2 className="text-4xl font-medium text-neutral-800">
        Something unexpected Wrong!!
      </h2>
      <Link to="/" className="text-lg font-medium text-teal-600">
        Back to Homepage
      </Link>
    </div>
  );
}

export default RootError;
