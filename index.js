// print in console when the webpage loads
document.addEventListener("DOMContentLoaded", function(){
    console.log("Hello, visitor!")
});

// change color theme
function change_color(){
    let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = randomColor

    console.log('change color to ' + randomColor + ', magic wand!')
}