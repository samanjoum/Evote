const addContact = document.querySelector(".submitForm");
if (addContact) {
    addContact.addEventListener("submit", async function (e) {
    const elements = e.target.elements;
    const token = localStorage.getItem("adminToken");
    console.log(token);
    e.preventDefault();
    const fullName = elements["fullName"].value;
    const email = elements["email"].value;
    const phone = elements["phone"].value;
    const message = elements["message"].value;

    console.log(fullName, email, phone, message)
    try{
    const { data } = await axios.post(
      `https://vote-roan.vercel.app/contect/newcontect`,
      {fullName,email,phone,message}
      
    );

    console.log(data);
    if(data.message=='success'){
      alert("success");
    }
    else{
        alert("error");
    }
  }
  catch(error) {
    console.log(error);
  }
  });
}