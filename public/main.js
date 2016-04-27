"use strict";

$(document).ready(init);

function init() {
    startingAnimation();
    $('.scoreInputForm').submit(scoreInputFormSubmitted);
    $('.scoreContainer').on('click', '.delete', deleteOne);
    $('.scoreContainer').on('click', '.edit', editOne);
    $('.addRoom').on('click', addRoom);

    //  for this project
    $('.roomContainer').find('.showall').addClass('selected btn-primary');
    check();
    $('.addRoomForm').submit(addRoomFormSubmit);
    $('.addItemForm').submit(addItemFormSubmit);
    $('.editItemForm').submit(editItemFormSubmit);
    $('.addRoomForm .cancel').click(addRoomCancelClicked);
    $('.editRoomForm .cancel').click(editRoomCancelClicked);
    $('.editItemForm .cancel').click(editItemCancelClicked);

    $('.roomContainer').on('click', '.roomContainer button' - '.showall', roomSelected);
    $('.roomContainer').on('dblclick', '.roomContainer button' - '.showall', roomEdit);
    $('.itemsTable').on('click', '.item .edit', itemEdit);
    $('.itemsTable').on('click', '.item .delete', itemDelete);
    $('.roomContainer').find('.showall').click(showAllRoomSelected);
    intializeAllItems();
}

function check() {

    var length = $('.btn.btn-default.showall.selected.btn-primary').length;
    if (length === 1) {
        $('.addItemTHead').addClass('hidden');
    } else {
        $('.addItemTHead').removeClass('hidden');
    }
    console.log('Checked length: ', length);
    var room =$('.roomContainer').find('.roomBtn.selected').text();
$('.addItemTHead').find('button.add.btn.btn-primary.btn-xs').text(`add to ${room}`);
}

function checkGrade() {
    // console.log("checkGrade Start");
    var gradeArr = $('.grade');
    // console.log(typeof gradeArr);

    // console.log('gradeArr.length): ', gradeArr.length);
    for (var i = 0; i < gradeArr.length; i++) {
        // console.log(gradeArr[i]);
        var id = $(gradeArr[i]).attr('data-id');
        // console.log(`id${i}: `, id);
        var score = $(`tr[data-id='${id}']`).find('.score').text();
        var total = $(`tr[data-id='${id}']`).find('.total').text();
        var grade = Number(score) / Number(total);
        // console.log('grade: ', grade);
        if (grade > 0.9) {
            $(`.grade[data-id='${id}']`).text('A');
        } else if (grade > 0.8 & grade < 0.9) {
            $(`.grade[data-id='${id}']`).text('B');
        } else if (grade > 0.7 & grade < 0.8) {
            $(`.grade[data-id='${id}']`).text('C');
        } else if (grade > 0.6 & grade < 0.7) {
            $(`.grade[data-id='${id}']`).text('D');
        } else {
            $(`.grade[data-id='${id}']`).text('F');
        };
    }
    checkSummary();
}

