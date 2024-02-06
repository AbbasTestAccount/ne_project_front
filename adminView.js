import { createMember, updateMember, createTrainer, updateTrainer , deleteMember, deleteTrainer } from "./requests.js";

function updateMemberTable(members) {
  let table = document.getElementById("myTable");

  for (const member of members) {
    const newRow = document.createElement("tr");

    for (let i = 0; i < 8; i++) {
      const cell = document.createElement("td");

      switch (i) {
        case 0:
          cell.innerHTML = member.member_id;
          break;
        case 1:
          cell.innerHTML = member.username;
          break;
        case 2:
          cell.innerHTML = member.member_password;
          cell.classList.add("not_necessary");
          break;
        case 3:
          cell.innerHTML = member.full_name;
          break;
        case 4:
          cell.innerHTML = member.email;
          cell.classList.add("not_necessary");
          break;
        case 5:
          cell.innerHTML = member.monthly_cost;
          break;
        case 6:
          cell.innerHTML = member.is_active;
          cell.classList.add("not_necessary");
          break;
        case 7:
          // Create a delete button for the last cell
          if (member.is_active == false) {
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.type = "button";
            deleteButton.addEventListener('click', deleteMember(member.member_id,member.username,member.member_password,member.full_name,member.email,member.monthly_cost,member.is_active));
            deleteButton.innerHTML = "delete";

            cell.appendChild(deleteButton);
          } else {
            cell.innerHTML = "";
          }

          break;
      }

      // Append the cell to the new row
      newRow.appendChild(cell);
    }
    table.appendChild(newRow);
  }
}

function updateTrainerTable(trainers){
  let table2 = document.getElementById("myTable2");

  for (const member of trainers) {
    const newRow = document.createElement("tr");

    for (let i = 0; i < 6; i++) {
      const cell = document.createElement("td");

      switch (i) {
        case 0:
          cell.innerHTML = member.trainer_id;
          break;
        case 1:
          cell.innerHTML = member.username;
          break;
        case 2:
          cell.innerHTML = member.trainer_password;
          cell.classList.add("not_necessary");
          break;
        case 3:
          cell.innerHTML = member.full_name;
          break;
        case 4:
          cell.innerHTML = member.email;
          cell.classList.add("not_necessary");
          break;

        case 5:
          // Create a delete button for the last cell
          const deleteButton = document.createElement("button");
          deleteButton.className = "delete";
          deleteButton.type = "button";  
          deleteButton.addEventListener('click', deleteTrainer(member.trainer_id, member.username, member.trainer_password, member.full_name, member.email));
          deleteButton.innerHTML = "delete";
          cell.appendChild(deleteButton);
            
  
          break;
      }

      // Append the cell to the new row
      newRow.appendChild(cell);
    }
    table2.appendChild(newRow);
  }
}

async function fetchMemberData() {
  const authToken = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3000/member/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    let members = data.members;
    console.log(members);

    return members;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow the error to handle it outside the function if needed
  }
}

async function fetchTrainerData(){
  const authToken = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3000/trainer/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    let trainers = data.trainers;
    console.log(trainers);

    return trainers;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow the error to handle it outside the function if needed
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let members = await fetchMemberData();
  let trainers = await fetchTrainerData();
  updateMemberTable(members);
  updateTrainerTable(trainers);

});

document.getElementById("createMember").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("create_username").value;
  const password = document.getElementById("create_password").value;
  const fullName = document.getElementById("create_fullName").value;
  const email = document.getElementById("create_email").value;
  const monthlyCost = document.getElementById("create_monthlyCost").value;
  let isActive = document.getElementById("create_isActive").checked;
  console.log(username, password, fullName, email, monthlyCost, isActive);
  createMember(username, password, fullName, email, monthlyCost, isActive).then(
    (result) => {
      console.log(result);
    }
  );
});

document.getElementById("createTrainer").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("create_Tusername").value;
  const password = document.getElementById("create_Tpassword").value;
  const fullName = document.getElementById("create_TfullName").value;
  const email = document.getElementById("create_Temail").value;
  console.log(username, password, fullName, email );
  createTrainer(username, password, fullName, email).then(
    (result) => {
      console.log(result);
    }
  );
});

document.getElementById("updateMember").addEventListener("submit", (event) => {
  event.preventDefault();
  const memberId = document.getElementById("update_member_id").value;
  const username = document.getElementById("update_username").value;
  const password = document.getElementById("update_password").value;
  const fullName = document.getElementById("update_fullName").value;
  const email = document.getElementById("update_email").value;
  const fitnessGoal = document.getElementById("fitness_goal").value;
  const monthlyCost = document.getElementById("update_monthlyCost").value;
  let isActive = document.getElementById("update_isActive").checked;
  console.log(
    username,
    password,
    fullName,
    email,
    fitnessGoal,
    monthlyCost,
    isActive
  );
  updateMember(
    memberId,
    username,
    password,
    fullName,
    email,
    fitnessGoal,
    monthlyCost,
    isActive
  ).then((result) => {
    console.log(result);
  });
});

document.getElementById("updateTrainer").addEventListener("submit", (event) => {
  event.preventDefault();
  const trainerId = document.getElementById("update_trainer_id").value;
  const username = document.getElementById("update_Tusername").value;
  const password = document.getElementById("update_Tpassword").value;
  const fullName = document.getElementById("update_TfullName").value;
  const email = document.getElementById("update_Temail").value;

  console.log(
    username,
    password,
    fullName,
    email
  );
  updateTrainer(
    trainerId,
    username,
    password,
    fullName,
    email
  ).then((result) => {
    console.log(result);
  });
});
