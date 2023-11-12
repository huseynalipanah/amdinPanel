function showUser() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data=(users)=>{
            let homeUsers=document.getElementById("container")
             homeUsers.innerHTML=""
            for(let user of users){
                 homeUsers.innerHTML+=`
                <div>
                    <p>img:
                        <img src="${user.img}" alt="">
                    </p>
                    <p>İsim: ${user.name}</p>
                    <p>İş: ${user.job}</p>
                </div>
             `;
            }
            
        }
)}
showUser()