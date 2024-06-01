const runDataTable = () => {
  $("#voteTable").DataTable().destroy();

  $(function () {
    $("#voteTable").DataTable({
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
//تصويتات خاصة بالأدمن و بقدر يضيف و يحذف عليها 
const displayVote = async () =>{
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    `https://vote-roan.vercel.app/vote/getvotesadmin`,
    { headers }
  );
  console.log(data);
  return data.votes;
}
//Display Vote
const displayData = async () => {
  const data = await displayVote();
  const result = data
    .map(
      (d) =>
        `<tr>
          <td>${d.voteName}</td> 
          <td class=" align-items-center justify-content-center" style="column-gap=10px">
          
          <a href="./addCandidateToVote.html?id=${d._id}" data-toggle="tooltip" data-placement="top" title="add Candidate To Vote">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
          </svg>
        </a>
        <a href="./removeCandidateFromVote.html?id=${d._id}" data-toggle="tooltip" data-placement="top" title="remove Candidate From Vote">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
        </a>
        
        <a href="./PostCandidate.html?id=${d._id}" data-toggle="tooltip" data-placement="top" title="Post Candidate">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H176zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z"/></svg>
        </a>
      
        
      
           <a href="./updateVoteStatuse.html?id=${d._id}" data-toggle="tooltip" data-placement="top" title="update Vote Statuse">
           <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
           </a>

           <a href="./addUserToVote.html?id=${d._id}" data-toggle="tooltip" data-placement="top" title="add User To Vote">
           <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
        </a>
          </td>
          </tr>
          
          `
    )
    .join("");

  document.querySelector(".data").innerHTML += result;
  runDataTable();
};
//تصويتات الكل يشوفها 
const getVote = async () =>{
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    `https://vote-roan.vercel.app/vote/getvotes`,
    { headers }
  );
  console.log(data);
  return data.votes;
}
const displayDataEveryOne = async () => {
  const data = await getVote();
  const result = data
    .map(
      (d) =>
        `<tr>
          <td>${d.voteName}</td> 
          <td>${d.VotingStatus}</td>
          <td>${d.description}</td>
          <td>${d.StartDateVote}</td>
          <td>${d.EndDateVote}</td>

    
          </tr>
          
          `
    )
    .join("");

  document.querySelector(".data").innerHTML += result;
  runDataTable();
};
//getData admin
const getData = async () => {
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
  const data = await getData();
  const result = data.map((d)=>

    `
    <option value="${d._id}"> ${d.userName} </option>
    `
  ).join('');
  document.querySelector(".type-js").innerHTML +=result;
}

//Create Vote
const addVote = document.querySelector(".submit");
if (addVote) {
  
  addVote.addEventListener("submit", async function (e) {
    e.preventDefault();
    const elements = e.target.elements;
    const token = localStorage.getItem("adminToken");
    
    console.log(token);
    const formData = new FormData();
    formData.append("voteName", elements["voteName"].value);
    formData.append("VotingStatus", elements["VotingStatus"].value);
    formData.append("description", elements["description"].value);
    formData.append("StartDateVote", elements["StartDateVote"].value);
    formData.append("EndDateVote", elements["EndDateVote"].value);
    formData.append("AdminID", elements["AdminID"].value);
    formData.append("image", elements["image"].files[0]);

    try {
      const headers = { Authorization: `haneen__${token}` };
      const { data } = await axios.post(
        `https://vote-roan.vercel.app/vote/createVote`,
        formData,
        { headers }
      );
      console.log(data);
      if (data.message == "success") {
        Swal.fire({
          text: "vote added seccesfully .",
          icon: "success",
        });
        location.href ="./index.html";
      }
    } catch (error) {
      console.log(error);
     
    }
  });
}
//برجع المرشحين الأكتيف
const getCandidate = async () => {
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    "https://vote-roan.vercel.app/candidate/getcandidate",
    { headers }
  );
  return data.Candidate;
};
//بختار اسم المرشح اللي بده يضيفه على التصويت من القائمة  
const addCanToVote = async () => {
  try {
    const search = new URLSearchParams(window.location.search);
    const voteId = search.get("id");

    if (!voteId) {
      console.error("لم يتم توفير id التصويت في عنوان الصفحة.");
      return;
    }

    const voteData = await getPost(voteId);

    if (!voteData.subvote ) {
      console.error("لا يوجد بيانات تصويت صالحة.");
      return;
    }
    console.log(voteData.subvote);
    const voteName = voteData.subvote.voteName;
        document.querySelector(".nameVote").innerHTML += voteName;

    const data = await getCandidate();
    const options = data.map((candidate) => `<option value=${candidate.userName}>${candidate.userName}</option>`);
    const result = options.join("");
    document.querySelector(".addCandidateName").innerHTML += result;

    const addCan = document.querySelector(".submitCanToVote");
    if (addCan) {
      addCan.onsubmit = async function (e) {
        const elements = e.target.elements;
        const token = localStorage.getItem("adminToken");
        e.preventDefault();
        const userName = elements["userName"].value;
        console.log(userName);
        console.log(voteName);

        try {
          const headers = { Authorization: `haneen__${token}` };
          const { data } = await axios.post(
            `https://vote-roan.vercel.app/vote/addcandidatetovote`,
            { voteName, userName },
            { headers }
          );
           console.log(data);
           if(data.message == "Candidate added to vote successfully"){
            Swal.fire({
              text: "Candidate added seccesfully to the Vote .",
              icon: "success",
            });
           }
        } catch (error) {
          console.log(error);
          alert("حدث خطأ أثناء أضافة هذا المرشح");
        }
      };
    }
  } catch (error) {
    console.error(error.message);
   
  }
};
//تسليم اسم المرشح و اسم التصويت و ارسالهم للانسحاب
const removeCan = async () => {
  try {
    const search = new URLSearchParams(window.location.search);
    const voteId = search.get("id");

    if (!voteId) {
      console.error("لم يتم توفير id التصويت في عنوان الصفحة.");
      return;
    }

    const voteData = await getPost(voteId);

    if (!voteData.subvote ) {
      console.error("لا يوجد بيانات تصويت صالحة.");
      return;
    }
    console.log(voteData.subvote);
    const voteName = voteData.subvote.voteName;
        document.querySelector(".nameVote").innerHTML += voteName;

    const data = await getCandidate();
    const options = data.map((candidate) => `<option value=${candidate.userName}>${candidate.userName}</option>`);
    const result = options.join("");
    document.querySelector(".removeCandidateName").innerHTML += result;

    const addCan = document.querySelector(".submitRemove");
    if (addCan) {
      addCan.onsubmit = async function (e) {
        const elements = e.target.elements;
        const token = localStorage.getItem("adminToken");
        e.preventDefault();
        const userName = elements["userName"].value;
        console.log(userName);
        console.log(voteName);

        try {
          const headers = { Authorization: `haneen__${token}` };
          const { data } = await axios.patch(
            `https://vote-roan.vercel.app/vote/removeCandidateFromVote`,
            { voteName, userName },
            { headers }
          );
           console.log(data);
           if(data.message == "Candidate removed from vote successfully"){
            Swal.fire({
              text: "Candidate removed seccesfully to the Vote .",
              icon: "success",
            });
           }
        } catch (error) {
          console.log(error);
          alert("حدث خطأ أثناء حذف هذا المرشح");
        }
      };
    }
  } catch (error) {
    console.error(error.message);
   
  }
};
//نشر قوائم المرشحين المشاركين بتصويت معين 
const postCan = async () => {
  try {
    const search = new URLSearchParams(window.location.search);
    const id = search.get("id");
    const data  = await getPost(id);

    // فحص البيانات التي تعود ككائن في subvote
    if (data.subvote && data.subvote.candidates && data.subvote.candidates.length > 0) {
      const candidates = data.subvote.candidates;

      const userList = candidates.map(candidate => `<tr><td>${candidate.userName}</td></tr>`).join('');

      document.querySelector(".data").innerHTML = userList;  // استخدم = بدلاً من += لتجنب تكرار البيانات عند تحديث الصفحة
    } else {
      console.log("لا يوجد مرشحين مسجلين");
      document.querySelector(".data").innerHTML = "<tr><td>No candidates registered</td></tr>"; // إظهار رسالة عند عدم وجود مرشحين
    }
  } catch (error) {
    console.error("حدث خطأ أثناء عرض المرشحين:", error.message);
  }
};
const getPost = async (id) => {
  const token = localStorage.getItem("adminToken");
  const { data } = await axios.get(
    `https://vote-roan.vercel.app/vote/${id}`,
    { headers: { Authorization: `haneen__${token}` } }
  );
  console.log(data);
 return data;
};
 //تحديث حالة التصويت لجعلها Active أو Inactive
const updateStatus = async (id) => {
  const form = document.querySelector(".submit");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const token = localStorage.getItem("adminToken");
      const selectedOption = formData.get("VotingStatus"); 

      const headers = { Authorization: `haneen__${token}` };
      const data = { VotingStatus: selectedOption };

      try {
        const response = await axios.patch(
          `https://vote-roan.vercel.app/vote/updateVotingStatus/${id}`,
          data,
          { headers }
        );
       console.log(response);
        if(response.data.message == "Voting has been successfully deactivated"){
          Swal.fire({
            text: "update Status seccesfully .",
            icon: "success",
          });
         }
             }
        
        catch (error) {
        alert("حدث خطأ أثناء تحديث حالة التصويت");      }
    });
  }
};
const editStatuse = async () => {
  const search = new URLSearchParams(window.location.search);
  const id = search.get("id");

  const data = await getPost(id);
  console.log(data);
  updateStatus(id);
}; 
  //results 
  const getResult = async () => {
    const token = localStorage.getItem("adminToken");
  
    const { data } = await axios.get(
      `https://vote-roan.vercel.app/vote/Result`,{
        headers: { Authorization: `haneen__${token}` }
      }
    );
    console.log(data);
    return data.results;
  }; 
