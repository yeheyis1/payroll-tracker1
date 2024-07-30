document.addEventListener('DOMContentLoaded', () => {
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const employeeFormModal = document.getElementById('employee-form-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const employeeForm = document.getElementById('employee-form');
    const employeeTableBody = document.getElementById('employee-table').querySelector('tbody');
    
    let employees = [];

    function displayEmployees() {
        employeeTableBody.innerHTML = ''; // Clear the table

        employees.forEach(employee => {
            let row = document.createElement('tr');

            let firstNameCell = document.createElement('td');
            firstNameCell.textContent = employee.firstName;
            row.appendChild(firstNameCell);

            let lastNameCell = document.createElement('td');
            lastNameCell.textContent = employee.lastName;
            row.appendChild(lastNameCell);

            let salaryCell = document.createElement('td');
            salaryCell.textContent = employee.salary.toFixed(2);
            row.appendChild(salaryCell);

            employeeTableBody.appendChild(row);
        });
    }

    function displayAverageSalary() {
        let totalSalary = employees.reduce((acc, employee) => acc + employee.salary, 0);
        let averageSalary = totalSalary / employees.length;

        console.log(`Number of employees: ${employees.length}`);
        console.log(`Average salary: ${averageSalary.toFixed(2)}`);
    }

    function getRandomEmployee() {
        let randomIndex = Math.floor(Math.random() * employees.length);
        let employee = employees[randomIndex];

        console.log(`Random employee: ${employee.firstName} ${employee.lastName}`);
    }

    addEmployeeBtn.addEventListener('click', () => {
        employeeFormModal.style.display = 'block';
    });

    closeModal.onclick = function() {
        employeeFormModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == employeeFormModal) {
            employeeFormModal.style.display = 'none';
        }
    }

    employeeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let firstName = document.getElementById('first-name').value.trim();
        let lastName = document.getElementById('last-name').value.trim();
        let salary = parseFloat(document.getElementById('salary').value);

        if (isNaN(salary)) {
            salary = 0;
        }

        employees.push({ firstName, lastName, salary });
        employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

        displayEmployees();
        displayAverageSalary();
        getRandomEmployee();

        employeeFormModal.style.display = 'none';
        employeeForm.reset();
    });
});
