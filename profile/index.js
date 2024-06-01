const token = localStorage.getItem("adminToken");
//عرض التصويتات اللي شارك فيهم 
const getpreviousvotes = async () => {
    try{
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
  const displayData = async () => {
    const data = await getpreviousvotes();  

   
    document.querySelector(".profile-username").textContent = data.userName;

    const candidateImageUrl = data.image.secure_url;
    document.querySelector(".profile-user-img").src = candidateImageUrl;
    document.querySelector(".profile-user-img").alt = "Profile picture of " + data.userName;

    if (data.voteNames && data.voteNames.length > 0) {
        const result = data.voteNames
            .map((voteName) => `<li>${voteName}</li>`)
            .join("");

        document.querySelector(".vote").innerHTML = result; 
    }
};
//عرض البوستات اللي نشرهم
const getPost = async () => {
    try{
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      `https://vote-roan.vercel.app/candidate/getCandidatePosts`,
      { headers }
    );
    console.log(data);
    return data;
    
  }
    catch(error){
        console.log(error);
    }
  };
  const displayPosts = async () => {
    try {
        const postsData = await getPost();  // استدعاء الدالة لجلب بيانات البوستات
        const postsContainer = document.querySelector('.post');  // العثور على العنصر المخصص لعرض البوستات
        
        // تفريغ المحتويات السابقة للعنصر
        postsContainer.innerHTML = '';

        // تكرار على كل بوست وإضافته إلى العنصر
        postsData.posts.forEach(post => {
            // تحقق من وجود صورة البوست
            const postImageHTML = post.image && post.image.secure_url
                ? `<img src="${post.image.secure_url}" alt="Post image" style="width: 100%; height: auto;">`
                : ''; // أو يمكنك وضع صورة بديلة هنا

            const htmlContent = `
                <div class="user-block">
                    <img class="img-circle img-bordered-sm" src="${post.candidateImage.secure_url}" alt="Profile picture of ${post.candidateName}">
                    <span class="username">${post.candidateName}</span>
                    <span class="description">${new Date(post.createdAt).toLocaleDateString()} - ${new Date(post.createdAt).toLocaleTimeString()}</span>
                </div>
                <div class="post-content">
                    <p><strong>${post.title}</strong></p>
                    <p>${post.caption}</p>
                </div>
                ${postImageHTML}
            `;
            postsContainer.innerHTML += htmlContent;  // إضافة الكود الخاص بكل بوست إلى العنصر
        
        });
    } catch (error) {
        console.log('Error loading posts:', error);
    }
};
//عرض معلوماته لحتى يعدل عليهم
const editCan = document.querySelector(".submit");
if (editCan) {
    editCan.addEventListener("submit", async function (e) {
        e.preventDefault();
        const elements = e.target.elements;
        
        console.log(token);
        const formData = new FormData();

        // إضافة الحقول إلى FormData فقط إذا كانت تحتوي على قيم
        if (elements["userName"].value) formData.append("userName", elements["userName"].value);
        if (elements["email"].value) formData.append("email", elements["email"].value);
        if (elements["address"].value) formData.append("address", elements["address"].value);
        if (elements["phone"].value) formData.append("phone", elements["phone"].value);
        if (elements["image"].files[0]) formData.append("image", elements["image"].files[0]);
        
        try {
            const headers = { Authorization: `haneen__${token}` };
            const { data } = await axios.put(
                `https://vote-roan.vercel.app/Admin/updateProfile`,
                formData,
                { headers }
            );
            console.log(data);
            if(data.message === "success"){
              Swal.fire({
                text: "Update information successfully changed.",
                icon: "success",
              });
            }
        } catch (error) {
            console.log(error);
            alert("حدث خطأ أثناء تعديل المعلومات");
        }
    });
}
  const getCandidateName = async () => {
    try{
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      `https://vote-roan.vercel.app/candidate/getcandidate`,
      { headers }
    );
    console.log(data);
    return data.Candidate;
    
  }
    catch(error){
        console.log(error);
    }
  };
  const displayCandidateName = async () => {
    const data = await getCandidateName();
  const result = data
    .map(
      (d) =>
        `<tr>
        <td>${d.userName}</td>
       
        <td class=" align-items-center justify-content-center" style="column-gap=10px">
        
            
        <a href="./postCan.html?id=${d._id}" data-toggle="tooltip" data-placement="top" title="show Post">

        <svg  width="80" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>
     </a>
        </td>
        </tr>
      
        `
    )
    .join("");
  document.querySelector(".data").innerHTML += result;



   
};
const getPostCan = async (id) => {
    const token = localStorage.getItem("adminToken");
    const { data } = await axios.get(
      `https://vote-roan.vercel.app/candidate/getCandidatePostsShow/${id}`,
      { headers: { Authorization: `haneen__${token}` } }
    );
    console.log(data);
    return data.posts; // تأكد من أن هذا هو الحقل الصحيح في البيانات المسترجعة
  };
  const showPost = async () => {
    try {
      const search = new URLSearchParams(window.location.search);
      const id = search.get("id");
      const postsData = await getPostCan(id);
  
      const userBlock = document.querySelector(".user-block");
  
      if (postsData && postsData.length > 0) {
        postsData.forEach((post) => {
          const postElement = document.createElement("div");
          postElement.classList.add("post");
          postElement.style.width = "80%";
  
          // عرض صورة المرشح
          const candidateImageElement = document.createElement("img");
          candidateImageElement.src = post.candidateImage.secure_url;
          candidateImageElement.alt = post.candidateName;
          candidateImageElement.classList.add("comment-user-image");
          postElement.appendChild(candidateImageElement);
  
          // عرض اسم المرشح
          const candidateNameElement = document.createElement("div");
          candidateNameElement.textContent = post.candidateName;
          candidateNameElement.classList.add("username");
          postElement.appendChild(candidateNameElement);
  
          // عرض العنوان
          const titleElement = document.createElement("h2");
          titleElement.textContent = post.title;
          postElement.appendChild(titleElement);
  
          // عرض الكابشن
          const captionElement = document.createElement("p");
          captionElement.textContent = post.caption;
          postElement.appendChild(captionElement);
  
          // عرض الصورة الخاصة بالبوست
          if (post.image && post.image.secure_url) {
            const postImageElement = document.createElement("img");
            postImageElement.src = post.image.secure_url;
            postImageElement.alt = post.title;
            postImageElement.classList.add("post-image");
            postImageElement.style.width = "100%";
            postImageElement.style.height = "auto";
            postElement.appendChild(postImageElement);
          }
  
          // إضافة البوست   
          userBlock.appendChild(postElement);
  
          // زر "عرض التعليقات" لكل بوست
          const commentButton = document.createElement("button");
          commentButton.textContent = "عرض التعليقات";
          commentButton.classList.add("comment-button");
          postElement.appendChild(commentButton);
  
          commentButton.addEventListener("click", () => {
            showMore(post._id);
            const nextPageURL = `./comment.html?id=${post._id}`;
            // تحويل المستخدم إلى الصفحة الثانية
            window.location.href = nextPageURL;
          });
        });
      } else {
        console.log("No posts available");
      }
    } catch (error) {
      console.log(error);
    }
  };  
  // دالة لعرض التعليقات
  const displayComments = (comments) => {
    const commentsContainer = document.querySelector(".comments-container");
    commentsContainer.innerHTML = "";
    const commentsList = document.createElement("ul");
    commentsList.classList.add("comments-list");
    comments.forEach((comment) => {
      const commentItem = document.createElement("li");
      commentItem.textContent = comment.text;
      commentsList.appendChild(commentItem);
    });
  
    commentsContainer.appendChild(commentsList);
  };
