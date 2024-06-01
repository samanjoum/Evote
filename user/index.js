const runDataTable = () => {
    $("#userTable").DataTable().destroy();
  
    $(function () {
      $("#userTable").DataTable({
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
//login user
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
      
        document.querySelector('.errorr').innerHTML+="Email or Password is not correct";
      }
    } finally {
      document.querySelector(".overlay").classList.toggle("d-none");
    }
  };
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
//getData user
const getData = async () => {
    try{
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      "https://vote-roan.vercel.app/Admin/getallUsers",
      { headers }
    );
    console.log(data);
    return data.Users;
    
}
    catch(error){
        console.log(error);
    }
  };
//Display Data user
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
       
          <svg style="cursor:pointer"  width="50" height="20"  onclick="updateStatus('${d._id}', '${d.statuse}', event)" 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>

              
    
          </td>
          </tr>
        
          `
      )
      .join("");
    document.querySelector(".data").innerHTML += result;
    runDataTable();
  
  
  };
//تحديث حالة المستخدم من اكتيف الا انكتيف و العكس
  const updateStatus = async (userId, newStatus ,e) => {
    try {
        
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `haneen__${token}` };

        const body = { statuse: newStatus };
        console.log(body);
        const { data } = await axios.patch(
            `https://vote-roan.vercel.app/Admin/UpdateStatuseUser/${userId}`,
            body,
            { headers }
        );
        if(data.message == "success"){
          location.href="./index.html";
        }
        console.log(data);
        console.log("User status updated successfully:", data);
    } catch (error) {
        console.log("Error updating user status:", error);
    }
};
//بجيب كل أسماءالتصويتات اللي حالتها active فقط
const getAllVotes = async () => {
    const token = localStorage.getItem("adminToken");
    console.log(token);
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      "https://vote-roan.vercel.app/vote/getUserinVote",
      { headers }
    );
    console.log(data);
    return data.subvotes;
};
  const displayAciveVote = async () => {
    const data = await getAllVotes();
    console.log(data);
    const result = data
      .map(
        (d) =>
          `<tr>
              <td>${d.voteName}</td>
              <td>${d.description}</td>    
              <td class=" align-items-center justify-content-center" style="column-gap=10px">
              <a href="./postCan.html?id=${d._id}" data-toggle="tooltip" data-placement="top" title="Post Candidate">
              <svg width="50" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H176zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z"/></svg>
              </a>
              </td>
              </tr>
              
              `
      )
      .join("");
  
    document.querySelector(".data").innerHTML += result;
    runDataTable();
};
  const postCan = async () => {
    try {
      const search = new URLSearchParams(window.location.search);
      const id = search.get("id");
      const data = await getPost(id);
  
      // تحقق من وجود بيانات subvote وcandidates
      if (data.subvote && data.subvote.candidates && data.subvote.candidates.length > 0) {
        const subvote = data.subvote;
        const candidates = subvote.candidates;
  
        // تعيين اسم التصويت
        document.querySelector(".nameVote").innerHTML += subvote.voteName || "No vote name available";
  
        // إعداد خيارات المرشحين للـ <select>
        const options = candidates.map(candidate => `<option value="${candidate._id}">${candidate.userName}</option>`).join("");
        document.querySelector(".addCandidateName").innerHTML += options;
      } else {
        console.log("لا يوجد مرشحين مسجلين");
        document.querySelector(".addCandidateName").innerHTML += "<option>No candidates available</option>";
      }
    } catch (error) {
      console.error("حدث خطأ أثناء عرض المرشحين:", error.message);
    }
};
  //بجيب تصويت حسب ال id
  const getPost = async (id) => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      `https://vote-roan.vercel.app/vote/${id}`,
      { headers }
    );
    console.log(data);
    return data;
};
  //بجيب مرشح حسب ال id
  const getCandidate = async (id) => {
    const token = localStorage.getItem("adminToken");
  
    const { data } = await axios.get(
      `https://vote-roan.vercel.app/candidate/CandidateIDvalid/${id}`,{
        headers: { Authorization: `haneen__${token}` }
      }
    );
    console.log(data)
    return data;
};  
//للانتخاب
  document.querySelector(".submitCanToVote").addEventListener('submit', async (e) => {
    e.preventDefault(); 

      try {
        const search = new URLSearchParams(window.location.search);
      const voteId = search.get("id");
      const candidateId = $(".addCandidateName").val();
        console.log(candidateId);
          if (!voteId || !candidateId) {
              console.error("Vote or candidate data is missing.");
              alert("بيانات التصويت أو المرشح مفقودة.");
              return;
          }
  
          const token = localStorage.getItem("adminToken");
          const headers = { Authorization: `haneen__${token}` };
          const {data} = await axios.patch(
              `https://vote-roan.vercel.app/vote/${voteId}/${candidateId}/join`,
              {},
              { headers }
          );
  
          console.log("Success:",data);
          alert("تم اختيار هذا المرشح للتصويت بنجاح");
      } catch (error) {
          console.error("Error joining candidate to vote:", error);
          alert("لا يمكنك اختيار أكثر من مرشح لهذا التصويت");
      }

  
   
});
//log out
const btn = document.querySelector(".logout");
btn.addEventListener("click" ,function(){
localStorage.removeItem('adminToken');
location.href='./../auth/index.html';

});
