export const fetchLeaderBoardKudos = async ({ onSuccess, onFailed = null }) => {
    try {
        const response = await fetch(
            'http://34.101.38.23:8080/api/kudos/list'
        ); // /api/kudos/list

        if (!response.ok) {
            throw new Error('Gagal fetch employee');
        }

        const resJson = await response.json();

        const updatedEmployees = resJson.data.map((emp) => ({
            ...emp,
            avatar: `https://randomuser.me/api/portraits/${
                emp.id % 2 === 0 ? 'women' : 'men'
            }/${emp.id}.jpg`,
        }));
        onSuccess && onSuccess(updatedEmployees);
    } catch (error) {
        onFailed && onFailed();
    }
};


export const fetchEmployees = async ({ onSuccess, onFailed = null }) => {
    try {
        const response = await fetch(
            'http://34.101.38.23:8080/api/employee/list'
        ); // /api/kudos/list

        if (!response.ok) {
            throw new Error('Gagal fetch employee');
        }

        const resJson = await response.json();

        const updatedEmployees = resJson.data.map((emp) => ({
            ...emp,
            avatar: `https://randomuser.me/api/portraits/${
                emp.id % 2 === 0 ? 'women' : 'men'
            }/${emp.id}.jpg`,
        }));
        onSuccess && onSuccess(updatedEmployees);
    } catch (error) {
        onFailed && onFailed();
    }
};

export const fetchFeedsKudos = async ({ onSuccess, onFailed = null }) => {
    try {
        const response = await fetch(
            'http://34.101.38.23:8080/api/kudos/list'
        ); // /api/kudos/list

        if (!response.ok) {
            throw new Error('Gagal fetch employee');
        }

        const resJson = await response.json();

        const updatedEmployees = resJson.data.map((emp) => ({
            ...emp,
            avatar: `https://randomuser.me/api/portraits/${
                emp.id % 2 === 0 ? 'women' : 'men'
            }/${emp.id}.jpg`,
            //message: 'Kamu sangat baik pengerjaannya'
        }));
        onSuccess && onSuccess(updatedEmployees);
    } catch (error) {
        onFailed && onFailed();
    }
};

export const fetchDetailEmployee = async ({ employeeId, onSuccess, onFailed = null }) => {
    try {
        const response = await fetch(
            `http://34.101.38.23:8080/api/employee/${employeeId}`
        ); // /api/kudos/list

        if (!response.ok) {
            throw new Error('Gagal fetch employee');
        }

        const resJson = await response.json();

        // const updatedEmployees = resJson.data.map((emp) => ({
        //     ...emp,
        //     avatar: `https://randomuser.me/api/portraits/${
        //         emp.id % 2 === 0 ? 'women' : 'men'
        //     }/${emp.id}.jpg`,
        // }));
        onSuccess && onSuccess(resJson?.data);
    } catch (error) {
        onFailed && onFailed();
    }
};

export const fetchLeaderKudos = async ({ onSuccess, onFailed = null }) => {
    try {
        const response = await fetch(
            'http://34.101.38.23:8080/api/kudos/leaderboard'
        ); // /api/kudos/list

        if (!response.ok) {
            throw new Error('Gagal fetch employee');
        }

        const resJson = await response.json();

        const updatedEmployees = resJson.data.map((emp) => ({
            ...emp,
            avatar: `https://randomuser.me/api/portraits/${
                emp.id % 2 === 0 ? 'women' : 'men'
            }/${emp.id}.jpg`,
            //message: 'Kamu sangat baik pengerjaannya'
        }));
        onSuccess && onSuccess(updatedEmployees);
    } catch (error) {
        onFailed && onFailed();
    }
};

