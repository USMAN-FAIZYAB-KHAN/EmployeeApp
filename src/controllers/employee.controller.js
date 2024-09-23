
import employeeModel from "../models/employee.model.js";

export const getAllEmployee = async (req, res) => {
    try {
      // Find all employees and populate 'designation' and 'department'
      const employees = await employeeModel.find()
        .populate('designation')  // Populate designation data
        .populate('department');   // Populate department data
      
      return res.status(201).send(employees);
    } catch (err) {
      console.log("Error while getting the employees", err);
      res.status(500).send({ message: "Error while getting the employees" });
    }
  };
  

export const getEmployee = async (req, res) => {
    const employeeId = req.params.empId;
    
    try {
        const emp = await employeeModel.findOne({ _id: employeeId })
        .populate('designation')  // Populate designation data
        .populate('department');  // Populate department data
        if (!emp) return res.status(201).send({ "message": "Employee not found!" })
        return res.status(201).send(emp)
    } catch (err) {
        console.log("Error while getting the employee")
        res.status(500).send(
            { message: "Error while getting the employee" }
        )
    }
}


export const createEmployee = async (req, res) => {
    const employee = {
        name: req.body.name,
        designation: req.body.designation ? req.body.designation : null,
        salary: req.body.salary,
        department: req.body.department ? req.body.department : null,
    }

    try {
        const emp = await employeeModel.create(employee);
        const populatedEmp = await employeeModel.findById(emp._id).populate('designation').populate('department');
        return res.status(201).send(populatedEmp)
    } catch (err) {
        console.log("Error while creating employee", err)
        res.status(500).send(
            { message: "Error while creating employee 111" }
        )
    }
}

export const deleteEmployee = async (req, res) => {
    const deleteId = req.params.empId;

    try {
        const deletedEmp = await employeeModel.findByIdAndDelete(deleteId)
        if (!deletedEmp) return res.status(201).send({ "message": "Employee not found!" })
        return res.status(201).send({ "message": "Successfully deleted the employee" })
    } catch (err) {
        console.log("Error while deleting the employee")
        res.status(500).send(
            { message: "Error while deleting the employee" }
        )
    }
}


export const updateEmployee = async (req, res) => {
    let data = req.body
    const employeeId = req.params.empId;

    const updatedEmployee = {
        name: data.name,
        designation: data.designation,
        salary: data.salary,
        department: data.department
    }

    try {
        const emp = await employeeModel.findByIdAndUpdate(employeeId, updatedEmployee, { new: true }).populate('designation').populate('department');
        if (!emp) return res.status(201).send({ "message": "Employee not found!" })
        return res.status(201).send(emp)
    } catch (err) {
        console.log("Error while updated the employee")
        res.status(500).send(
            { message: "Error while updated the employee" }
        )
    }
}


