import { useState, useContext } from "react";
import { AppContext } from "../page";
export default function FileUpload() {
  const [error, setError] = useState("");
  const data = useContext(AppContext);
  
  const handleFileChange = (event:  any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      data?.setFile(selectedFile);
      setError("");
    } else {
      data?.setFile(null);
      setError("Only .xlsx files are allowed!");
    }
  };


  return  (
    <div className="p-4 border rounded shadow-md w-96 mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Upload an XLSX File</h2>
      <form onSubmit={data?.handleUpload}>
        <label htmlFor="file-upload" className="block mb-2">Choose an XLSX file:</label>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="block w-full border p-2 mb-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
