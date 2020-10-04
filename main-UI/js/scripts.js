/*!
		* Start Bootstrap - Freelancer v6.0.4 (https://startbootstrap.com/themes/freelancer)
		* Copyright 2013-2020 Start Bootstrap
		* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
		*/
		(function($) {
		"use strict"; // Start of use strict
	
		// Smooth scrolling using jQuery easing
		$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: (target.offset().top - 71)
					}, 1000, "easeInOutExpo");
					return false;
				}
			}
		});
	
		// Scroll to top button appear
		$(document).scroll(function() {
			var scrollDistance = $(this).scrollTop();
			if (scrollDistance > 100) {
				$('.scroll-to-top').fadeIn();
			} else {
				$('.scroll-to-top').fadeOut();
			}
		});
	
		// Closes responsive menu when a scroll trigger link is clicked
		$('.js-scroll-trigger').click(function() {
			$('.navbar-collapse').collapse('hide');
		});
	
		// Activate scrollspy to add active class to navbar items on scroll
		$('body').scrollspy({
			target: '#mainNav',
			offset: 80
		});
	
		// Collapse Navbar
		var navbarCollapse = function() {
			if ($("#mainNav").offset().top > 100) {
				$("#mainNav").addClass("navbar-shrink");
			} else {
				$("#mainNav").removeClass("navbar-shrink");
			}
		};
		// Collapse now if page is not at top
		navbarCollapse();
		// Collapse the navbar when page is scrolled
		$(window).scroll(navbarCollapse);
	
		// Floating label headings for the contact form
		$(function() {
			$("body").on("input propertychange", ".floating-label-form-group", function(e) {
				$(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
			}).on("focus", ".floating-label-form-group", function() {
				$(this).addClass("floating-label-form-group-with-focus");
			}).on("blur", ".floating-label-form-group", function() {
				$(this).removeClass("floating-label-form-group-with-focus");
			});
		});
	
	})(jQuery); // End of use strict

// MAIN SCRIPT STARTS HERE

////////////////////////////////////////FIRE BASE//////////////////////////////////////
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
  //console.log(firebase);
  var database = firebase.database();
  var ref_to_attendance = database.ref('attendance')
  var date = []






