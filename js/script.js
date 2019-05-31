
    import {
        $studentsList,
        $formUpdate,
        $btnDelete,
        $formCreate
    } from './variable.js';

    import DB from './db.js';

    let server = new DB('http://helloworld.filonitta.fe4.a-level.com.ua', 1);

    server.getStudents().done(response => {
        console.log(response)
        response.forEach(student => {
            $('<a>')
                .appendTo($studentsList)
                .attr({
                    'href': '',
                    'data-id': student.id
                })
                .addClass('list-group-item')
                .text(`${student.firstname} ${student.lastname}`);
        });

    $('body').on('click', '[data-id]', function (event) {
        event.preventDefault();

        let studentId = $(this).data('id');
        console.log(studentId)

        server.getStudentById(studentId).done(response => {
            console.log('response', response);
            for (let key in response) {
                $formUpdate
                    .find(`[name=${key}]`)
                    .val(response[key])
            }
        });
    })

    $formUpdate.on('submit', function (event) {
        event.preventDefault();
        let studentId = $(this).find('[name=id]').val();
        console.log(studentId)
        server.updateStudentById(studentId, $(this).serialize());
    })

    $btnDelete.on('click', function (event) {
        event.preventDefault();
        let studentId = $formUpdate.find('[name=id]').val();
        console.log(studentId);
        
        server.deleteStudentById(studentId);
        $formUpdate[0].reset();
        $(`[data-id=${studentId}]`).remove();
    })

    
    $formCreate.on('submit',function(event){
        event.preventDefault();
        var $input_firstname = $('#firstname'),
            $input_lastname = $('#lastname'),
            $input_email = $('#email');

        if ($input_firstname.val().length === 0) {
           $input_firstname.css('border', '1px solid red');
        }else{
            $input_firstname.css('border', '1px solid green');
        }
        if ($input_lastname.val().length === 0) {
            $input_lastname.css('border', '1px solid red');
        }else{
            $input_lastname.css('border', '1px solid green');
        }
        if ($input_email.val().length === 0) {
            $input_email.css('border', '1px solid red');
        }else{
             $input_email.css('border', '1px solid green');
        }

        if ($input_email.val().length != 0 && $input_firstname != 0 && $input_lastname != 0){
            server.createStudent($(this).serialize()).done(response => {
            console.log($input_firstname.val().length);
            $('<a>')
                .appendTo($studentsList)
                .attr({
                    'href': '',
                    'data-id': response.id
                })
                .addClass('list-group-item')
                .text(`${response.firstname} ${response.lastname}`);

            console.log(this);

        })
    }
    })

    });