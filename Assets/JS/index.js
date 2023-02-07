var sName = document.getElementById("sName");
var sURL = document.getElementById("sUrl");
var table = document.getElementById("listTable");
var updateBtn = document.getElementById("updateBookmark");
var addBtn = document.getElementById("addBookmark");
var dnsCondition = document.querySelector(".wrong__red");
var bookmarkContainer = [];
var objectIndex = 0;
var globalUpdatedIndex = 0;
// var allSites;



if(localStorage.getItem('allSites') === null){
  var bookmarkContainer = [];
  if (bookmarkContainer.length === 0) {
  table.classList.add("d-none");
}
}
else{
  bookmarkContainer=JSON.parse(localStorage.getItem('allSites'))
  console.log(bookmarkContainer);
  display();
}

function deleteItem(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#008000",
    cancelButtonText: "No",
    focusConfirm: false,
    cancelButtonColor: "#f00",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      bookmarkContainer.splice(index, 1);

      //Delete from LocalStorage
      if(bookmarkContainer.length<1){
        localStorage.clear();
      }
      else{
        localStorage.setItem('allSites',JSON.stringify(bookmarkContainer));
      }

      display();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
  // alert("delete Item Clicked");
}

function addItem() {
  //alert("add Item Clicked");
  /*var time = new Date();

  var site = {
    sId: objectIndex++,
    sName: sName.value,
    sURL: sURL.value,
    sTime: time,
  };*/
  /********************************************** */
  if (validateSiteName() && validateSiteURL()) {
    document.getElementById("wrongURL").classList.replace("d-block", "d-none");
    document.getElementById("sUrl").classList.remove("box");
    document.getElementById("sName").classList.remove("box");
    dnsCondition.classList.replace("d-block", "d-none");

    var time = new Date();

    var site = {
      sName: sName.value,
      sURL: sURL.value,
      sTime: time,
    };
    console.log(bookmarkContainer);
    bookmarkContainer.push(site);

    localStorage.setItem('allSites',JSON.stringify(bookmarkContainer))

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    display();
    reset();
  } else {
    // console.log('laaaaaaaaaaa2');
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });

    document.getElementById("wrongURL").classList.replace("d-none", "d-block");
    document.getElementById("sUrl").classList.add("box");
    document.getElementById("sName").classList.add("box");
    dnsCondition.classList.replace("d-none", "d-block");
  }

  // if(validateSiteURL()){
  //   console.log('URL tmam')
  // }

  // else {
  //   console.log('URL Mshmom')
  // }
  /********************************************** */
  /*bookmarkContainer.push(site);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });

  display();
  reset();*/
}

function updateItem() {
  // alert("update Item was Clicked");

  if (validateSiteName() && validateSiteURL()) {
    document.getElementById("wrongURL").classList.replace("d-block", "d-none");
    document.getElementById("sUrl").classList.remove("box");
    document.getElementById("sName").classList.remove("box");
    dnsCondition.classList.replace("d-block", "d-none");

    var newTime = new Date();

    var newData = {
      sName: sName.value,
      sURL: sURL.value,
      sTime: newTime,
    };

    //Add The new item and delete the old one @ the same place
    bookmarkContainer.splice(globalUpdatedIndex, 1, newData);

    //Update the localStorage
    localStorage.setItem('allSites',JSON.stringify(bookmarkContainer))

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    //call display
    display();
    reset();

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });

    document.getElementById("wrongURL").classList.replace("d-none", "d-block");
    document.getElementById("sUrl").classList.add("box");
    document.getElementById("sName").classList.add("box");
    dnsCondition.classList.replace("d-none", "d-block");
  }

  // var newTime = new Date();

  // var newData = {
  //   sName: sName.value,
  //   sURL: sURL.value,
  //   sTime: newTime,
  // };

  // console.log(newData)

  //Add The new item and delete the old one @ the same place
  //bookmarkContainer.splice(globalUpdatedIndex, 1, newData);

  /*Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });

  //call display
  display();
  reset();

  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");*/
}