let form  = document.getElementById('form');
document.getElementById("video").style.display = "none";
form.addEventListener('submit', (event) => {
  event.preventDefault();


  
  let classDurationInput = document.getElementById("class-duration").value
  let nameINput = document.getElementById("enter-name").value
  let nameInputLoweCase = nameINput.toLowerCase();
  let dict = {}
  dict[nameInputLoweCase.toString()]=
    {
      name:nameInputLoweCase.toString()
    }
  var some = ref_to_attendance.push(dict).key;
  console.log(classDurationInput);
  //console.log(nameInputLoweCase);

  if (classDurationInput){
    
    document.getElementById("form").style.display = "none";
    document.getElementById("video").style.display = "block";

    let seconds = classDurationInput*60;
    let count =parseInt( seconds/15);
    let noofRecog = count/3;            
    console.log(count);
    
  
    //Video Starts------------------------------------------
    
    const video = document.getElementById('video')

Promise.all([
 // faceapi.nets.mtcnn.loadFromUri('../main-UI/models')

  
  faceapi.nets.tinyFaceDetector.loadFromUri('../main-UI/models'),
 // console.log(faceapi.nets)
  //faceapi.nets.faceLandmark68Net.loadFromUri('../main-UI/models'),
  //faceapi.nets.faceRecognitionNet.loadFromUri('../main-UI/models'),
  //faceapi.nets.faceExpressionNet.loadFromUri('../main-UI/models')
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
  
  //document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  
  var present=[];
  var absent =[];
  var pcount=0;
  var acount=0;
  var frPcount= 0;
  var frAcount= 0;
  var frPresent=[];
  var frAbsent=[];

 // var frResponse = false;
  var apiCount = 1;
  var apiC = 0;
  // var frPlength = frPresent.length;
  // var frAlength = frAbsent.length; 
 
  



  var x  = 1;
  var id = NaN
  
  id = setInterval(async () => {
    console.log("count",x)
    
   
   const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())    //{inputSize: 160, scoreThreshold: 0.2}
   //console.log(detections);

  // const mtcnnForwardParams = {
  //   // limiting the search space to larger faces for webcam detection
  //   minFaceSize: 200
  // }
  
  // const mtcnnResults = await faceapi.mtcnn(video, new faceapi.MtcnnOptions())      //mtcnnForwardParams
  // console.log(mtcnnResults);
  //faceapi.drawDetection('overlay', mtcnnResults.map(res => res.faceDetection), { withScore:false })
  //faceapi.drawLandmarks('overlay', mtcnnResults.map(res => res.faceLandmarks), { lineWidth: 4, color: 'red' })




  
    
    
    if(detections.length == 1)
    {
      pcount+=1;
      present.push(pcount);
    }

////////////////////////

 


      
      
    
    else
    {
      acount+=1;
	  absent.push(acount);
	  absentLength = absent.length;
      let canvas2 = document.getElementById("gameCanvas").getContext('2d')
      //console.log(canvas2);
      canvas2.drawImage(video,0,0)
     //document.getElementById("imageshow").setAttribute("src",document.getElementById("gameCanvas").toDataURL('image/jpg'))
      let c=document.getElementById("gameCanvas")
    
      var image = new Image();
  image.id = "pic";
image.src = c.toDataURL();
//console.log(image.src)
var fileType =dataURLtoFile(image.src, nameInputLoweCase + 'absent.png');
var storage = firebase.storage();
var storageRef = storage.ref('DetectionFailed');
var imagesRef = storageRef.child(nameINput + " " + "Absent:"+ " "+ absentLength + " " + new Date() ).put(fileType);
    }



    
    
    
    // const resizedDetections = faceapi.resizeResults(detections, displaySize)
    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    
    
    
    console.log("present array" + " "+ present);
    console.log(present.length);
    console.log("absent array" + " " + absent);
    console.log(absent.length);
    
    
      //console.log(x + "count is");
      if(x%noofRecog == 0){
        
      let canvas2 = document.getElementById("gameCanvas").getContext('2d')
     //console.log(canvas2);
     canvas2.drawImage(video,0,0)
    document.getElementById("imageshow").setAttribute("src",document.getElementById("gameCanvas").toDataURL('image/jpg'))
    let dispImg = document.getElementById("imageshow").src
     //console.log(dispImg);
     document.getElementById("imageshow").style.display="none";
     //Usage example:
let file = dataURLtoFile(dispImg,'hello.png');

        var formdata = new FormData();
        formdata.append("user_id", nameInputLoweCase);
        formdata.append("app_id", "kushi");
        formdata.append("image", file, file.name);
        formdata.append("image2", file, file.name);
        formdata.append("n", "8");                   //n=8 =>liveness and recog, n=1=>liveness, n=100=>recog. 
        formdata.append("deviceOs", "A");

let requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
      ///////////////////////////////.then method//////////////////
//console.log(frResponse);
fetch("https://staging-preprod.vishwamcorp.com/v2/single_gesture_ios", requestOptions)
  .then((response) =>{
    let status = response.status
    let responsetext = {                  //how to do it in array form
      "200":"success",
      "404":"Face Recognition Failed!",
      "500":"Server error!",
      "424":"Failed Dependency",
      "409":"Conflict Error.",
      "406":"Not Acceptable",
    }
  
    let statusText = response.statusText;
    //  console.log();
     ref_to_attendance.child(some).child(nameInputLoweCase).push(
      {
          "timestamp":new Date().toString(),
          "response":responsetext[status.toString()]
      }
      )
      if(status == 200) {
        document.getElementById("status").innerHTML = status.toString() +" "+ statusText +" "+ "Success!";
        console.log(statusText);
        frPcount+=1;
        frPresent.push(frPcount);
      }
      if(status == 404 || status == 424 || status == 500 || status == 409 || status == 406 ){
         
        document.getElementById("status").innerHTML = status.toString() +" "+ statusText;
        document.getElementById("status").style.color = "red";

        frAcount+=1;
        frAbsent.push(frAcount);
        
        console.log(statusText);
        // console.log(x+"here");
        // console.log(count+"count is here");
      }

      if( x == count){
        // frResponse = true;
        // console.log(frResponse)
              // console.log("hiiiiiiiiiiiiiiiiii")
              clearInterval(id)
              let pl= present.length;
              //console.log(pl);
              let al= absent.length;
              //console.log(al);
              let total = pl+al;
              //console.log(total);
              let ratio = pl/total;
              //console.log(ratio);
              let pPercentage = Math.round(ratio*100);
              let presentPercentage = nameInputLoweCase+ "s" + "present percentage is" + "" + pPercentage;
              console.log(presentPercentage);
              document.getElementById("displayPercentage").innerHTML = presentPercentage;
              
          var ref = database.ref('percentages');
          var data = {
            name: nameInputLoweCase,
            percentage: pPercentage
          }
          //console.log(data);
          ref.push(data);
        
          ref.on('value', gotData, errData);
        
          function gotData(data){
          // console.log(data);
          var percentages = data.val();
          //console.log(percentages);
          var keys = Object.keys(percentages);
          //console.log(keys);
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

          console.log(frAbsent.length)
          let recogThreshold = frPresent.length + frAbsent.length;
if(frPresent.length < Math.round( recogThreshold/2)){
  console.log(frAbsent.length)
  
  let frPercentage = pPercentage - frAbsent.length*3;
  
  console.log(frPercentage);
  let frRecog = document.getElementById("fr-percentage")
  frRecog.innerHTML = frPercentage;
}
        }

  })
  
  .catch(err => {
    console.log(err)
  });
}

// console.log(x+"end condition" + count + "end");



    
    

    
   

if(x<count){
x +=1;
}
      
  },15000)
  
  
 
  

})

    
  }
  
});
//////////////////////////////////////////////////////base64 to file format
function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],        //image/png  
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



