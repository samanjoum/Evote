const runDataTable = () => {
  $("#adminTable").DataTable().destroy();

  $(function () {
    $("#adminTable").DataTable({
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
const token = localStorage.getItem("adminToken");
//getData admin
const getData = async () => {
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    "https://vote-roan.vercel.app/Admin/getAdmin",
    { headers }
  );
  return data.Admins;
};
//Display Data Admin
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
        <svg width="20" height="20" onclick="deleteAdmin('${d._id}',event)" 
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
//login admin
const loginForm = document.querySelector(".loginForm");
if (loginForm) {
  loginForm.onsubmit = async function (e) {
    const elements = e.target.elements;
    e.preventDefault();
    document.querySelector(".overlay").classList.toggle("d-none");
    const email = elements["email"].value;
    const password = elements["password"].value;

    console.log(email,password);
    
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
//add admin
const addAdmin = document.querySelector(".submit");
if (addAdmin) {
  addAdmin.addEventListener("submit", async function (e) {
    const elements = e.target.elements;
    const token = localStorage.getItem("adminToken");
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", elements["userName"].value);
    formData.append("email", elements["email"].value);
    formData.append("password", elements["password"].value);
    formData.append("Cpassword", elements["Cpassword"].value);
    formData.append("phone", elements["phone"].value);
    formData.append("role", "Admin");
    formData.append("address", elements["address"].value);
    formData.append("cardnumber", elements["cardnumber"].value);
    formData.append("gender", elements["gender"].value);
    formData.append("image", elements["image"].files[0]);
    try{
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.post(
      `https://vote-roan.vercel.app/auth/signup`,
      formData,
      { headers }
    );

    if(data.message=='success'){
      Swal.fire({
        text: "Admin added seccesfully .",
        icon: "success",
      });
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input=> input.value='');
  const radios = document.querySelectorAll('[type="radio"]');
      radios.forEach(input=> input.checked=false)
 
    }
  }
  catch(error) {
    let errorArray = error.response.data.validationError;
    if (errorArray) {
      let listItem = "";
      for (let i = 0; i < Math.min(errorArray.length, 10); i++) {
        const errorMessage = errorArray[i].message;
        listItem += "<li>" + errorMessage + "</li>";
      }
  
      document.querySelector(".err").classList.remove('d-none');
      document.querySelector(".err").innerHTML += listItem;
    }
  }
  
  });

}
//edit admin
const editAdmin = async () => {
  const search = new URLSearchParams(window.location.search);
  const id = search.get("id");

  const data = await getAdmin(id);
  console.log(data);

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

const getAdmin = async (id) => {
  const token = localStorage.getItem("adminToken");

  const { data } = await axios.get(
    `https://vote-roan.vercel.app/Admin/getAdmin/${id}`,{
      headers: { Authorization: `haneen__${token}` }
    }
  );

  return data.Admin;
};
//update admin
const updateAdmin = async (e) => {
  const addAdmin = document.querySelector(".submit");
  if (addAdmin) {
    addAdmin.addEventListener("submit", async function (e) {
      const elements = e.target.elements;
      const token = localStorage.getItem("adminToken");
      e.preventDefault();
      const formData = new FormData();
      formData.append("userName", elements["userName"].value);
      formData.append("email", elements["email"].value);
      formData.append("password", elements["password"].value);
      formData.append("Cpassword", elements["Cpassword"].value);
      formData.append("phone", elements["phone"].value);
      formData.append("role", "Admin");
      formData.append("address", elements["address"].value);
      formData.append("cardnumber", elements["cardnumber"].value);
      formData.append("gender", elements["gender"].value);
      formData.append("image", elements["image"].files[0]);

      const headers = { Authorization: `haneen__${token}` };
      const { data } = await axios.put(
        `https://vote-roan.vercel.app/Admin/65e31782f1b5b2365aa6d878/${id}`,
        formData,
        { headers }
      );
    });
  }
};
//Delete Admin
const deleteAdmin = async (id, e) => {

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
//عرض الطلبات المعلقة من قبل المرشح لتقديم طلبات الانسحاب
const getRequest = async () => {
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    `https://vote-roan.vercel.app/Admin/withdrawal`,
    { headers }
  );
  console.log(data);
  return data;
};
const displayRequest = async () => {
  const data = await getRequest();
  const result = data.withdrawals
    .map(
      (d) =>
        `<tr>
          <td>${d.candidateId.userName}</td>
          <td>${d.voteId.voteName}</td>
          <td>${d.status}</td>
          <td class=" align-items-center justify-content-center" style="column-gap=10px">
       
          <svg width="50" height="20"  onclick="updateStatus('${d._id}', event)" 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>

              
    
          </td>
          
        </tr>`
    )
    .join("");
  document.querySelector(".data").innerHTML += result;
};
//قبول طلب المرشح الخاص بالانسحاب
const updateStatus = async (candidateId, e) => {
  try {
    e.preventDefault(); 
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `haneen__${token}` };

    const status = { status: "Approved" }; // تحديث الحالة إلى "Approved"
    console.log(status);
    const { data } = await axios.patch(
      `https://vote-roan.vercel.app/Admin/withdrawal-request/${candidateId}`,
      status,
      { headers }
    );
    console.log(data);
    console.log("User status updated successfully:", data);
  } catch (error) {
    console.log("Error updating user status:", error);
  }
};
//log out
const btn = document.querySelector(".logout");
btn.addEventListener("click" ,function(){
localStorage.removeItem('adminToken');
location.href='./../auth/index.html';

});
//excel
const CreateExcel = document.querySelector(".createExcel");
if (CreateExcel) {
  CreateExcel.addEventListener("submit", function(e) {
    e.preventDefault();
    createWithExcel(e);
  });
}

const createWithExcel = async (e) => {
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
    alert("Data submitted successfully!");
  } catch (error) {
    console.error(error);
  }
};
