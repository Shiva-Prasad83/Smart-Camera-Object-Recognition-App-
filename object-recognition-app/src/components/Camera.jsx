import React, { useEffect, useRef, useState } from "react";

function Camera() {
  const videoRef = useRef();
  const canvasRef = useRef();

  const [image, setImage] = useState(null);
  const [objDetails, setObjDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const [stopSpeech,setStopSpeech]=useState(false);

  function textToSpeech(text) {
    if (!text) return;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }

  function stopSpeechFn(){
    
        window.speechSynthesis.cancel();
        setStopSpeech(false);
  }

  async function openCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  }

  function stopCamera() {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
  }

  function captureImage() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg", 0.8);
    setImage(imageData);
    stopCamera();
  }

  function recapture() {
    setImage(null);
    setObjDetails("");
    openCamera();
    setStopSpeech(true)
    stopSpeechFn();
  }

  async function recognizeObject() {
    if (!image) return;

    setLoading(true);

    const response = await fetch("http://localhost:3001/api/recognize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Describe what you see in this image in 2-3 simple sentences.The image is captured in room" },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: image.split(",")[1],
                },
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    setObjDetails(text);
    setLoading(false);
  }

  useEffect(() => {
    if(objDetails){
    textToSpeech(objDetails);
    }
  }, [objDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-6 space-y-4 border border-slate-700">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Smart Camera</h1>
          <p className="text-sm text-slate-400">
            Capture an image and identify objects instantly
          </p>
        </div>

        {/* Camera / Image */}
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video border border-slate-700">
          {image ? (
            <img
              src={image}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={openCamera}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Open Camera
          </button>

          <button
            onClick={captureImage}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
          >
            Capture
          </button>

          <button
            onClick={recapture}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition"
          >
            Re-Capture
          </button>

          <button
            onClick={recognizeObject}
            disabled={loading || !image}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              loading || !image
                ? "bg-slate-600 text-slate-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {loading ? "Identifying..." : "Identify"}
          </button>
        </div>

        {/* Result */}
        {objDetails && (
          <div className="mt-4 p-4 rounded-xl bg-slate-800 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 mb-1">
              Description
            </h3>
            <p className="text-slate-100 text-sm leading-relaxed">
              {objDetails}
            </p>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}

export default Camera;


// import React, { useEffect, useRef, useState } from 'react'
// function Camera() {
//     const videoRef=useRef();
//     const canvasRef=useRef();
//     const [image,setImage]=useState(null);

//     const [objDetails,setObjDetails]=useState("");
//     console.log(objDetails);
//  console.log(image);


//  function textToSpeech(text){

//     const speech = new SpeechSynthesisUtterance(text);
//     speech.lang = "en-US";   // language
//     speech.rate = 1;        // speed
//     speech.pitch = 1;       // voice pitch

//     window.speechSynthesis.speak(speech);
//  }
 
//    async function openCamera(){
     
//         const stream=await navigator.mediaDevices.getUserMedia({video:true});
//         videoRef.current.srcObject=stream;
//     }

//     function captureImage(){
//       const video=videoRef.current;
//       const canvas=canvasRef.current;
       
//       canvas.width=video.videoWidth;
//       canvas.height=video.videoHeight;

//       const ctx=canvas.getContext("2d");
//       ctx.drawImage(video,0,0,canvas.width,canvas.height);

//    const imageData = canvas.toDataURL("image/jpeg");

//          setImage(imageData);
//          stopCamera();
//     }

//     function stopCamera(){
//         const stream=videoRef.current.srcObject;
//        stream.getTracks().forEach(track=>track.stop());
//     }

//     async function recognizeObject(){
       
//         // const imageData=image.split(",")[1]
//          const response = await fetch(
//         "http://localhost:3001/api/recognize",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   { text: "Describe what you see in this image in 2-3 simple sentences." },
//                 //   { inline_data: { mime_type: "image/jpeg", data:imageData  } }
//                 { inline_data: { mime_type: "image/jpeg", data: image.split(",")[1] } }

//                 ]
//               }
//             ]
//           })
//         }
//       );

//       const data=await response.json();
     
//       console.log(data,"Hello");
//       console.log(data.candidates[0].content.parts[0]);
//       setObjDetails(data.candidates[0].content.parts[0].text);

//     }

//      useEffect(()=>{
//       textToSpeech(objDetails);
//      },[objDetails])
    
//   return (
//     <div>
//         {
//         image? <img src={image} /> :
//         <video ref={videoRef} autoPlay/>
//         }
//         <button onClick={openCamera}>Open Camera</button>
//         <button onClick={captureImage}>Capture Image</button>
         
//          <button>Re-Capture</button>
//          <button onClick={recognizeObject}>Identify Object</button>
//         <canvas ref={canvasRef} style={{display:'none'}}/>
//         {
//             objDetails?<p>{objDetails}</p>:""
//         }
//     </div>
//   )
// }

// export default Camera;