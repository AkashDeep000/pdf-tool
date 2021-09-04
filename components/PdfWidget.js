import {useState, useRef} from "react";
import axios from "axios";


export default function PdfWidget() {
  const [pdfFile, setPdfFile] = useState();
  const [pdfLimit, setPdfLimit] = useState(600);
  const [grayPdf, setGrayPdf] = useState(false);
  const [uploadState, setUploadState] = useState("Compress PDF");
  const [pdfRes, setPdfRes] = useState()
  
  const [uploadPersent, setUploadPersent] = useState(0);
  const ref = useRef()
  const bRef = useRef()
  const dRef = useRef()
  
  const handlePdfFile = (e) => {
    if (e.target.files[0]?.name.endsWith(".pdf")) {
      setPdfFile(e.target.files[0]);
    }else{
      alert("Not A PDF File")
    }
    
if (uploadState == "Download Compressed PDF") {
    setUploadState("Compress PDF")
    dRef.current.style.display= "none"
    setUploadPersent(0)
  }
  }
  const handlePdfLimit = (e) => {
    setPdfLimit(e.target.value);
if (uploadState == "Download Compressed PDF") {
    setUploadState("Compress PDF")
    dRef.current.style.display= "none"
    setUploadPersent(0)
  }
  }
  
  const handlePdfGray = (e) => {
    if (grayPdf) {
      setGrayPdf(false)
    } else if (!grayPdf) {
      setGrayPdf(true)
    }
  }
  
const handlePdfUpload = async (e) => {
  e.preventDefault();
  if (pdfFile && (uploadState == "Compress PDF")) {
  ref.current.style.opacity= "1"    
  setUploadState("Uploading PDF");
//Initialize the form data
  let formData = new FormData();
// Add the form data we need to submt

  formData.append('pdfFile', pdfFile);
  formData.append('pdfLimit', pdfLimit);
  formData.append('grayPdf', grayPdf);
//Make the request to the POST /single-file URL
  
// const response = await axios.post( 'http://15.207.86.194:5000/upload',
const response = await axios.post( 'https://ze1f98200-z91a002ca-gtw.qovery.io/upload',

  formData,
  {
    timeout: 0,
   headers: {
              'Content-Type': `multipart/form-data`
    },
    onUploadProgress: function( progressEvent ) {
      let progress = (progressEvent.loaded / progressEvent.total) * 100
      if (progress == 100) {
   
   setUploadState("Progressing PDF...")
   ref.current.style.opacity= "0"
 }
     setUploadPersent(progress)
      
      console.log(progress)
    }
  }
).then((response) => {
      setPdfRes(response.data)
     dRef.current.style.display= "block"
      setUploadState(`Download Compressed PDF`)
      return response;
      
    })
    .catch((err) => {
      setUploadState("Failed to Compress")
      console.log(err);
      if (err.response) {
        return err.response;
      } else if (err.request) {
        return err.request;
      } else {
        return false;
      }
    });
 console.log(response)   
 
  }
  if (uploadState == "Download Compressed PDF") {
    setUploadState("Compress PDF")
    dRef.current.style.display= "none"
    setUploadPersent(0)
  }

    
}

/*

*/

  
  return (
    <>
     <div className="pdfWidget">
       <div className="pdfPickerBox">
    <input type="file" name="pdg" className="pdfPicker" 
    onChange={handlePdfFile}
    />
    <br/>
    <br/>
    <br/>
<div>
      <label 
  style={{
    textAlign: "left",
    fontSize: "1.1rem",
    float: "left",
    paddingTop: ".5rem",
   }} 
   for="fileSizeOption">Required PDF Size(In KB) :</label>
    <input
    style={{
    float: "right",
    width: "4rem",
    height: "2.5rem",
    color:"inherit",
    fontSize: "1.2rem",
    border: "1px solid rgba(128,128,128,0.402)",
    }}
    type="text" name="fileSizeOption" className="pdfPickerFileSize" placeholder="Ex: 600"
    onChange={handlePdfLimit}
    value={pdfLimit}/>
  </div>
    <br/>
    <br/>
  
  <div>
  <p
style={{
display: "inlineBlock",
    marginTop: "2rem",
    textAlign: "left",
    float: "left",
    fontSize: "1.1rem",
    
   }} 
   for="blackwhite">Black And White :<br/>(This will be SLOW)</p>
<button
onClick={handlePdfGray}
style={{
display: "inlineBlock",
    marginLeft: "1rem",
    float: "right",
    marginTop: "2rem",
    width: "2.5rem",
    height: "2.5rem",
    fontSize: "1rem",
    background: "white",
    border: "1px solid #8080803e",
    fontSize: "1.6rem",
    color: "#ff5c86"
    }}>
    {grayPdf ? "✓" : null}
</button>
</div>
<br/>
  </div>
     <div
  ref= {ref}
  style= {{
  opacity: "0",
  margin: "5rem 1rem 1rem 1rem",
  border: ".1rem solid #ff5c86",
  height: "1rem",
    
  }}
  >
  <div
  style={{
    background: "#ff5c86",
    height: "100%",
    width: `${uploadPersent}%`,
    
  }}>
  </div>
  </div>
    <a
    ref={dRef}
    href ={`${pdfRes?.url}`}
      style={{
      display: "none",
  boxShadow: "0 0 .7rem rgba(96,0,43,0.12)",
    width: "auto",
    padding: ".5rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "white",
    borderRadius: ".5rem",
    background: "rgb(255,167,190)",
backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff5c86' fill-opacity='0.3'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
textShadow: "0 0 2rem rgb(255,129,213)",
  }} download="cc-02.pdf">Download Compressed PDF<span style={{color:"rgb(78,152,255)"}}>{pdfRes?.size ? ` (${pdfRes.size}KB)` : null}</span></a>
  
  {uploadState == "Progressing PDF..." ? (<div className="spinner" role="spinner"><div className="spinner-icon"></div></div>) : null}
  
    <button 
  ref = {bRef}
  onClick={handlePdfUpload}
  type="submit"
  style={{
  boxShadow: "0 0 .7rem rgba(96,0,43,0.12)",
    margin: "1rem auto 0 auto",
    padding: ".5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    borderRadius: ".5rem",
    background: "rgb(255,167,190)",
backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff5c86' fill-opacity='0.3'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
textShadow: "0 0 2rem rgb(255,129,213)",
  }}>
  {uploadState == "Download Compressed PDF" ? "Reset" : uploadState}
 {uploadState == "Uploading PDF" ?  (<div className="dotBricks"></div>) : null}

  </button>
    </div>
    </>
  );
}
 