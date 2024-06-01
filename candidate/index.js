const runDataTable = () => {
    $("#candidateTable").DataTable().destroy();
  
    $(function () {
      $("#candidateTable").DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
         //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        buttons: ["colvis"],
  
        dom: "Bfrtip", // يحدد مكان ظهور الأزرار
        pagingType: "full_numbers",
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
      });
    });
  };
  //getData candidate
const getData = async () => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      "https://vote-roan.vercel.app/Admin/getCandidateByAdmin",
      { headers }
    );
    console.log(data);
    return data.getinformation;
  };
  const displayData = async () => {
    const data = await getData();
    console.log(data);
    const result = data
      .map(
        (d) =>
          `<tr>
          <td>${d.userName}</td>
          <td>${d.email}</td>
          <td>${d.phone}</td>
          <td>${d.statuse}</td>
          <td>${d.address}</td>
          <td>${d.cardnumber}</td>
          <td>${d.gender}</td>
           <td class=" align-items-center justify-content-center" style="column-gap=10px">
        <svg style="cursor:pointer" width="20" height="20" onclick="deleteCandidate('${d._id}',event)" 
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 
         by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons,
          Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448
           383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24
            24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
            <a style="cursor:pointer" href="./edit.html?id=${d._id}">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
  
            
            </a>
        </td>
          </tr>
        
          `
      )
      .join("");
    document.querySelector(".data").innerHTML += result;
    runDataTable();
  
  
  };
  //GetData Candidate (User)
  const getDataCanUser = async () => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      "https://vote-roan.vercel.app/candidate/getcandidate",
      { headers }
    );
    console.log(data);
    return data.Candidate;
  };
  const displayDataCanUser = async () => {
    const data = await getDataCanUser();
    console.log(data);
    const result = data
      .map(
        (d) =>
          `<tr>
          <td>${d.userName}</td>
          <td>${d.email}</td>
          <td>${d.phone}</td>
          <td>${d.statuse}</td>
          <td>${d.address}</td>
          <td>${d.cardnumber}</td>
          <td>${d.gender}</td>
          
          </tr>
        
          `
      )
      .join("");
    document.querySelector(".data").innerHTML += result;
    runDataTable();
  
  
  };

  // بيانات المرشح اللي حذفهم الأدمن الخاص فيهم, لكن حذف مؤقت
const getDataCanDeleted = async () => {
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    "https://vote-roan.vercel.app/Admin/getdeletcandidate",
    { headers }
  );
  console.log(data);
  return data.getinformation;
};
//Display Data Can
const displayDataForCanDeleted = async () => {
  const data = await getDataCanDeleted();
  console.log(data);
  
  const result = data
    .map(
      (d) =>
        `<tr>
        <td>${d.userName}</td>
        <td>${d.email}</td>
        <td>${d.phone}</td>
        <td>${d.statuse}</td>
        <td>${d.address}</td>
        <td>${d.cardnumber}</td>
        <td>${d.gender}</td>
        <td class=" align-items-center justify-content-center" style="column-gap=10px">
        <svg style="cursor:pointer" width="50" height="20" onclick="restoreCan('${d._id}',event)"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3C140.6 6.8 151.7 0 163.8 0zM32 128H416L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32 128zm192 64c-6.4 0-12.5 2.5-17 7l-80 80c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V408c0 13.3 10.7 24 24 24s24-10.7 24-24V273.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-4.5-4.5-10.6-7-17-7z"/></svg>
            
            <svg style="cursor:pointer" width="50" height="20" onclick="deleteCanFinally('${d._id}',event)"  
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 
            by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons,
             Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448
              383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24
               24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
           
        </td>
        </tr>
      
        `
    )
    .join("");
  document.querySelector(".data").innerHTML += result;
  runDataTable();


};
  //login candidate