function getUpdate(index) {
  sName.value = bookmarkContainer[index].sName;
  sURL.value = bookmarkContainer[index].sURL;
  globalUpdatedIndex = index;
  // globalUpdatedIndex = bookmarkContainer[index].sId;
  // sName.select();
  sURL.select();

  //console.log(bookmarkContainer[index].sId)

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function visitURL(index) {
  // alert("visit Item Clicked");
  //document.getElementById("visitBtn").setAttribute("href", `"${bookmarkContainer[index].sURL}"`);
  //document.getElementById("visitBtn").setAttribute("href", location.replace(`${bookmarkContainer[index].sURL}`));
  // location.replace(`${bookmarkContainer[index].sURL}`);
  // location.open(`${bookmarkContainer[index].sURL}`,'_blank')
  // visitBtn.setAttribute("href", `"${bookmarkContainer[index].sURL}"`);
  var a = document.createElement("a");
  a.target = "_blank";
  a.href = `${bookmarkContainer[index].sURL}`;
  a.rel = "noopener";
  a.click();
  // console.log(visitBtn);
}

function display() {
  var container = "";
  if (bookmarkContainer.length === 0) {
    table.classList.add("d-none");
  } else {
    for (var i = 0; i < bookmarkContainer.length; i++) {
      container += `
  <tr>
              <td><b>${bookmarkContainer[i].sName}</b></td>
              <td>${bookmarkContainer[i].sURL}</td>
              <td class="text-center"><button class="btn btn-outline-primary" id="visitBtn" onclick="visitURL(${i})"><i class="fa-regular fa-eye"></i></button></td> 
              <td class="text-center"><button class="btn btn-outline-warning" onclick="getUpdate(${i})"><i class="fa-solid fa-edit"></i></button></td>
              <td class="text-center"><button class="btn btn-outline-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i></button></td>  
              <td>${convertDateFormat(bookmarkContainer[i].sTime)}</td>
            </tr> 
  `;
    }
    table.classList.remove("d-none");
    document.getElementById("tBody").innerHTML = container;
  }
}

function reset() {
  sName.value = "";
  sURL.value = "";
}

/*function showURL(index) {
  alert("show Item was Clicked");
document.getElementById('showBtn').innerHTML=bookmarkContainer[index].sURL;
// document.getElementById('showBtn').onclick=function() { removeClick( );}
document.getElementById('showBtn').classList.replace('toggle__visible','remove__cursor')

//<td ><button onclick="showURL(${i})" class='toggle__visible' id="showBtn">Click To show</button></td>
//<td>${bookmarkContainer[i].sURL}</td>
}*/

function validateSiteName() {
  var siteNameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-\_]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  return siteNameRegex.test(sName.value);
}

function validateSiteURL() {
  var url;
  try {
    url = new URL(sURL.value);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}


function convertDateFormat(dateString) {
  const date = new Date(dateString);
   var dateD, dateM, dateF, dateH, dateMs, dateS;
  //  console.log(date.getMonth()+1);
  
   dateD= (date.getDate() < 10 ) ? ("0" + date.getDate()) : (date.getDate()) ;
   dateM= +(date.getMonth() + 1) < 10 ? ("0" + +(date.getMonth() + 1)) : +(date.getMonth() + 1) ;
   dateF= date.getFullYear();
   dateH= (date.getHours() < 10 ) ? ("0" + date.getHours()) : (date.getHours());
   dateMs= (date.getMinutes() < 10 ) ? ("0" + date.getMinutes()) : (date.getMinutes());
   dateS= (date.getSeconds() < 10 ) ? ("0" + date.getSeconds()) : (date.getSeconds());

   return String(dateD + '/' + dateM + '/' + date.getFullYear()+ " " + dateH + ":" + dateMs + ":" + dateS)
  // return String( date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + '/' 
  // + date.getMonth() + 1 < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1 + '/'
  // + date.getFullYear() + " "
  // + date.getHours() < 10 ? "0" + date.getHours(): date.getHours() + ":"
  // + date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes() + ":"
  // + date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds() 
  // )

 // return String(dateD + '/' + dateM )
}


/**
 <td>${
                (bookmarkContainer[i].sTime.getDate() < 10)
                  ? ("0" + bookmarkContainer[i].sTime.getDate())
                  : (bookmarkContainer[i].sTime.getDate())
              }/${
        bookmarkContainer[i].sTime.getMonth() + 1 < 10
          ? "0" + (bookmarkContainer[i].sTime.getMonth() + 1)
          : bookmarkContainer[i].sTime.getMonth() + 1
      }/${bookmarkContainer[i].sTime.getFullYear()}&nbsp;${
        bookmarkContainer[i].sTime.getHours() < 10
          ? "0" + bookmarkContainer[i].sTime.getHours()
          : bookmarkContainer[i].sTime.getHours()
      }:${
        bookmarkContainer[i].sTime.getMinutes() < 10
          ? "0" + bookmarkContainer[i].sTime.getMinutes()
          : bookmarkContainer[i].sTime.getMinutes()
      }:${
        bookmarkContainer[i].sTime.getSeconds() < 10
          ? "0" + bookmarkContainer[i].sTime.getSeconds()
          : bookmarkContainer[i].sTime.getSeconds()
      }</td>
 */