function checkSummary() {
    // console.log("checkSummary Start");
    var scoreArr = $('.itemsTable .score');
    var totalrr = $('.itemsTable .total');
    var scoreSummaryArr = [];
    var totalSummaryArr = [];
    for (var i = 0; i < scoreArr.length; i++) {
        scoreSummaryArr.push(Number(scoreArr[i].innerHTML));
    }
    for (var i = 0; i < totalrr.length; i++) {
        totalSummaryArr.push(Number(totalrr[i].innerHTML));
    }
    // console.log('scoreSummaryArr: ', scoreSummaryArr);
    var summary = $('.summary');
    var scoreSummary = scoreSummaryArr.reduce(function(a, b) {
        return a + b
    }, 0);
    var totalSummary = totalSummaryArr.reduce(function(a, b) {
        return a + b
    }, 0);
    var gradeSummary = Number(scoreSummary) / Number(totalSummary);

    summary.find('.scoreS').text(scoreSummary.toString());
    summary.find('.totalS').text(totalSummary.toString());

    if (gradeSummary > 0.9) {
        summary.find('.gradeS').text('A');
    } else if (gradeSummary > 0.8 & gradeSummary < 0.9) {
        summary.find('.gradeS').text('B');
    } else if (gradeSummary > 0.7 & gradeSummary < 0.8) {
        summary.find('.gradeS').text('C');
    } else if (gradeSummary > 0.6 & gradeSummary < 0.7) {
        summary.find('.gradeS').text('D');
    } else {
        summary.find('.gradeS').text('F');
    };
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function scoreInputFormSubmitted(e) {
    // var id = guid();
    // // console.log('id: ', id);
    // // console.log('time: ', timeStamp);
    // e.preventDefault();
    // // console.log('submitted');
    // var name = $('.name').val();
    // var score = $('.score').val();
    // var total = $('.total').val();
    //
    // $.ajax({
    //         url: '/sheet/score/',
    //         method: 'POST',
    //         data: {
    //             name: name,
    //             score: score,
    //             total: total,
    //             id: id
    //         }
    //     })
    //     .done(function(data) {
    //         // console.log('data: ', data);
    //         // console.log('ddd');
    //         var name = data.name;
    //         var score = data.score;
    //         var total = data.total;
    //         var id = data.id;
    //
    //         // var time = moment().format('LLL');
    //         // var newScore = $('tr.template.newScore').clone().addClass('animated bounceInwe');
    //         var newScore = $('tr.template.newScore').clone().addClass('animated flipInX');
    //         // console.log('newScore: ', newScore);
    //         newScore.removeClass('template');
    //         newScore.find('.name').text(name);
    //         newScore.find('.score').text(score);
    //         newScore.find('.total').text(total);
    //         newScore.find('.grade').attr('data-id', id);
    //         newScore.attr('data-id', id);
    //         newScore.find('.delete').attr('data-id', id);
    //         newScore.find('.edit').attr('data-id', id);
    //
    //         var score = newScore.find('.score').text();
    //         var total = newScore.find('.total').text();
    //         var grade = Number(score) / Number(total);
    //         // console.log('grade OF the new score: ', grade);
    //         if (grade > 0.9) {
    //             newScore.find('.grade').text('A');
    //         } else if (grade > 0.8 & grade < 0.9) {
    //             newScore.find('.grade').text('B');
    //             Å
    //         } else if (grade > 0.7 & grade < 0.8) {
    //             newScore.find('.grade').text('C');
    //         } else if (grade > 0.6 & grade < 0.7) {
    //             newScore.find('.grade').text('D');
    //         } else {
    //             newScore.find('.grade').text('F');
    //         };
    //
    //         $('tbody.itemsTable').prepend(newScore);
    //         // checkGrade();
    //
    //         $('form.scoreInputForm input').val('');
    //         checkGrade();
    //
    //     })
    //     .fail(function(err) {
    //         // console.log('err when adding: ', err);
    //     });

}

function deleteOne(e) {
    // var id = $(e.target).attr('data-id');
    // // console.log('id delete clicked: ', id);
    //
    // $.ajax({
    //         url: '/sheet/score/',
    //         method: 'DELETE',
    //         data: {
    //             id: id,
    //         }
    //     })
    //     .done(function(data) {
    //         console.log('id has been deleted for sure: ', data.id);
    //         $(`.scoreContainer tr[data-id='${data.id}']`).addClass('animated flipOutX');
    //         setTimeout(function() {
    //             $(`.scoreContainer tr[data-id='${data.id}']`).remove();
    //             checkGrade();
    //         }, 1000);
    //
    //     })
    //     .fail(function(err) {
    //         console.log('err when deleting: ', err);
    //     });

}


function editOne(e) {
    e.preventDefault();
    var id = $(e.target).attr('data-id');
    // console.log(id);
    var editter = $('.editterDiv');
    editter.fadeIn(100).css('display', 'inline-block');
    editter.find('.container').addClass('animated bounceIn');
    editter.find('button').attr('data-id', id);

    var name = $(`tr[data-id='${id}']`).find('th.name').text();
    var score = $(`tr[data-id='${id}']`).find('td.score').text();
    var total = $(`tr[data-id='${id}']`).find('td.total').text();

    // console.log('name: ', name);
    // console.log('score: ', score);
    // console.log('total: ', total);
    editter.find('.name').val(name);
    editter.find('.score').val(score);
    editter.find('.total').val(total);
}


function intializeAllItems() {
    // $('.itemsTable').empty();
    $.ajax({
            url: '/home/room',
            method: 'GET'
        })
        .done(function(data) {
            var oldItemsArr = [];
            console.log('successful get All items');
            console.log('data: ', data);
            for (var i = 0; i < data.length; i++) {
                var oldItem = $('.oldItem.template').clone();
                oldItem.removeClass('template');
                // oldItem.addClass('animated flipInX');
                oldItem.attr('data-id', `${data[i].id}`);
                oldItem.find('.edit').attr('data-id', `${data[i].id}`);
                oldItem.find('.delete').attr('data-id', `${data[i].id}`);
                oldItem.find('.name').text(`${data[i].name}`);
                oldItem.find('.value').text(`${data[i].value}`);
                oldItemsArr.push(oldItem);
            }
            $('.itemsTable').append(oldItemsArr).addClass('animated fadeIn');
        })
        .fail(function(err) {
            console.log('err when adding a item: ', err);
        });
}

//   for this project
function addRoom(e) {
    e.preventDefault();
    console.log('addRoom clicked');
    var addRoomDiv = $('.addRoomDiv');
    addRoomDiv.fadeIn(100).css('display', 'inline-block');
    addRoomDiv.find('.container').addClass('animated bounceIn');
}

function addRoomCancelClicked(e) {
    e.preventDefault();
    var addRoomDiv = $('.addRoomDiv');
    addRoomDiv.fadeOut(100);
    setTimeout(function() {
        addRoomDiv.css('display', 'none');
    }, 300);
    addRoomDiv.find('input').val('');
}

function editRoomCancelClicked(e) {
    console.log('editRoomCancelClicked');
    e.preventDefault();
    var editRoomDiv = $('.editRoomDiv');
    editRoomDiv.fadeOut(100);
    setTimeout(function() {
        editRoomDiv.css('display', 'none');
    }, 300);
    editRoomDiv.find('input').val('');
}
function editItemCancelClicked(e) {
    console.log('editItemCancelClicked');
    e.preventDefault();
    var editItemDiv = $('.editItemDiv');
    editItemDiv.fadeOut(100);
    setTimeout(function() {
        editItemDiv.css('display', 'none');
    }, 300);
    editItemDiv.find('input').val('');
}

function addRoomFormSubmit(e) {
    e.preventDefault();
    var name = $('.addRoomForm').find('.name').val();
    // console.log('Room name added: ', name);
    $.ajax({
            url: '/home/room',
            method: 'POST',
            data: {
                name: name
            }
        })
        .done(function(data) {
            console.log('data: ', data);

            var newRoom = $('.newRoom.template').clone();
            newRoom.removeClass('template');
            newRoom.text(`${name}`);
            newRoom.addClass('animated flipInX');
            newRoom.attr('data-id', `${data.insertId}`);
            $('.roomContainer button:nth-last-child(1)').before(newRoom);


            var addRoomDiv = $('.addRoomDiv');
            addRoomDiv.fadeOut(100);
            setTimeout(function() {
                addRoomDiv.css('display', 'none');
            }, 500)
            addRoomDiv.find('input').val('');
            check();
        })
        .fail(function(err) {
            console.log('err when adding a room: ', err);
        });
}

function addItemFormSubmit(e) {
    console.log('dddd');
    e.preventDefault();
    var name = $('.itemName').val();
    var value = $('.itemValue').val();
    var room = $('.btn.btn-default.roomBtn.selected.btn-primary').attr('data-id');
    console.log('Item name added: ', name);
    console.log('Item value added: ', value);
    console.log('Room id added: ', room);
    $.ajax({
            url: '/home/item',
            method: 'POST',
            data: {
                name: name,
                value: value,
                room: room
            }
        })
        .done(function(data) {
            console.log('successful added');
            console.log('data: ', data);

            var newItem = $('.template.newItem').clone();
            newItem.removeClass('template');
            newItem.addClass('animated flipInX');
            newItem.attr('data-id', `${data.insertId}`);
            newItem.find('.edit').attr('data-id', `${data.insertId}`);
            newItem.find('.delete').attr('data-id', `${data.insertId}`);
            newItem.find('.name').text(name);
            newItem.find('.value').text(value);
            $('.itemsTable').prepend(newItem);
            $('.addItemTHead').find('input').val('');
        })
        .fail(function(err) {
            console.log('err when adding a item: ', err);
        });
}

function roomSelected(e) {
    // clearItemsTable();
    var $room = $(e.target);
    var name = $room.text();
    var id = $room.attr('data-id');
    console.log('slected room name : ', name);
    console.log('slected room id : ', id);
    $('.roomContainer button').removeClass('btn-primary selected');
    $room.addClass('selected btn-primary');
    // if ($('.itemsTable').find('tr') == 0) {

        $.ajax({
                url: '/home/room/getSpecificRoom',
                method: 'GET',
                data: {
                    id: id
                }
            })
            .done(function(data) {
                console.log('successfully get items of this room');
                console.log('data: ', data);
                data.reverse();
                var newItemArr = [];
                for (var i = 0; i < data.length; i++) {
                    console.log(`${data[i]}: `, data[i]);
                    var newItem = $('.template.newItem').clone();
                    newItem.removeClass('template');
                    newItem.addClass('animated fadeIn');
                    newItem.attr('data-id', `${data[i].id}`);
                    newItem.find('.edit').attr('data-id', `${data[i].id}`);
                    newItem.find('.delete').attr('data-id', `${data[i].id}`);
                    newItem.find('.name').text(`${data[i].name}`);
                    newItem.find('.value').text(`${data[i].value}`);
                    newItemArr.push(newItem);
                }
                // console.log('newItem: ', newItem);
                console.log('itemsTable: ', $('.itemsTable'));
                // $('.itemsTable').children('tr').not('.template').remove();
                $('.itemsTable').empty();
                // var aaa = $('.itemsTable:not(:has(.template))');
                // console.log('aaa: ', aaa);
                $('.itemsTable').prepend(newItemArr);
            })
            .fail(function(err) {
                console.log('err when getting a room: ', err);
            });
    // }


    check();

}

function showAllRoomSelected(e) {
    var $room = $(e.target);
    var name = $room.text();
    var id = $room.attr('data-id');
    $('.roomContainer button').removeClass('btn-primary selected');
    $room.addClass('selected btn-primary');
    check();
    intializeAllItems();
}

function roomEdit(e) {
    e.preventDefault();
    console.log('editRoom clicked');
    var editRoomDiv = $('.editRoomDiv');
    editRoomDiv.fadeIn(100).css('display', 'inline-block');
    editRoomDiv.find('.container').addClass('animated bounceIn');
}

function itemEdit(e) {
    e.preventDefault();
    var editItemDiv = $('.editItemDiv');
    editItemDiv.fadeIn(100).css('display', 'inline-block');
    editItemDiv.find('.container').addClass('animated bounceIn');
    editItemDiv.find('input').val('');

    var id = $(e.target).attr('data-id');
    var item = $(`.item[data-id='${id}']`);
    var name = item.find('th.name').text();
    var value = item.find('td.value').text();

    editItemDiv.find('input.name').val(name);
    editItemDiv.find('input.value').val(value);
    editItemDiv.find('button').attr('data-id', id);
}

function itemDelete(e) {
    e.preventDefault();
    // console.log('Item Delete');
    var id = $(e.target).attr('data-id');
    // console.log('Id: ', id);

    $.ajax({
            url: '/home/item',
            method: 'DELETE',
            data: {
                id: id
            }
        })
        .done(function(data) {
            console.log('dataaaa: ', data);
            console.log('successful deleting');
            console.log('data: ', data.id);
            var item = $('.itemsTable').find(`tr.item[data-id='${id}']`);
            console.log('item been deleted: ', item);
            item.fadeOut();
        })
        .fail(function(err) {
            console.log('err when updating a item: ', err);
        });
}

function editItemFormSubmit(e) {
    var editItemForm = $('.editItemForm')
    var name = editItemForm.find('.name').val();
    var value = editItemForm.find('.value').val();
    var id = editItemForm.find('button').attr('data-id');

    console.log('Item name updated: ', name);
    console.log('Item value updated: ', value);
    $.ajax({
            url: '/home/item',
            method: 'PUT',
            data: {
                name: name,
                value: value,
                id: id
            }
        })
        .done(function(data) {
            console.log('successful updated');
            console.log('data: ', data);
        })
        .fail(function(err) {
            console.log('err when updating a item: ', err);
        });
}



function startingAnimation() {
    var intro = $('.intro')
    setTimeout(function() {
        $('.jumbotron').css('display', 'block').addClass('animated fadeIn');
        $('.intro').css('display', 'block').addClass('animated bounceIn');
    }, 100)

}