const loginForm = document.querySelector(".loginForm");
if (loginForm) {
  loginForm.onsubmit = async function (e) {
    const elements = e.target.elements;
    e.preventDefault();
    document.querySelector(".overlay").classList.toggle("d-none");
    const email = elements["email"].value;
    const password = elements["password"].value;

    try {
      const { data } = await axios.post(
        `https://vote-roan.vercel.app/auth/singin`,
        { email, password }
      );

      if (data.message == "success") {
        localStorage.setItem("adminToken", data.token);

        location.href = "../home/index.html";
      }
    } catch (error) {
      if (error.response.status == 400) {
        console.log("Email or Password is not correct ");
      
        document.querySelector('.errorr').innerHTML+="Email or Password is not correct";
      }
    } finally {
      document.querySelector(".overlay").classList.toggle("d-none");
    }
  };
}
//add candidate
//اضافة المرشح باستخدام الادمن العادي
const addCandidate = document.querySelector(".submit");
if (addCandidate) {
  addCandidate.addEventListener("submit", async function (e) {
    const elements = e.target.elements;
    const token = localStorage.getItem("adminToken");
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", elements["userName"].value);
    formData.append("email", elements["email"].value);
    formData.append("password", elements["password"].value);
    formData.append("Cpassword", elements["Cpassword"].value);
    formData.append("phone", elements["phone"].value);
    formData.append("role", "Candidate");
    formData.append("address", elements["address"].value);
    formData.append("cardnumber", elements["cardnumber"].value);
    formData.append("gender", elements["gender"].value);
    formData.append("image", elements["image"].files[0]);

    try{
      const headers = { Authorization: `haneen__${token}` };
      const { data } = await axios.post(
        `https://vote-roan.vercel.app/Admin/addCandidate`,
        formData,
        { headers }
      );
      if(data.message=="success")
        {
          Swal.fire({
            text: "Candidate added seccesfully .",
            icon: "success",
          }); 
          location.href ="./index.html";
        }
    }catch(error){
      console.log(error);
      alert("حدثت مشكلة في اضافة هذا المرشح");
    }
   
  });
}
//edit candidate     
//التعديل على المرشح باستخدام أدمن عادي     
const editCan = async () => {
  const search = new URLSearchParams(window.location.search);
  const id = search.get("id");

  const data = await getCan(id);
  console.log(data);
  document.getElementsByName("id")[0].value =id;
  document.getElementsByName("userName")[0].value = data.userName;
  document.getElementsByName("email")[0].value = data.email;
  document.getElementsByName("AdminID")[0].value = data.AdminID;
  document.getElementsByName("phone")[0].value = data.phone;
  document.getElementsByName("cardnumber")[0].value = data.cardnumber;
  document.getElementsByName("address")[0].value = data.address;

  document.getElementsByName("gender")[0].value = data.gender;
  const genders = document.getElementsByName("gender");
  if (data.gender === 'Male') {
    genders[0].checked = true;
  } else {
    genders[1].checked = true;
  }

  const currentImage = document.querySelector(".currentImage");
  if (currentImage) {
    currentImage.setAttribute("src", data.image.secure_url);
  } else {
    console.error("Element with class 'currentImage' not found.");
  }
};
//بجيب بيانات مرشح عادي
const getCan = async (id) => {
  const token = localStorage.getItem("adminToken");

  const { data } = await axios.get(
    `https://vote-roan.vercel.app/candidate/CandidateIDvalid/${id}`,{
      headers: { Authorization: `haneen__${token}` }
    }
  );

  return data.candidate;
};
  //update candidate
  //التعديل على مرشح باستخدام الأدمن
  const updateCan = document.querySelector(".submit");
