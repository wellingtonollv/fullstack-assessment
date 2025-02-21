# Front end Architecture Feature Based + Layered

📌 Architecture Used: Feature-Based + Layered
This project follows a Feature-Based + Layered Architecture, ensuring modularity, scalability, and separation of concerns.

🛠️ Why this Architecture?
✅ Modular Organization → Each feature (Employees, Departments, Users) has its own isolated scope.
✅ Scalability → New features can be added without affecting existing code.
✅ Clear Separation of Concerns → We maintain well-defined layers within each feature.
✅ Improved Testability → Each layer can be tested separately, ensuring reliable code.
✅ Easier Maintenance and Collaboration → Allows different teams to work without conflicts.

# Frontend folder structure

/src                  
  /features           # 📌 Each feature encapsulates its internal layers
    /employees        # 📌 Main Feature (Employee Management)
      /domain         # 🟢 Domain Layer (Business Rules)
        models.ts
        /use-cases
          validateEmployee.ts
          calculateEmployeeSalary.ts
      /application    # 🔵 Application Layer (State Logic, API, React Query)
        /queries
          useGetEmployees.ts
          useGetEmployeeById.ts
        /mutations
          useCreateEmployee.ts
          useUpdateEmployee.ts
          useDeleteEmployee.ts
        state.ts
      /infrastructure # 🔴 Infrastructure Layer (APIs and External Services)
        api.ts
      /presentation   # 🟡 UI Layer (React + Tailwind + ShadCN)
        /components
          EmployeeTable.tsx
          EmployeeCard.tsx
        /pages
          List.tsx     # ✅ Page to list Employees
          Details.tsx  # ✅ Page for Employee details
          Create.tsx   # ✅ Page to create a new Employee
          Edit.tsx     # ✅ Page to edit an Employee
        /tests
          EmployeeTable.test.tsx

    /departments      # 📌 Departments Feature (Follows the same structure)
      /domain
      /application
      /infrastructure
      /presentation

    /users           # 📌 Users Feature (Scalable for new modules)
      /domain
      /application
      /infrastructure
      /presentation

  /shared            # 📌 Shared modules between features
    /components      # 🔵 Reusable global components
      Button.tsx
      Modal.tsx
      Table.tsx
    /utils           # 🔧 Helper functions
      formatDate.ts
      validateForm.ts

  /config             # ⚙️ Global configurations
    api.ts
    queryClient.ts
    env.ts

  /routes             # 🌍 Route definitions
    routes.ts

  main.tsx            # 🚀 React entry point
  App.tsx             # 🏠 Main application component




