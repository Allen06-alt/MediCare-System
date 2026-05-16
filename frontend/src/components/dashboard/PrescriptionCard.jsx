import API from "../../api/api";

export default function PrescriptionCard({

  prescription,

}) {

  // 🔥 DOWNLOAD PDF
  const handleDownload =
    async () => {

      try {

        const res =
          await API.get(

            `/prescriptions/download/${prescription._id}`,

            {
              responseType:
                "blob",
            }
          );

        // 🔥 CREATE URL
        const url =
          window.URL.createObjectURL(

            new Blob([res.data])
          );

        // 🔥 LINK
        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.setAttribute(
          "download",
          "prescription.pdf"
        );

        document.body.appendChild(
          link
        );

        link.click();

      } catch (err) {

        console.log(err);

        alert(
          "Download failed ❌"
        );
      }
    };

  return (

    <div className="bg-white p-6 rounded-2xl shadow mb-5">

      {/* 🔥 TITLE */}
      <h2 className="text-2xl font-bold mb-4">

        Prescription

      </h2>

      {/* 🔥 DETAILS */}
      <div className="space-y-2 text-gray-700">

        <p>

          <b>Doctor:</b>{" "}

          {
            prescription.doctorName
          }

        </p>

        <p>

          <b>Disease:</b>{" "}

          {
            prescription.disease
          }

        </p>

        <p>

          <b>Medicines:</b>{" "}

          {
            prescription.medicines
          }

        </p>

        <p>

          <b>Advice:</b>{" "}

          {
            prescription.advice
          }

        </p>

      </div>

      {/* 🔥 BUTTON */}
      <button
        onClick={handleDownload}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"
      >

        Download PDF

      </button>

    </div>
  );
}