if (updateCan) {
  updateCan.addEventListener("submit", async function (e) {  
    console.log(updateCan);
    e.preventDefault();
    const elements = e.target.elements;
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("userName", elements["userName"].value);
    formData.append("email", elements["email"].value);
    formData.append("AdminID", elements["AdminID"].value);
    formData.append("phone", elements["phone"].value);
    formData.append("address", elements["address"].value);
    formData.append("cardnumber", elements["cardnumber"].value);
    formData.append("gender", elements["gender"].value);
    if (elements["image"].files[0]) {
      formData.append("image", elements["image"].files[0]);
    }
    
    const id = elements["id"].value;

    try {
      const headers = { Authorization: `haneen__${token}` };
      const response = await axios.put(
        `https://vote-roan.vercel.app/Admin/updateCandidate/${id}`,
        formData,
        { headers }
      );

      console.log(response.data);

      if (response.data.message === 'success') {
        Swal.fire({
          text: "Candidate edit successfully.",
          icon: "success",
        });
        location.href ="./index.html";
      } else {
        alert("Can't edit this Candidate.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while editing the candidate.");
    }
  });
}
  //Delete candidate
  //حذف مرشح عن طريق الأدمن الخاص فيه
const deleteCandidate = async (id, e) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
        const token = localStorage.getItem("adminToken");
        const {data} = await axios.patch
        (
          `https://vote-roan.vercel.app/Admin/softDelet/${id}`,{},
          {
            headers: { Authorization: `haneen__${token}` },
          }
        );
    
  console.log(data);
        if (data.message == "Successfully deleted Candidate") {
           Swal.fire({
          title: "Deleted!",
          text: "Admin has been deleted.",
          icon: "success",
        });
          e.target.closest("tr").classList.add("d-none");
        }
       
    }catch (error) {
      console.log(error);
      Swal.fire({
        title:error.response.data.message,
  
        icon: "error",
      });
  
  
    }
    }
  });
  } 
