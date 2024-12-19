let token = localStorage.getItem('token');
let id = localStorage.getItem('userID');

function displaydate () {
    let dates = new Date ();
    dates = dates.toString ().split (" ");   
    document.getElementById ("date").innerHTML = dates [0] + " " + dates [1] + " " + dates [2] + " " + dates [3];   
    console.log (dates);
}

if (!token) {
    window.location = "login.html";
}

// let tasks = [];

let array = [];
let taskinputs = document.getElementById ("taskinput");
let taskBtn = document.getElementById ("btn");
let ul = document.getElementById ("list");
// let delet = document.getElementById ("del");

let getslocalstoarge = () => {
    return JSON.parse (localStorage.getItem("adtodo")) || [];
};

let setslocalstorage = (todo) => {
    return localStorage.setItem ("adtodo", JSON.stringify (todo)); 
};

let editTodo = null;

let adds = (e) => {
    // ul.innerHTML = "";
    e.preventDefault ();   
    
    // setslocalstorage (array);   
    
    array = getslocalstoarge ();
    let tests = taskinputs.value.trim ();
    console.log (tests);
    
    taskinputs.value = "";
    
    if (tests.length != 0) {   
        
        console.log (typeof array);
        
        array.push (tests);
        array = [...new Set (array)];
        
        setslocalstorage (array);  
        
    if (taskBtn === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = taskinputs;
        taskBtn.value = "btn";
        taskinputs.value = "";  
    }

    else {     
        let newli = document.createElement ("li");
        newli.innerHTML = tests;
        ul.appendChild (newli);

        let deleted = document.createElement ("button");
        deleted.innerHTML = "Delete";
        deleted.classList.add ("btn", "deleted");
        newli.appendChild (deleted);

        ul.appendChild (newli);
        taskinputs.value = "";
    }
}       
};

let updates = (e) => {
    e.preventDefault ();
    console.log (e.target.innerHTML);
    if (e.target.innerHTML === "Delete") {
        ul.removeChild (e.target.parentElement);
    }
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary Todo List has been deleted!", {
            icon: "success",
          });
        }
        else {
          swal("Your imaginary file is safe!");
        }
      });
}

taskBtn.addEventListener ("click", adds);
ul.addEventListener ("click", updates);

document.getElementById ("btn").addEventListener ("click", (e) => {
    adds (e);
}); 

window.onload = function () {
    displaydate ();
}    

function logout() {
  document.getElementById("btnLo").addEventListener("click", () => {
    swal ({
      title: "Are you sure?",
      text: "You Won't To LogOut!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          localStorage.removeItem("username");
          localStorage.removeItem('token');
          window.location.href = "index.html";
        } 
      });
    });
}
