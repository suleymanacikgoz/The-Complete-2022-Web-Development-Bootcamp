var randomNumber1=Math.random()
randomNumber1=randomNumber1*6
randomNumber1=Math.floor(randomNumber1)+1


var randomDiceImage = "dice" + randomNumber1 +".png"

var imageSource = "images/" + randomDiceImage

var image1 = document.querySelectorAll("img")[0]

image1.setAttribute("src", imageSource)


var randomNumber2=Math.random()
randomNumber2=randomNumber2*6
randomNumber2=Math.floor(randomNumber2)+1

var randomDiceImage2 = "dice" + randomNumber2 +".png"

var imageSource2 = "images/" + randomDiceImage2

var image2 = document.querySelectorAll("img")[1]

image2.setAttribute("src", imageSource2)


if(randomNumber1>randomNumber2){
document.querySelector("h1").innerHTML="Player1 Won"
}
if (randomNumber1<randomNumber2) {
    document.querySelector("h1").innerHTML="Player2 Won"
}
if(randomNumber1===randomNumber2){
    document.querySelector("h1").innerHTML="Draw"
}