//عرض بوست واحد و في تعليقاته
const showMore = async () => {
    try {
      const search = new URLSearchParams(window.location.search);
      const id = search.get("id");
      const voteData = await getPostById(id);
      console.log(voteData);
  
      const userBlock = document.querySelector(".user-block");
  
      if (voteData.postmodel && voteData.postmodel.length > 0) {
        voteData.postmodel.forEach((post) => {
          const postElement = document.createElement("div");
          postElement.classList.add("post");
          postElement.style.width = "80%";
  
          // عرض صورة المستخدم
          if (post.userId.image && post.userId.image.secure_url) {
            const userImageElement = document.createElement("img");
            userImageElement.src = post.userId.image.secure_url;
            userImageElement.alt = post.userId.userName;
            userImageElement.classList.add("user-image");
            postElement.appendChild(userImageElement);
          }
  
          // عرض اسم المستخدم
          const userNameElement = document.createElement("div");
          userNameElement.textContent = post.userId.userName;
          userNameElement.classList.add("username");
          postElement.appendChild(userNameElement);
  
          // عرض العنوان
          const titleElement = document.createElement("h2");
          titleElement.textContent = post.title;
          postElement.appendChild(titleElement);
  
          // عرض الكابشن
          const captionElement = document.createElement("p");
          captionElement.textContent = post.caption;
          postElement.appendChild(captionElement);
  
          // عرض الصورة الخاصة بالبوست إذا وجدت
          if (post.image && post.image.secure_url) {
            const postImageElement = document.createElement("img");
            postImageElement.src = post.image.secure_url;
            postImageElement.alt = post.title;
            postImageElement.classList.add("post-image");
            postImageElement.style.width = "100%";
            postImageElement.style.height = "auto";
            postElement.appendChild(postImageElement);
          }
  
          // عرض التعليقات
          if (post.comment && post.comment.length > 0) {
            const commentsContainer = document.createElement("div");
            commentsContainer.classList.add("comments-container");
            post.comment.forEach((comment) => {
              const commentItem = document.createElement("div");
              commentItem.classList.add("comment-item");
  
              // عرض صورة المستخدم الذي علق إذا وجدت
              if (comment.userId.image && comment.userId.image.secure_url) {
                const userImageComment = document.createElement("img");
                userImageComment.src = comment.userId.image.secure_url;
                userImageComment.alt = comment.userId.userName;
                userImageComment.classList.add("comment-user-image");
                commentItem.appendChild(userImageComment);
              }
  
              // عرض اسم صاحب التعليق
              const userName = document.createElement("span");
              userName.textContent = comment.userId.userName;
              userName.classList.add("comment-user-name");
              commentItem.appendChild(userName);
  
              // عرض نص التعليق
              const commentText = document.createElement("p");
              commentText.textContent = comment.text;
              commentItem.appendChild(commentText);
  
              // إضافة التعليق إلى قائمة التعليقات
              commentsContainer.appendChild(commentItem);
            });
            postElement.appendChild(commentsContainer);
          } else {
            const noCommentsElement = document.createElement("p");
            noCommentsElement.textContent = "لا توجد تعليقات.";
            postElement.appendChild(noCommentsElement);
          }
  
          // إضافة البوست إلى عنصر المستخدم
          userBlock.appendChild(postElement);
        });
      } else {
        console.log("No posts available");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  //برجع بوست حسب ال id
  const getPostById = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(
        `https://vote-roan.vercel.app/Post/geSpecifictPost/${id}`,
        { headers: { Authorization: `haneen__${token}` } }
      );
      
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  //add a comment
const commentButton = document.getElementById("commentButton");
if (commentButton) {
  commentButton.addEventListener("click", async function () {
    const token = localStorage.getItem("adminToken");
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value.trim();

    if (commentText === '') {
      alert('يرجى إدخال نص للتعليق.');
      return;
    }

    try {
      const search = new URLSearchParams(window.location.search);
      const id = search.get("id");
      const voteData = await getPostById(id);

      const headers = { Authorization: `haneen__${token}` };
      const formData = new FormData();
      formData.append("text", commentText);

      const { data } = await axios.post(
        `https://vote-roan.vercel.app/Post/${id}/comment`,
        formData,
        { headers }
      );
      console.log(data);

      // عرض التعليق الجديد
      const commentsList = document.querySelector(".comments-list");
      if (commentsList) {
        const newCommentItem = document.createElement("li");

        // عرض نص التعليق الجديد
        const commentTextElement = document.createElement("span");
        commentTextElement.textContent = data.comment.text;
        newCommentItem.appendChild(commentTextElement);

        newCommentItem.classList.add("comment-item");
        commentsList.appendChild(newCommentItem);
      }

      alert("تم إضافة التعليق بنجاح");

      commentInput.value = '';

    } catch (error) {
      console.error(error);
      alert("حدثت مشكلة في إضافة التعليق");
    }
  });
}
const getAdmin = async () => {
    try{
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      `https://vote-roan.vercel.app/Admin/getinformation`,
      { headers }
    );
    console.log(data);
    return data.getinformation;
    
  }
    catch(error){
        console.log(error);
    }
  };
  const displayDataAdmin = async () => {
    const data = await getAdmin();  

    if (data.length > 0) {
        document.querySelector(".profile-username").innerHTML = data[0].userName;
        
        if (data[0].image && data[0].image.secure_url) {
            const candidateImageUrl = data[0].image.secure_url;
            document.querySelector(".profile-user-img").src = candidateImageUrl;
            document.querySelector(".profile-user-img").alt = "Profile picture of " + data[0].userName;
        }

        
    }
};
const getVoteAdmin = async () => {
    try {
        const headers = { Authorization: `haneen__${token}` };
        const { data } = await axios.get(
            `https://vote-roan.vercel.app/vote/getvotesadmin`,
            { headers }
        );
        console.log(data);

        if (data.votes && data.votes.length > 0) {
            const result = data.votes
                .map((vote) => `<li>${vote.voteName}</li>`)
                .join("");

            document.querySelector(".vote").innerHTML = result;
        }

    } catch (error) {
        console.log(error);
    }
};
const getVoteUser = async () => {
    try {
        const headers = { Authorization: `haneen__${token}` };
        const { data } = await axios.get(
            `https://vote-roan.vercel.app/vote/getUserinVote`,
            { headers }
        );
        console.log(data);

        if (data.subvotes && data.subvotes.length > 0) {
            const result = data.subvotes
                .map((vote) => `<li>${vote.voteName}</li>`)
                .join("");

            document.querySelector(".vote").innerHTML = result;
        }

    } catch (error) {
        console.log(error);
    }
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
 // Event listener for the form submit
 const UpdatePass = document.querySelector(".submitPass");
 if(UpdatePass){
    UpdatePass.addEventListener("submit", async function (e) {
 
         const token = localStorage.getItem("adminToken");
         const headers = { Authorization: `haneen__${token}` };
       e.preventDefault();
       
       const elements = e.target.elements;
       const oldPassword = elements["oldPassword"].value;
       const newPassword = elements["newPassword"].value;
       const Cpassword = elements["Cpassword"].value;
       try{ const { data } = await axios.patch(
         `https://vote-roan.vercel.app/Admin/updatPassword`,
         { oldPassword,newPassword,Cpassword },
         { headers }
       );
       console.log(data);
       if(data.message == "Password successfully changed"){
        Swal.fire({
          text: "Password successfully changed.",
          icon: "success",
        });
       }
       return data;}
       catch(error){
         console.log(error);
       }
     });
 }
 //log out
 const btn = document.querySelector(".logout");
 if (btn) {
     btn.addEventListener("click", function(event) {
         event.preventDefault(); // Prevent the default link behavior
         localStorage.removeItem('adminToken');
         location.href = './../auth/login.html';
     });
 }
 