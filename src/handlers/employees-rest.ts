let employeeList = [
    {
        id: "EMP001",
        name: "Bishwajeet Mandal",
        email: "bishwajeetmandal93@gmail.com",
        phoneNo: "7979755714"
    },
    {
        id: "EMP002",
        name: "John Doe",
        email: "johndoe93@gmail.com",
        phoneNo: "8989877635"
    },
    {
        id: "EMP003",
        name: "Jane Doe",
        email: "janedoe93@gmail.com",
        phoneNo: "9526276363"
    },
    {
        id: "EMP004",
        name: "Amit",
        email: "amit@gmail.com",
        phoneNo: "9337684654"
    },
    {
        id: "EMP005",
        name: "Test Name",
        email: "test.x@gmail.com",
        phoneNo: "9885958683"
    }

];

export const getAllEmployeesLH = async (event: any, context:any) => {
    if(event.httpMethod !== 'GET') {
        return {
            'statusCode': 401,
            'body': JSON.stringify({
                message: `Request expects a ${event.httpMethod} verb`
            })
        }
    }

    let response;
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Employee Data Fetched!',
                data: employeeList,
                event: event
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
 
    return response
};

export const createEmployeesLH = async (event: any, context:any) => {
    if(event.httpMethod !== 'POST') {
        return {
            'statusCode': 401,
            'body': JSON.stringify({
                message: `Request expects a ${event.httpMethod} verb`
            })
        }
    }

    const item = JSON.parse(event.body);
    employeeList.push(item);
 
    let response;
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Employee Data Saved!',
                data: employeeList
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
 
    return response
};

export const findEmployeeByIdLH = async (event: any, context:any) => {
    if(event.httpMethod !== 'GET') {
        return {
            'statusCode': 401,
            'body': JSON.stringify({
                message: `Request expects a ${event.httpMethod} verb`
            })
        }
    }

    const param = event.pathParameters.id;
    const result = employeeList.filter(e => e.id === param);
    let msg = `Found employee with id = ${param}`;
    if(result.length === 0) {
        msg = `Employee with id ${param} does not exists!`;
    }
 
    let response;
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: msg,
                data: result
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
 
    return response
};

export const updateEmployeeLH = async (event: any, context:any) => {
    let response;

    if(event.httpMethod !== 'PUT') {
        return {
            'statusCode': 401,
            'body': JSON.stringify({
                message: `Request expects a ${event.httpMethod} verb`
            })
        }
    };

    const item = JSON.parse(event.body);
    const index = employeeList.findIndex(e => e.id === item.id);
    let msg = `Employee with id = ${item.id} updated`;
    if(index === -1) {
        msg = `Could not find any employee with id ${item.id}`;
    } else {
        employeeList[index]["name"] = item.name;
        employeeList[index]["email"] = item.email;
        employeeList[index]["phoneNo"] = item.phoneNo;
    }
 
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: msg,
                data: employeeList
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
 
    return response
};

export const deleteEmployeeLH = async (event: any, context:any) => {
    let response;

    if(event.httpMethod !== 'DELETE') {
        return {
            'statusCode': 401,
            'body': JSON.stringify({
                message: `Request expects a ${event.httpMethod} verb`
            })
        }
    };

    const param = event.pathParameters.id;
    const index = employeeList.findIndex(e => e.id === param);
    let msg = `Employee with id = ${param} deleted`;
    if(index === -1) {
        msg = `Could not find any employee with id ${param}`;
    } else {
        employeeList.splice(index,1);
    }
 
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: msg,
                data: employeeList
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
 
    return response
};