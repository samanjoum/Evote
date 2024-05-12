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
        const token = localStorage.getItem("adminToken");
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
            alert("تم تعديل معلوماتك بنجاح");
        } catch (error) {
            console.log(error);
            alert("حدث خطأ أثناء تعديل المعلومات");
        }
    });
}
