const interns = [];
const tableBody = document.getElementById("internTableBody");
const exportBtn = document.getElementById("exportBtn");
let clickCount = 0;

document.getElementById("addBtn").addEventListener("click", () => {
  const intern = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    department: document.getElementById("department").value,
    duration: document.getElementById("duration").value,
    address: document.getElementById("address").value,
    contact: document.getElementById("contact").value,
    email: document.getElementById("email").value,
    projects: document.getElementById("projects").value
  };

  if (Object.values(intern).some(v => v.trim() === '')) {
    alert("Please fill all fields.");
    return;
  }

  interns.push(intern);
  renderTable();
  clearForm();
});

function renderTable() {
  tableBody.innerHTML = '';
  interns.forEach((intern, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${intern.name}</td>
      <td>${intern.age}</td>
      <td>${intern.department}</td>
      <td>${intern.duration}</td>
      <td>${intern.address}</td>
      <td>${intern.contact}</td>
      <td>${intern.email}</td>
      <td>${intern.projects}</td>
      <td><button onclick="deleteIntern(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function clearForm() {
  document.querySelectorAll(".form input").forEach(input => input.value = '');
}

function deleteIntern(index) {
  interns.splice(index, 1);
  renderTable();
}

exportBtn.addEventListener("click", () => {
  const csv = interns.map(i =>
    `${i.name},${i.age},${i.department},${i.duration},${i.address},${i.contact},${i.email},${i.projects}`
  );
  csv.unshift("Name,Age,Department,Duration,Address,Contact,Email,Projects");

  const blob = new Blob([csv.join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "interns.csv";
  a.click();

  // Easter egg
  clickCount++;
  if (clickCount === 5) {
    alert("🎉 Surprise! You're a secret CSV ninja!");
    clickCount = 0;
  }
});