//لتقديم طلب الانسحاب 
//جيب التصويتات اللي مشارك فيها المرشح
const getVoteName = async () => {
  const token = localStorage.getItem("adminToken");
 
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    "https://vote-roan.vercel.app/candidate/AllVotesParticipateIn",
    { headers }
  );
  console.log(data);
  return data.candidate.voteNames;
};
//بضيف كل اسماء التصويتات على ال select
const addNameVote = async () => {
  const data = await getVoteName();
  if (data) {
    const options = data.map((d) => `<option>${d}</option>`);
    const result = options.join("");
    document.querySelector(".createPost").innerHTML += result;
  } else {
    console.error("Data is undefined");
  }
};
// بنشأ طلب الأنسحاب
const addRequest = document.querySelector(".submitRequest");
if (addRequest) {
  addRequest.addEventListener("submit", async function (e) {
    e.preventDefault();
    const elements = e.target.elements;
    const token = localStorage.getItem("adminToken");
    console.log(token);
   
    const voteName = elements["voteName"].value;
    const reason = elements["reason"].value;

    try {
      const headers = { Authorization: `haneen__${token}` };
      const { data } = await axios.post(
        `https://vote-roan.vercel.app/candidate/requestWithdrawal`,
        
        { voteName, reason },
        { headers }
      );
      console.log(data);
      alert("تم تقديم طلبك للأنسحاب بنجاح");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تقديم طلب الأنسحاب");
    }
  });
}
const getRole = async () => {
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    `https://vote-roan.vercel.app/Admin/role`,
    { headers }
  );
 
  return data.role;
};
//auth#2
const authorization = async () =>{
  const role = await getRole();
  document.querySelector(".sama").innerHTML = `
  
  ${role == 'SuperAdmin'?`
  <li class="nav-item">
      <a href="./../profile/supreAdminProfile.html" class="nav-link active">
        <i class="far fa-circle nav-icon"></i>
        <p>My Profile</p>
      </a>
    </li>
  <li class="nav-item">
      <a href="./../admin/create.html" class="nav-link active">
        <i class="far fa-circle nav-icon"></i>
        <p>Add Admin</p>
      </a>
    </li>
    <li class="nav-item">
      <a href="./../admin/index.html" class="nav-link">
        <i class="far fa-circle nav-icon"></i>
        <p>Show Admins</p>
      </a>
    </li>
        <li class="nav-item">
<a href="./../votes/create.html" class="nav-link active">
  <i class="far fa-circle nav-icon"></i>
  <p>Add Vote</p>
</a>
</li>
<li class="nav-item">
<a href="./../votes/index.html" class="nav-link">
  <i class="far fa-circle nav-icon"></i>
  <p>Show Vote</p>
</a>
</li>   
<li class="nav-item">
<a href="./../votes/result.html" class="nav-link active">
  <i class="far fa-circle nav-icon"></i>
  <p>Result Vote</p>
</a>
</li>

<li class="nav-item">
  <a href="./../admin/deletedAdmin.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show admin was Deleted and restore</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../post/addPost.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>add Post</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../post/discussion.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Post</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../profile/candNameAndPost.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Candidate and The Post</p>
  </a>
</li>


  `:''}
  ${role == 'Admin'?`

  <li class="nav-item">
  <a href="./../profile/adminProfile.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>My Profile</p>
  </a>
</li>

    <li class="nav-item">
      <a href="./../admin/withdrawals.html" class="nav-link active">
        <i class="far fa-circle nav-icon"></i>
        <p>withdrawals Candidate</p>
      </a>
    </li>    <li class="nav-item">

<li class="nav-item">
<a href="./../votes/index.html" class="nav-link">
  <i class="far fa-circle nav-icon"></i>
  <p>Show Vote</p>
</a>
</li>   
<li class="nav-item">
<a href="./../votes/result.html" class="nav-link active">
  <i class="far fa-circle nav-icon"></i>
  <p>Result Vote</p>
</a>
</li><li class="nav-item">
  <a href="./../candidate/create.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Add Candidate</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../candidate/index.html" class="nav-link">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Candidate</p>
  </a>
</li>
  
<li class="nav-item">
  <a href="./../post/addPost.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>add Post</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../post/discussion.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Post</p>
  </a>
</li>
 <li class="nav-item">
  <a href="./../user/index.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show and Accept Users</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../candidate/deletedCandidate.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Candidate was Deleted and restore</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../votes/voteAdmin.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Vote Resposible</p>
  </a>
</li>

<li class="nav-item">
  <a href="./../profile/candNameAndPost.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Candidate and The Post</p>
  </a>
</li>
  `:''}


  ${role == 'Candidate'?`
  <li class="nav-item">
  <a href="./../profile/profile.html" class="nav-link">
    <i class="far fa-circle nav-icon"></i>
    <p> My Profile</p>
  </a>
</li>
<li class="nav-item">
<a href="./../votes/index.html" class="nav-link">
  <i class="far fa-circle nav-icon"></i>
  <p>Show Vote</p>
</a>
</li>   
<li class="nav-item">
<a href="./../votes/result.html" class="nav-link active">
  <i class="far fa-circle nav-icon"></i>
  <p>Result Vote</p>
</a>
  
              <li class="nav-item">
                <a href="./../candidate/Withdrawal.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Withdrawal request</p>
                </a>
              </li>
<li class="nav-item">
  <a href="./../post/createPost.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>add Post</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../post/discussion.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Post</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../profile/candNameAndPost.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Candidate and The Post</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../candidate/parVote.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Vote I participated in</p>
  </a>
</li>

  `:''}

  ${role == 'User'?`
  <li class="nav-item">
  <a href="./../profile/UserProfile.html" class="nav-link">
    <i class="far fa-circle nav-icon"></i>
    <p>My Profile</p>
  </a>
</li> 
<li class="nav-item">
<a href="./../votes/index.html" class="nav-link">
  <i class="far fa-circle nav-icon"></i>
  <p>Show Vote</p>
</a>
</li>   
<li class="nav-item">
<a href="./../votes/result.html" class="nav-link active">
  <i class="far fa-circle nav-icon"></i>
  <p>Result Vote</p>
</a>


  

<li class="nav-item">
  <a href="./../post/discussion.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Post</p>
  </a>
</li>

<li class="nav-item">
  <a href="./../user/activeVote.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Voting</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../votes/preVote.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Vote Parti In</p>
  </a>
</li>
<li class="nav-item">
  <a href="./../profile/candNameAndPost.html" class="nav-link active">
    <i class="far fa-circle nav-icon"></i>
    <p>Show Candidate and The Post</p>
  </a>
</li>

  `:''}
 




  `;};
