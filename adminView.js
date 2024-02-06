import { createMember, updateMember } from "./requests.js";

function updateTable(members) {
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
          if (member.isActive == false) {
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.type = "button";
            // deleteButton.addEventListener('click', deleteMember);
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

async function fetchData() {
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

document.addEventListener("DOMContentLoaded", async () => {
  let members = await fetchData();
  updateTable(members); // Now you can call updateTable after fetchData
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
