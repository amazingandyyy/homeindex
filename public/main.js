"use strict";

$(document).ready(init);

function init() {
    startingAnimation();

    $('.addRoom').on('click', addRoom);

    //  for this project
    $('.roomContainer').find('.showall').addClass('selected btn-primary');
    check();
    $('.addRoomForm').submit(addRoomFormSubmit);
    $('.addItemForm').submit(addItemFormSubmit);
    // $('.editRoomForm').submit(editRoomFormSubmit);
    $('.editItemForm').submit(editItemFormSubmit);
    $('.addRoomForm .cancel').click(addRoomCancelClicked);
    $('.editRoomForm .cancel').click(editRoomCancelClicked);
    $('.editItemForm .cancel').click(editItemCancelClicked);

    $('.roomContainer').on('click', '.roomBtn', roomSelected);
    $('.roomContainer').on('dblclick', '.roomBtn', roomEdit);
    $('.editRoomDiv').find('.delete').on('click', roomDelete);
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
    var room = $('.roomContainer').find('.roomBtn.selected').text();
    $('.addItemTHead').find('button.add.btn.btn-primary.btn-xs').text(`add to ${room}`);
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
                oldItem.find('.category').text(`${data[i].category}`);
                oldItem.find('.value').text(`${data[i].value}`);
                oldItemsArr.push(oldItem);
            }
            $('.itemsTable').empty();
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
    var category = $('.itemCategory').val();
    var room = $('.btn.btn-default.roomBtn.selected.btn-primary').attr('data-id');
    console.log('Item name added: ', name);
    console.log('Item value added: ', value);
    console.log('Item category added: ', category);
    console.log('Room id added: ', room);
    $.ajax({
            url: '/home/item',
            method: 'POST',
            data: {
                name: name,
                value: value,
                category: category,
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
            newItem.find('.category').text(category);
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
    var $room = $(e.target);
    var id = $room.attr('data-id');
    var name = $('.roomContainer').find(`button[data-id='${id}']`).text();

    console.log('editRoom clicked');
    var editRoomDiv = $('.editRoomDiv');
    editRoomDiv.fadeIn(100).css('display', 'inline-block');
    editRoomDiv.find('.container').addClass('animated bounceIn');
    editRoomDiv.find('button.update').attr('data-id', id);
    editRoomDiv.find('.delete').attr('data-id', id);
    editRoomDiv.find('input').val(name);

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
    var category = item.find('td.category').text();

    editItemDiv.find('input.name').val(name);
    editItemDiv.find('input.value').val(value);
    editItemDiv.find('h4').text(`Update ${name}`);
    editItemDiv.find('input.category').val(category);
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
            item.remove();
        })
        .fail(function(err) {
            console.log('err when updating a item: ', err);
        });
}

function roomDelete(e) {
    e.preventDefault();
    // console.log('Item Delete');
    var id = $(e.target).attr('data-id');
    console.log('e.target', e.target);
    // console.log('Id: ', id);

    $.ajax({
            url: '/home/room',
            method: 'DELETE',
            data: {
                id: id
            }
        })
        .done(function(data) {
            console.log('dataaaa: ', data);
            console.log('successful deleting');
            console.log('data: ', data.id);
            var room = $('.roomContainer').find(`button[data-id='${data.id}']`);
            console.log('item been deleted: ', room);
            room.addClass('animated hinge');
            setTimeout(function() {
                room.remove();
            }, 1000)

            var editRoomDiv = $('.editRoomDiv');
            editRoomDiv.fadeOut(100);
            setTimeout(function() {
                editRoomDiv.css('display', 'none');
            }, 300);
            editRoomDiv.find('input').val('');

            $('.roomContainer').find('.showall').addClass('selected btn-primary');
            check();
        })
        .fail(function(err) {
            console.log('err when updating a room: ', err);
        });
}

function editItemFormSubmit(e) {
    // e.preventDefault();
    var editItemForm = $('.editItemForm')
    var name = editItemForm.find('.name').val();
    var value = editItemForm.find('.value').val();
    var category = editItemForm.find('.category').val();
    var id = editItemForm.find('button').attr('data-id');

    console.log('Item name updated: ', name);
    console.log('Item value updated: ', value);
    console.log('Item category updated: ', category);
    $.ajax({
            url: '/home/item',
            method: 'PUT',
            data: {
                name: name,
                value: value,
                id: id,
                category: category
            }
        })
        .done(function(data) {
            console.log('successful updated');
            console.log('data: ', data);
            var item = $('.itemsTable').find(`tr.item[data-id='${id}']`);
            item.find('');
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
