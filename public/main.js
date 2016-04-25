"use strict";

$(document).ready(init);

function init() {
    startingAnimation();
    $('.scoreInputForm').submit(scoreInputFormSubmitted);
    $('.scoreContainer').on('click', '.delete', deleteOne);
    $('.scoreContainer').on('click', '.edit', editOne);
    $('.editterForm').submit(editterFormSubmit);
    checkGrade();
}

function checkGrade() {
    console.log("checkGrade Start");
    var gradeArr = $('.grade');
    // console.log(typeof gradeArr);

    console.log('gradeArr.length): ', gradeArr.length);
    for (var i = 1; i < gradeArr.length; i++) {
        console.log(gradeArr[i]);
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
    console.log("checkSummary Start");
    var scoreArr = $('.scoresTable .score');
    var totalrr = $('.scoresTable .total');
    var scoreSummaryArr = [];
    var totalSummaryArr = [];
    for (var i = 1; i < scoreArr.length; i++) {
        scoreSummaryArr.push(Number(scoreArr[i].innerHTML));
    }
    for (var i = 1; i < totalrr.length; i++) {
        totalSummaryArr.push(Number(totalrr[i].innerHTML));
    }
    // console.log('scoreSummaryArr: ', scoreSummaryArr);
    var summary = $('.summary');
    var scoreSummary = scoreSummaryArr.reduce((a, b) => a + b);
    var totalSummary = totalSummaryArr.reduce((a, b) => a + b);
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
    var id = guid();
    // console.log('id: ', id);
    // console.log('time: ', timeStamp);
    e.preventDefault();
    // console.log('submitted');
    var name = $('.name').val();
    var score = $('.score').val();
    var total = $('.total').val();

    $.ajax({
            url: '/sheet/score/',
            method: 'POST',
            data: {
                name: name,
                score: score,
                total: total,
                id: id
            }
        })
        .done(function(data) {
            // console.log('data: ', data);
            // console.log('ddd');
            var name = data.name;
            var score = data.score;
            var total = data.total;
            var id = data.id;

            // var time = moment().format('LLL');
            // var newScore = $('tr.template.newScore').clone().addClass('animated bounceInwe');
            var newScore = $('tr.template.newScore').clone().addClass('animated flipInX');
            // console.log('newScore: ', newScore);
            newScore.removeClass('template');
            newScore.find('.name').text(name);
            newScore.find('.score').text(score);
            newScore.find('.total').text(total);
            newScore.find('.grade').attr('data-id', id);
            newScore.attr('data-id', id);
            newScore.find('.delete').attr('data-id', id);
            newScore.find('.edit').attr('data-id', id);

            var score = newScore.find('.score').text();
            var total = newScore.find('.total').text();
            var grade = Number(score) / Number(total);
            // console.log('grade OF the new score: ', grade);
            if (grade > 0.9) {
                newScore.find('.grade').text('A');
            } else if (grade > 0.8 & grade < 0.9) {
                newScore.find('.grade').text('B');
                Å
            } else if (grade > 0.7 & grade < 0.8) {
                newScore.find('.grade').text('C');
            } else if (grade > 0.6 & grade < 0.7) {
                newScore.find('.grade').text('D');
            } else {
                newScore.find('.grade').text('F');
            };

            $('tbody.scoresTable').prepend(newScore);
            // checkGrade();

            $('form.scoreInputForm input').val('');
            checkGrade();

        })
        .fail(function(err) {
            // console.log('err when adding: ', err);
        });

}

function deleteOne(e) {
    var id = $(e.target).attr('data-id');
    // console.log('id delete clicked: ', id);

    $.ajax({
            url: '/sheet/score/',
            method: 'DELETE',
            data: {
                id: id,
            }
        })
        .done(function(data) {
            console.log('id has been deleted for sure: ', data.id);
            $(`.scoreContainer tr[data-id='${data.id}']`).addClass('animated flipOutX');
            setTimeout(function() {
                $(`.scoreContainer tr[data-id='${data.id}']`).remove();
                checkGrade();
            }, 1000);

        })
        .fail(function(err) {
            console.log('err when deleting: ', err);
        });

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

function editterFormSubmit() {
    var editter = $('.editterDiv');
    var name = editter.find('.name').val();
    var score = editter.find('.score').val();
    var total = editter.find('.total').val();
    var id = editter.find('button').attr('data-id');
    // console.log('name: ', name, 'score: ', score, 'total: ', total, 'id: ', id);
    var timeStamp = moment().format('LLL');

    $.ajax({
            url: '/sheet/score/',
            method: 'PUT',
            data: {
                name: name,
                score: score,
                total: total,
                id: id
            }
        })
        .done(function(data) {
            editter.fadeOut(100).css('display', 'none');
            editter.find('.container').removeClass('animated bounceIn');
            editter.find('button').attr('data-id', '');
            checkGrade();
        })
        .fail(function(err) {
            console.log('err: ', err);
        });
}

function startingAnimation() {
    var intro = $('.intro')
    setTimeout(function() {
        $('.jumbotron').css('display', 'block').addClass('animated fadeIn');
        $('.intro').css('display', 'block').addClass('animated bounceIn');
    }, 100)



}
