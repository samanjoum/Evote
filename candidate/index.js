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
      "https://vote-roan.vercel.app/candidate/getcandidate",
      { headers }
    );
    return data.Candidate;
  };

  const displayData = async () => {
    const data = await getData();
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
        <svg width="20" height="20" onclick="deleteCandidate('${d._id}',event)" 
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 
         by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons,
          Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448
           383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24
            24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
            <a href="./edit.html?id=${d._id}">
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
      }
    } finally {
      document.querySelector(".overlay").classList.toggle("d-none");
    }
  };
}
//add candidate
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
      alert("تم أنشاء حساب لهذا المرشح بنجاح و أضافته")
    }catch(error){
      console.log(error);
      alert("حدثت مشكلة في اضافة هذا المرشح");
    }
   
  });
}
//edit candidate          
const editCandidate = async () => {
  const search = new URLSearchParams(window.location.search);
  const id = search.get("id");

  const data = await getCandidate(id);
  

  document.getElementsByName("userName")[0].value = data.userName;
  document.getElementsByName("email")[0].value = data.email;
  document.getElementsByName("password")[0].value = data.password;
  document.getElementsByName("Cpassword")[0].value = data.Cpassword;
  document.getElementsByName("phone")[0].value = data.phone;
  document.getElementsByName("cardnumber")[0].value = data.cardnumber;
  document.getElementsByName("address")[0].value = data.address;
  document.getElementsByName("gender")[0].value = data.gender;
  document.getElementsByName("image")[0].value = data.image;

};

const getCandidate = async (id) => {
    const token = localStorage.getItem("adminToken");
  
    const { data } = await axios.post(
      `https://vote-roan.vercel.app/candidate/CandidateIDvalid/${id}`,{},{
        headers: { Authorization: `haneen__${token}` }
      }
    );
    
    return data.candidate;
  };
  
  //update candidate
 const updateCandodate = async (e) => {
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
  
        
        const headers = { Authorization: `haneen__${token}` };
        const { data } = await axios.put(
          `https://vote-roan.vercel.app/Admin/updateCandidate/${id}`,
          formData,
          { headers }
        );
      });
    }
  };

  //Delete candidate
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
    
  
        if (data.message == "success") {
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
  
  return data.voteNames;
};
//بضيف كل اسماء التصويتات على ال select
const addNameVote = async () => {
  const data = await getVoteName();
  const options = data.map((d) => `<option>${d}</option>`);
  const result = options.join("");
  document.querySelector(".createPost").innerHTML += result;
};
// بنشأ الطلب
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
