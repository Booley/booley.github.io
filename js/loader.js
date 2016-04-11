
var myFirebaseRef = new Firebase("https://sizzling-torch-6800.firebaseio.com/");
var carousel_index = 0
var record = []
var start = false
var obj

$(document).ready(function() {

$("#begin").click(function() {
    if(!start) {
        start = true

        while(true) {
            var n = prompt("How many images would you like? Minimum 10, maximum 100.")
            if(n < 10 || n > 100)
                continue
            else {
                obj = getImages(n)
                addListElements(obj)
                break
            }
        }
        moveCarousel()
    }
})

$(document).keypress(function(e){
    console.log("pressed?")
    if(!start) {
        console.log("no cheating?")
        return
    }

	var next = false
	var label = ""

    if(e.which == 115) {
    	label = 0
    	next = true
    }
    else if(e.which == 103) {
    	label = 1
    	next = true
    }

    if(next) {
    	record.push(label)
    	moveCarousel()
    }
});

function calculateScore(a1, a2) {
    var numMatch = 0
    for(var i = 0; i < a1.length; i++) {
        if(a1[i] == a2[i])
            numMatch++
    }
    return numMatch
}

function moveCarousel() {
    if((record.length == obj.length) && start) {
        start = false
        score = calculateScore(record, obj.labels)
        $("#score").text(score + " / " + obj.length)
        myFirebaseRef.push({"record": record, "obj": obj, "score": score / obj.length })
    }

    $('#carousel-241413').carousel(++carousel_index);
    $("#index").text(carousel_index-1)
}

function randInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function getImages(n) {
	var labels = []
	var paths = []
	var straight_ptr = 0
	var gay_ptr = 0

    var num_gay = 123
    var num_straight = 142
    var num_gaymer = 89

	for(var i = 0; i < n; i++) {
		var curr_label = Math.round(Math.random())
		labels.push(curr_label)

		if(curr_label == 1) {
            // need to choose between gay and gaymer
            if(Math.round(Math.random()) == 1) {

    			paths.push("imgs/gay_faces/img" + randInt(0, num_gay) + ".png")
            }
            else {
                paths.push("imgs/gaymer_faces/img" + randInt(0, num_gaymer) + ".png")
            }
            gay_ptr++
		}
		else if(curr_label == 0) {
			paths.push("imgs/straight_faces/img" + randInt(0, num_straight) + ".png")
			straight_ptr++
		}
	}

	var obj = {"labels": labels, "imgs": paths, "length": n}
	return obj
}

function addListElements(obj) {
	for(var counter = 1; counter <= obj.length; counter++) {
		$("ol").append("<li data-slide-to='" + counter + "' data-target='#carousel-241413'></li>");

		$(".carousel-inner").append(`
			<div class="item">
				<img src= ${obj.imgs[counter-1]}>
			</div>`
		)
	}
}	

// obj = getImages(20)
// addListElements(obj)
})


