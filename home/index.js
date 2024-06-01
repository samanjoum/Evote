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
//log out
const btn = document.querySelector(".logout");
if(btn){
btn.addEventListener("click" ,function(){
localStorage.removeItem('adminToken');
location.href='./../auth/login.html';

});}