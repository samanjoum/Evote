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

//Get Vote
const getData = async () => {
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `haneen__${token}` };
  const { data } = await axios.get(
    "https://vote-roan.vercel.app/vote/getvotes",
    { headers }
  );
  console.log(data);
  return data.votes;
};
//Display Vote
const displayData = async () => {
  const data = await getData();
  const result = data
    .map(
      (d) =>
        `<tr>
          <td>${d.voteName}</td>
          <td>${d.VotingStatus}</td>
          <td>${d.description}</td>
          <td>${d.StartDateVote}</td>
          <td>${d.EndDateVote}</td>    
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
          </td>
          </tr>
          
          `
    )
    .join("");

  document.querySelector(".data").innerHTML += result;
  runDataTable();
};
//Create Vote
const addVote = document.querySelector(".submit");
if (addVote) {
  addVote.addEventListener("submit", async function (e) {
    e.preventDefault();
    const elements = e.target.elements;
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("voteName", elements["voteName"].value);
    formData.append("VotingStatus", elements["VotingStatus"].value);
    formData.append("description", elements["description"].value);
    formData.append("StartDateVote", elements["StartDateVote"].value);
    formData.append("EndDateVote", elements["EndDateVote"].value);
    formData.append("image", elements["image"].files[0]);

    try {
      const headers = { Authorization: `haneen__${token}` };
      const { data } = await axios.post(
        `https://vote-roan.vercel.app/vote/createVote`,
        formData,
        { headers }
      );
      if (data.message == "success") {
        alert("تم اضافة هذا التصويت بنجاح");
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
           alert("تم اضافة هذا المرشح بنجاح");
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
           alert("تم حذف هذا المرشح بنجاح");
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
       
        alert("تم تحديث حالة التصويت بنجاح");      }
        
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
//log out
const btn = document.querySelector(".logout");
btn.addEventListener("click" ,function(){
localStorage.removeItem('adminToken');
location.href='./../auth/index.html';

});

