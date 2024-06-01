
 // Event listener for the form submit
const ForgetPass = document.querySelector(".submitPass");
if(ForgetPass){
    ForgetPass.addEventListener("submit", async function (e) {

        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `haneen__${token}` };
      e.preventDefault();
      
      const elements = e.target.elements;
      const email = elements["email"].value;
      const code = elements["code"].value;
      const password = elements["password"].value;
      try{ const { data } = await axios.patch(
        `https://vote-roan.vercel.app/auth/forgotPassword`,
        { email,password,code },
        { headers }
      );
      console.log(data);
     
      alert("The password has been successfully reset");
      location.href = "./login.html";
      return data;}
      catch(error){
        console.log(error);
      }
    });
}
 // Function to send the email
 const sendCode = async (email) => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `haneen__${token}` };
  
    const { data } = await axios.patch(
      `https://vote-roan.vercel.app/auth/sendCode`,
      { email },
      { headers }
    );
    console.log(data);
    return data;
  }; 
  // Event listener for the form submit
  const emailForm = document.querySelector(".submitEmail");
  if(emailForm){
    emailForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const elements = e.target.elements;
        const email = elements["email"].value;
        await sendCode(email);
        window.location.href = "ForgetPass.html";
      });
  }
  const getLogedUserInfo = async () => {
    try{
      const token = localStorage.getItem("adminToken");

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
  //auth
  const checkUath = async () =>{
    const token = localStorage.getItem("adminToken");
  
    if(!token){
      location.href ="./../auth/login.html";
    }
    const user = await getLogedUserInfo();
    if (user && user.length > 0) {
      const userInfo = user[0];

      // Update user name
      document.querySelector(".userName").innerText = userInfo.userName;

      // Update user image
      const userImage = document.querySelector(".userImage");
      if (userImage && userInfo.image && userInfo.image.secure_url) {
        userImage.src = userInfo.image.secure_url;
      }
    }
   
  };
  
  //add user
const addUser = document.querySelector(".submit");
if (addUser) {
    addUser.addEventListener("submit", async function (e) {
    const elements = e.target.elements;
    const token = localStorage.getItem("adminToken");
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", elements["userName"].value);
    formData.append("email", elements["email"].value);
    formData.append("password", elements["password"].value);
    formData.append("Cpassword", elements["Cpassword"].value);
    formData.append("phone", elements["phone"].value);
    formData.append("role", "User");
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
        text: "طلبك قيد المعالجة ",
        icon: "success",
        
      });

     
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