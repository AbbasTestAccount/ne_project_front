let members;
function updateTable(){
    let table = document.getElementById("myTable");

    for (const member of members) {
    
        const newRow = document.createElement('tr');
    
        for (let i = 0; i < 8; i++) {
            const cell = document.createElement('td');
    
            switch (i) {
                case 0:
                    cell.innerHTML = member.member_id;
                    break;
                case 1:
                    cell.innerHTML = member.username;
                    break;
                case 2:
                    cell.innerHTML = member.member_password;
                    cell.classList.add('not_necessary');
                    break;
                case 3:
                    cell.innerHTML = member.full_name;
                    break;
                case 4:
                    cell.innerHTML = member.email;
                    cell.classList.add('not_necessary');
                    break;
                case 5:
                    cell.innerHTML = member.monthly_cost;
                    break;
                case 6:
                    cell.innerHTML = member.is_active;
                    cell.classList.add('not_necessary');
                    break;
                case 7:
                    // Create a delete button for the last cell
                    if(member.isActive == false){
                        const deleteButton = document.createElement('button');
                        deleteButton.className = "delete";
                        deleteButton.type = "button";
                        // deleteButton.addEventListener('click', deleteMember);
                        deleteButton.innerHTML = "delete";
        
                        cell.appendChild(deleteButton);
                    }else{
                        cell.innerHTML = '';
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
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDcxNzQwMTksImV4cCI6MTcwNzE3NzYxOX0.xW2bGuasPlcvQXnM5h_BbWyMCAJ8SVqFBjw4mQHFNcI';

    try {
        const response = await fetch('http://localhost:3000/member/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        members = data.members;
        console.log(members);

        return members;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Rethrow the error to handle it outside the function if needed
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    members = await fetchData();
    updateTable(); // Now you can call updateTable after fetchData
});
