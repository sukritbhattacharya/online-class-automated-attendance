///////////////////////////////////////FIRE BASE//////////////////////////////////////
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBsgpXZnAXN2zTYTEefP1FiiPSNQQ8t-sQ",
    authDomain: "automated-attendance-b6913.firebaseapp.com",
    databaseURL: "https://automated-attendance-b6913.firebaseio.com",
    projectId: "automated-attendance-b6913",
    storageBucket: "automated-attendance-b6913.appspot.com",
    messagingSenderId: "584311236125",
    appId: "1:584311236125:web:fe0f87a720ad89779788f4",
    measurementId: "G-J9H7CC4D14"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  console.log(firebase);



let form  = document.getElementById('form');
document.getElementById("video").style.display = "none";

form.addEventListener('submit', (event) => {
  event.preventDefault();


  
  let classDurationInput = document.getElementById("class-duration").value
  let nameINput = document.getElementById("enter-name").value
  let nameInputLoweCase = nameINput.toLowerCase();
  console.log(classDurationInput);
  console.log(nameInputLoweCase);

  if (classDurationInput){
    
    document.getElementById("form").style.display = "none";
    document.getElementById("video").style.display = "block";

    let seconds = classDurationInput*60;
    let count =parseInt( seconds/15);
    console.log(count);
  
    //Video Starts------------------------------------------
    
    const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

//if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
function startVideo() {
  navigator.mediaDevices.getUserMedia(
    { video: true })
    .then(function(stream){
    video.srcObject = stream;
    //console.log(stream)
    video.play();
    });
    err => console.error(err)

    
}
//}

video.addEventListener('playing', () => {

  
  const canvas = faceapi.createCanvasFromMedia(video)
  
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  
  var present=[];
  var absent =[];
  var pcount=0;
  var acount=0;

  //var endcount = 4
  var x  = 1
  var id = NaN
  id = setInterval(async () => {
    console.log("count",x)
    
   
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    
    
    if(detections.length == 1)
    {
      pcount+=1;
      present.push(pcount);
     let canvas2 = document.getElementById("gameCanvas").getContext('2d')
     //console.log(canvas2);
     canvas2.drawImage(video,0,0)
    document.getElementById("imageshow").setAttribute("src",document.getElementById("gameCanvas").toDataURL('image/jpg'))
    let dispImg = document.getElementById("imageshow").src
     //console.log(dispImg);
     document.getElementById("imageshow").style.display="none";
     //Usage example:
var file = dataURLtoFile(dispImg,'hello.png');
console.log(file);

//API CALL
var formdata = new FormData();
formdata.append("user_id", nameInputLoweCase);
formdata.append("app_id", "kushi");
formdata.append("image", file, file.name);
formdata.append("image2", file, file.name);
formdata.append("n", "8");
formdata.append("deviceOs", "A");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://staging-preprod.vishwamcorp.com/v2/single_gesture_ios", requestOptions)
  .then(function(response) { 
  //  console.log(response.body);
 
  let status = response.status;
  //  console.log(status);

  let statusText = response.statusText;
  //  console.log(v);
    if(status == 200) {
      document.getElementById("status").innerHTML = status.toString() +" "+ statusText +" "+ "Success!";
      console.log(statusText);
    }
    if(status == 404 || status == 424 || status == 500){
      document.getElementById("status").innerHTML = status.toString() +" "+ statusText;
      document.getElementById("status").style.color = "red";
      console.log(statusText);

    }
  /*if(status == 404){
    console.log("face recognition failed")
  }
  if(status == 424){
    console.log()
  }*/
  })
  
  //.then(result => console.log(result))
  .catch(function(error){ 
    console.log('error', error)
  });


}

////////////////////////

 


      
      
    
    else
    {
      acount+=1;
      absent.push(acount);
      let canvas2 = document.getElementById("gameCanvas").getContext('2d')
      console.log(canvas2);
      canvas2.drawImage(video,0,0)
     //document.getElementById("imageshow").setAttribute("src",document.getElementById("gameCanvas").toDataURL('image/jpg'))
      let c=document.getElementById("gameCanvas")
    
      var image = new Image();
  image.id = "pic";
image.src = c.toDataURL();
console.log(image.src)
var fileType =dataURLtoFile(image.src, 'absent.png');
var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child(new Date() + " " + 'unknown').put(fileType);
    }

// function dataURLtoFile(dataurl, filename) {
 
//   var arr = dataurl.split(','),
//       mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]), 
//       n = bstr.length, 
//       u8arr = new Uint8Array(n);
      
//   while(n--){
//       u8arr[n] = bstr.charCodeAt(n);
//   }
  
//   return new File([u8arr], filename, {type:mime});
// }


/*function b64toBlob(dataURI) {

  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}*/
    
  
      
      //uploadImage(dispImgAbsent); 
      /*function fn() {
        const ref = firebase.storage().ref();
        ref.child(new Date() + '-' + 'base64').putString(image.src, 'data_url').then(function(snapshot) {
        console.log('Uploaded a data_url string!');
        alert("Image Uploaded")
     });
     }; */

    
    
    
     const resizedDetections = faceapi.resizeResults(detections, displaySize)
     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    
    
    
    console.log(present);
    console.log(present.length);
    console.log(absent);
    console.log(absent.length);

    if( x == count)
    {
      clearInterval(id)
      let pl= present.length;
      //console.log(pl);
      let al= absent.length;
      //console.log(al);
      let total = pl+al;
      //console.log(total);
      let ratio = pl/total;
      console.log(ratio);
      let pPercentage = ratio*100;
      let presentPercentage = "The present percentage is" + "" + pPercentage;
      console.log(presentPercentage);
      document.getElementById("displayPercentage").innerHTML = presentPercentage;
      //console.log(present.length);
      //console.log(absent.length);
      
  //     ///////////////////////////////////////FIRE BASE//////////////////////////////////////
  // // Your web app's Firebase configuration
  // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // var firebaseConfig = {
  //   apiKey: "AIzaSyBsgpXZnAXN2zTYTEefP1FiiPSNQQ8t-sQ",
  //   authDomain: "automated-attendance-b6913.firebaseapp.com",
  //   databaseURL: "https://automated-attendance-b6913.firebaseio.com",
  //   projectId: "automated-attendance-b6913",
  //   storageBucket: "automated-attendance-b6913.appspot.com",
  //   messagingSenderId: "584311236125",
  //   appId: "1:584311236125:web:fe0f87a720ad89779788f4",
  //   measurementId: "G-J9H7CC4D14"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  // console.log(firebase);
  var database = firebase.database();
  var ref = database.ref('percentages');
  ref.on('value', gotData, errData);

  function gotData(data){
  // console.log(data);
  var percentages = data.val();
  var keys = Object.keys(percentages);
  console.log(keys);
  for(var i = 0; i < keys.length; i++){
    var k =keys[i];
    var name = percentages[k].name;
    var percentage = percentages[k].percentage;
    let nameByPercent = name + ":" + percentage;
    let list = document.getElementById("percentage-list");
    list.appendChild(createMenuItem(nameByPercent))
    
    //console.log(name, percentage);
  }

  }

  function errData(err){
    console.log('Error!')
    console.log(err);
    
  }

  var data = {
    name: nameInputLoweCase,
    percentage: pPercentage
  }
  console.log(data);
  ref.push(data);
 
  
/////////////////////////////////////////////FIRE BASE END//////////////////////////////
    }
    
    x += 1

    

      
  },15000)

})

    
  }
  //console.log(classDurationInput);

  

    // handle the form data
});
//////////////////////////////////////////////////////base64 to file format
function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}

function createMenuItem(getList) {
  let li = document.createElement('li');
  li.textContent = getList;
  return li;
}
/*function uploadImage(absFile){
  const ref1 = firebase.storage().ref()

  const storageFile = absFile;

  const stuName = +new Date() + "-" + storageFile.name;

  const metadata = {
    contentType: file.type
  };

  const task = ref1.child(stuName).put(storageFile, metadata);
  task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => {
    console.log(url);
  //  document.querySelector("#image").src = url;
  })
  .catch(console.error);} */

 /*function fn() {
   const ref = firebase.storage().ref();
   ref.child(new Date() + '-' + 'base64').putString(image.src, 'data_url').then(function(snapshot) {
   console.log('Uploaded a data_url string!');
   alert("Image Uploaded")
});
};*/