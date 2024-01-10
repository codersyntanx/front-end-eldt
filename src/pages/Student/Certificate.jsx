import React from "react";
import { Translator, Translate } from "react-auto-translate";

export default function Certificate() {
  const downloadCertificatePdf = async () => {
    const dataUrl = await htmlToImage.toJpeg(domEl.current);

    const pdf = new jsPDF();
    pdf.addImage(dataUrl, "JPEG", 0, 0);
    pdf.save(`${student.toLowerCase().replaceAll(" ", "-")}.pdf`);
  };

  const downloadCertificate = async () => {
    const dataUrl = await htmlToImage.toJpeg(domEl.current);

    //download certificate
    const link = document.createElement("a");
    link.download = `${student.toLowerCase().replaceAll(" ", "-")}.jpg`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>
      <div className="ptb-100 get-certificate">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="form-box">
                <form>
                  <label className="mb-2">Enter your name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                  />
                </form>
              </div>
            </div>

            <div className="col-lg-8">
              <div id="domEl" ref={domEl} className="certificate-img">
                <div className="content">
                  <h2>
                    <Translate>{student}</Translate>
                  </h2>
                  <p>
                    For completing the <b>{course && course.title}</b>
                  </p>
                  <h5>
                    Course Completed in {new Date().getUTCDate()}/
                    {new Date().getUTCMonth()}/{new Date().getUTCFullYear()}{" "}
                    {new Date().getUTCHours()}:{new Date().getUTCMinutes()}
                  </h5>
                </div>
                <img src="/images/certificate.png" alt="" />
              </div>

              <div className="caption">
                <button
                  className="download-btn"
                  onClick={downloadCertificate}
                  title="JPEG Image"
                >
                  <i className="bx bxs-file-jpg">
                    <Translate></Translate>
                  </i>
                </button>{" "}
                <button
                  className="download-btn"
                  onClick={downloadCertificatePdf}
                  title="PDF"
                >
                  <i className="bx bxs-file-pdf">
                    <Translate></Translate>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