//عرض التصويتات اللي شارك فيهم 
const getpreviousvotes = async () => {
  try{
    const token = localStorage.getItem("adminToken");

  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    `https://vote-roan.vercel.app/candidate/AllVotesParticipateIn`,
    { headers }
  );
  console.log(data);
  return data.candidate;
  
}
  catch(error){
      console.log(error);
  }
};
const displayDataV = async () => {
  const data = await getpreviousvotes();  

 



  if (data.voteNames && data.voteNames.length > 0) {
      const result = data.voteNames
          .map((voteName) => `<li>${voteName}</li>`)
          .join("");

      document.querySelector(".vote").innerHTML = result; 
  }
};
const CreateExcelUser = document.querySelector(".createExcel");
if (CreateExcelUser) {
  CreateExcelUser.addEventListener("submit", function(e) {
    e.preventDefault();
    createWithExcelCandidate(e);
  });
}
const createWithExcelCandidate = async (e) => {
  const token = localStorage.getItem("adminToken");
  const elements = e.target.elements;
 
  const formData = new FormData();  
  formData.append("file", elements["file"].files[0]);
  

  try {
    const { data } = await axios.post(
      `https://vote-roan.vercel.app/Admin/addCandidateExcel`,
      formData,
      { headers: { Authorization: `haneen__${token}` } }
    );
    console.log(data);
    alert("Data submitted successfully!");
  } catch (error) {
    console.error(error);
  }
};
//السوبر بده يرجع الأدمن اللي حذفه بشكل مؤقت
const restoreCan = async (id, e) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to restore this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, restore it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
      const token = localStorage.getItem("adminToken");
      const {data} = await axios.patch
      (
        `https://vote-roan.vercel.app/Admin/restore/${id}`,{},
        {
          headers: { Authorization: `haneen__${token}` },
        }
      );

      console.log(data);

      if (data.message == "Successfully deleted Candidate") {
         Swal.fire({
        title: "restored!",
        text: "Candidate has been restored.",
        icon: "success",
      });
      console.log(e.target);
        e.target.closest("tr").remove();
      }
     
  }catch (error) {
    console.log(error);
    Swal.fire({
      title:error.response.data.message,

      icon: "error",
    });

  }
  }
});
} 
//السوبر بده يمسح الأدمن بشكل كلي من قاعدة البيانات 
const deleteCanFinally = async (id, e) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          throw new Error("No token found");
        }

        console.log("Authorization Token:", token); // Log the token for debugging

        const { data } = await axios.delete(
          `https://vote-roan.vercel.app/Admin/hrddDeleted/${id}`, {
            headers: { Authorization: `haneen__${token}` },
          }
        );

        console.log(data);

        if (data.message === "Successfully deleted Candidate") {
          Swal.fire({
            title: "Deleted!",
            text: "Candidate has been deleted Finally.",
            icon: "success",
          });
          console.log(e.target);
          e.target.closest("tr").remove();
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: error.response ? error.response.data.message : "An error occurred",
          icon: "error",
        });
      }
    }
  });
};
//getData admin
const getDataC = async () => {
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    "https://vote-roan.vercel.app/Admin/getAdmin",
    { headers }
  );
  console.log(data);
  return data.Admins;
};

const displayId = async () =>{
  const data = await getDataC();
  const result = data.map((d)=>

    `
    <option value="${d._id}"> ${d.userName} </option>
    `
  ).join('');
  document.querySelector(".type-js").innerHTML +=result;
}
//log out
const btn = document.querySelector(".logout");
if(btn){
btn.addEventListener("click" ,function(){
localStorage.removeItem('adminToken');
location.href='./../auth/login.html';

});}