$('#navbar').load('navbar.html');
const API_URL = 'http://localhost:5000/api';

const users = JSON.parse(localStorage.getItem('users')) || [];

$.get(`${API_URL}/device`)
.then(response => {
 response.forEach(device => {
    $('#devices tbody').append(`
        <tr>
            <td>${device.device}</td>
            <td>${device.sensor}</td>
            <td>${device.status}</td>
        </tr>`
        );
    });
})
.catch(error => {
 console.error(`Error: ${error}`);
});

const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
var isAuthenticated = "";


const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = 'login.html';
}

users.forEach(function(users)
{
    $('#users tbody').append(`
    <tr>
        <td>${users.username}</td>
        <td>${users.password}</td>
        <td>${users.confirmpassword}</td>
    </tr>`
    );
});

$('#add-device').on('click', () => {
    const device = $('#device').val();
    const sensor = $('#sensor').val();
    const status = $('#status').val();

    const sensorData = [];
    const body = {
    device,
    sensor,
    status,
    sensorData
    };

    $.post(`${API_URL}/device`, body)
    .then(response => {
    location.href = 'devicelist.html';
    })

    .catch(error => {
    console.error(`Error: ${error}`);
    });
});
   
notifications.forEach(function(notifications)
{
    $(`#notifications tbody`).append(`
    <tr>
        <td>${notifications.device}</td>
        <td>${notifications.alert}</td>
        <td>${notifications.battery}</td>
    <tr>`
    );
});
   
$('#register').on('click', function() {
    const newuser = $('#username').val();
    const newpassword = $('#password').val();
    const newpassword2 = $('#confirmpassword').val();

    const exists = users.find(users => users.username === newuser);
    

    if( newpassword == newpassword2)
    {
        if(exists)
        {
            $('#errorrmessage').append("This user Already Exists");
        }
        else
        {
            users.push({ username: newuser, password: newpassword});
            localStorage.setItem('users', JSON.stringify(users));
            location.href = 'loginn.html';
        }
    }
});

$('#loginn').on('click', function() {
    const user = $('#username').val();
    const password = $('#password').val();
    
    const exists = users.find(users => users.username === user);

    if(exists && password == exists.password)
    {
        localStorage.setItem('isAuthenticated', 'true');
        if (localStorage.getItem('isAuthenticated'))
        {
            location.href = 'devicelist.html';
        }
    }
    else 
    {
        localStorage.getItem('isAuthenticated', 'false');
        $('#errorrmessage').append("The password or the Username is wrong");
    }

});