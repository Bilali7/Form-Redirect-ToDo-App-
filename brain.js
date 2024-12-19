let formData = [];

let signup = document.getElementById ("signup"); 
let userName = document.getElementById ("firstname");
let userEmail = document.getElementById ("emails");
let userPassword = document.getElementById ("password");
let userConfirmPassword = document.getElementById ("confirm");
let login = document.getElementById ("login");
let emaillogin = document.getElementById ("loginemail");
let passwordlogin = document.getElementById ("loginpassword");
let signupContainer = document.getElementById ("signupForm");
let loginContainer = document.getElementById ("login");

document.getElementById ("showsignup").addEventListener ("click", function (event) {
    event.preventDefault ();
    signupContainer.style.display = "flex";
    loginContainer.style.display = "none";
});
    
document.getElementById ("showlogin").addEventListener ("click", function (event) {
    event.preventDefault ();
    signupContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

function isValidPassword (password) {
    let passwordSyntax = /^.{3}$/;
    return passwordSyntax.test (password);
}

signup.addEventListener ("submit", function (event) {
    event.preventDefault();
let names = userName.value.trim();
let email = userEmail.value.trim();
let password = userPassword.value.trim();
let confirmPassword = userConfirmPassword.value.trim();

if (!names || !email || !password || !confirmPassword) {
    // alert("All fields are required!");
    swal("Fill Out All Input Field!", "Press OK For Retry!", "error");
    return;
}

formData = JSON.parse(localStorage.getItem("formData")) || [];
console.log(formData);  

let id = Number(localStorage.getItem('id')) || 2000;

for (let i = 0; i < formData.length; i++) {
    if (email == formData[i].email) {
        swal (
            "This Email Is Already Taken Try Another Email!",
            "Press OK For Retry!",
            "error"
        );
        return;
    }       
}

if (password !== confirmPassword) {
    swal ("Password Should Be Same!", "Press OK For Retry!", "error");
    // alert("Passwords do not match.");
    return;
}

if (!isValidPassword(password)) {
    alert ("Password must be exactly 8 characters long.");
    return;
}

let userRecord = {
    name: names,
    email: email,
    password: password,
    id: id + 1,  
};

formData.push(userRecord);
// alert("Sign Up successful!");
// swal(`Good job!, ${userName}, success`);
// swal("Good job!", "You clicked the button!", "success");
swal("SignUp Success!", `${names} Go To LogIn Page`, "success");
localStorage.setItem("formData", JSON.stringify(formData));
localStorage.setItem("id", id + 1);

userName.value = "";
userEmail.value = "";
userPassword.value = "";
userConfirmPassword.value = "";
});

let token = localStorage.getItem('token');
if (token){
    window.location = 're.html';
}

login.addEventListener ("submit", function (event) {
    event.preventDefault ();
    let emails = emaillogin.value.trim ();
    let password = passwordlogin.value.trim ();

    if (!emails || !password) {
        alert ("both fieds are required");
        return;
    }

    formData = JSON.parse(localStorage.getItem("formData")) || [];
    console.log(formData);

    for (var i = 0; i < formData.length; i++) {
        if (emails == formData[i].email) {
          if (
            emails == formData[i].email &&
            password == formData[i].password
        );    
        }   
        swal({
        title: "SuccessFully LogedIn!",
        text: `${formData[i].names}`,
        icon: "success",
        button: true,
      });
      
      if (!emails.includes("@gmail.com")) {
          Swal.fire ({
              position: "top-end",
              icon: "error",
              title: "includes a @gmail.com!",
            });
        }   
    }  
        
        let user = formData.find (user => user.email === emails && user.password === password);
        
        if (user) {
            // alert (`welcome back, ${user.name} !`);
            //swal(`Good job!, ${user.name} ! You clicked the button!, success login`);
            // swal (`Good job!, You clicked the button!, success login`);
            let token = 'abc123';
            localStorage.setItem('token', token);
            localStorage.setItem('username', user.name);
            localStorage.setItem('email', user.email);
            localStorage.setItem('userID', user.userID);
            setTimeout (() => {
                window.location = `re.html`;
            }, 2000);
        }
    
        else {
        alert ("Invalid email or password");
        }

    emails.value = "";
    password.value = "";
}); 