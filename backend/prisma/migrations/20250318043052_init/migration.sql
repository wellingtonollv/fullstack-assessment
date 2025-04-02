-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "departmentId" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeDepartmentHistory" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "departmentId" INTEGER,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeDepartmentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeDepartmentHistory" ADD CONSTRAINT "EmployeeDepartmentHistory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeDepartmentHistory" ADD CONSTRAINT "EmployeeDepartmentHistory_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- Insert Department
INSERT INTO "Department" ("name") VALUES
('Sales'),
('Engineering'),
('HR'),
('Marketing'),
('Finance');

-- Inserir Employees
INSERT INTO "Employee" ("firstName", "lastName", "hireDate", "phone", "address", "active", "departmentId") VALUES
('John', 'Doe', '2020-01-01', '123456789', '123 Main St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Sales')),
('Jane', 'Doe', '2021-06-15', '987654321', '456 Secondary St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Engineering')),
('Alice', 'Smith', '2019-04-12', '555666777', '789 Third St', true, (SELECT "id" FROM "Department" WHERE "name" = 'HR')),
('Bob', 'Johnson', '2021-08-22', '888777666', '234 Elm St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Marketing')),
('Charlie', 'Brown', '2018-11-05', '444555666', '567 Pine St', false, (SELECT "id" FROM "Department" WHERE "name" = 'Finance')),
('Diana', 'Miller', '2020-02-28', '222333444', '890 Oak St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Sales')),
('Eve', 'White', '2022-03-14', '111222333', '101 Maple St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Engineering')),
('Frank', 'Wilson', '2017-09-10', '333444555', '202 Birch St', true, (SELECT "id" FROM "Department" WHERE "name" = 'HR')),
('Grace', 'Lee', '2019-07-07', '666777888', '303 Cedar St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Marketing')),
('Hank', 'Garcia', '2020-06-25', '777888999', '404 Willow St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Finance')),
('Ivy', 'Taylor', '2021-05-20', '555444333', '505 Chestnut St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Sales')),
('Jack', 'Davis', '2018-10-18', '222111333', '606 Redwood St', true, (SELECT "id" FROM "Department" WHERE "name" = 'Engineering'));