const displayResult = async () => {
  try {
    const data = await getResult(); // افترض أن هذا يجلب البيانات من الخادم

    if (!data || data.length === 0) {
      console.log("No results found.");
      document.querySelector(".data").innerHTML += "No data available";
      return;
    }

    // إنشاء HTML لعرض النتائج
    const resultHtml = data.map(result => {
      return `<tr>
        <td>${result.candidateName}</td>
        <td>${result.voteName}</td>
        <td>${result.voteCount}</td>
      </tr>`;
    }).join("");

    document.querySelector(".data").innerHTML += resultHtml;
    runDataTable(); // 
  } catch (error) {
    console.error("Error displaying results:", error);
    document.querySelector(".data").innerHTML += `<tr><td colspan="2">Error loading data</td></tr>`;
  }
};
//بخلي المستخدم يشوف التصويتات اللي شارك فيها
const getpreviousvotes = async () => {
  try{
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    `https://vote-roan.vercel.app/vote/user-votes`,
    { headers }
  );
  console.log(data);
  return data.votes;
  
}
  catch(error){
      console.log(error);
  }
};
const displayDataPreVote = async () => {
  const data = await getpreviousvotes();
  const uniqueUserNames = [...new Set(data.map(d => d.userName))]; // استخراج الأسماء الفريدة
  
  const result = uniqueUserNames
    .map(userName => {
      const voteNames = data.filter(d => d.userName === userName).map(d => d.voteName).join('<pre ><br></pre>  '); // جمع أسماء التصويتات لكل مستخدم بتقديم كل اسم على سطر جديد
      return `<tr>
                <td>${userName}</td>
                <td>${voteNames}</td>
              </tr>`;
    })
    .join("");

  document.querySelector(".data").innerHTML += result;
  runDataTable();
};
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
const CreateExcel = document.querySelector(".createExcelCan");
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
      `https://vote-roan.vercel.app/vote/uploadExcelCandidateToVote`,
      formData,
      { headers: { Authorization: `haneen__${token}` } }
    );
    console.log(data);
    if(data.message == "Candidates processed successfully"){
      Swal.fire({
        text: "Candidate added seccesfully to the Vote .",
        icon: "success",
      });
     }
  } catch (error) {
    console.error(error);
  }
};
//برجع المستخدمين الأكتيف
const getUser = async () => {
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    "https://vote-roan.vercel.app/Admin/getUsersActive",
    { headers }
  );
  console.log(data);
  return data.Users;
};
//بختار اسم المستخدم اللي بده يضيفه على التصويت من القائمة  
const addUserToVote = async () => {
  try {
    const search = new URLSearchParams(window.location.search);
    const voteId = search.get("id");

    if (!voteId) {
      console.error("لم يتم توفير id التصويت في عنوان الصفحة.");
      return;
    }

    const voteData = await getPost(voteId);

    if (!voteData.subvote ) {
      console.error("لا يوجد بيانات تصويت صالحة.");
      return;
    }
    console.log(voteData.subvote);
    const voteName = voteData.subvote.voteName;
        document.querySelector(".nameVote").innerHTML += voteName;

    const data = await getUser();
    const options = data.map((candidate) => `<option value=${candidate.userName}>${candidate.userName}</option>`);
    const result = options.join("");
    document.querySelector(".addCandidateName").innerHTML += result;

    const addCan = document.querySelector(".submitCanToVote");
    if (addCan) {
      addCan.onsubmit = async function (e) {
        const elements = e.target.elements;
        const token = localStorage.getItem("adminToken");
        e.preventDefault();
        const userName = elements["userName"].value;
        console.log(userName);
        console.log(voteName);

        try {
          const headers = { Authorization: `haneen__${token}` };
          const { data } = await axios.post(
            `https://vote-roan.vercel.app/vote/addExistingUserToVote`,
            { voteName, userName },
            { headers }
          );
           console.log(data);
           if(data.message == "User added to vote successfully"){
            Swal.fire({
              text: "User added to vote successfully.",
              icon: "success",
            });

           }
        } catch (error) {
          console.log(error);
          alert("حدث خطأ أثناء أضافة هذا المستخدم");
        }
      };
    }
  } catch (error) {
    console.error(error.message);
   
  }
};
const CreateExcelUser = document.querySelector(".createExcelUser");
if (CreateExcelUser) {
  CreateExcelUser.addEventListener("submit", function(e) {
    e.preventDefault();
    createWithExcelUser(e);
  });
}
const createWithExcelUser = async (e) => {
  const token = localStorage.getItem("adminToken");
  const elements = e.target.elements;
 
  const formData = new FormData();  
  formData.append("file", elements["file"].files[0]);
  

  try {
    const { data } = await axios.post(
      `https://vote-roan.vercel.app/vote/uploadExcelUserToVote`,
      formData,
      { headers: { Authorization: `haneen__${token}` } }
    );
    console.log(data);
    if(data.message == "User processed successfully"){
      Swal.fire({
        text: "User added seccesfully to the Vote .",
        icon: "success",
      });
     }
  } catch (error) {
    console.error(error);
  }
};
//log out
const btn = document.querySelector(".logout");
if(btn){
btn.addEventListener("click" ,function(){
localStorage.removeItem('adminToken');
location.href='./../auth/login.html';

});}