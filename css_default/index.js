let btn_menu = document.querySelector(".btn-menu");
let nav = document.querySelector("nav");
let article = document.querySelector("article");

window.onload = function(){
    article.style.opacity = '1';
}

document.addEventListener('click' , function(e){
    if(e.target.className === "btn-menu none" || e.target.className === "btn-menu none open"){
        btn_menu.classList.toggle("open");
        if(e.target.className === "btn-menu none open"){
            nav.style.cssText = "height : auto ; opacity : 1 ; top: 95%";
            btn_menu.children[1].style.opacity='0';
            btn_menu.children[0].style.cssText = "transform: rotateZ(45deg)translate(8px,8px)";
            btn_menu.children[2].style.cssText = "transform: rotateZ(-45deg)translate(8px,-8px)";
        }
        else{
            nav.style.cssText = "height : 0 ; opacity : 0 ; top : calc(100% + 10px)";
            btn_menu.children[1].style.opacity='1';
            btn_menu.children[0].style.cssText = "transform: rotateZ(0deg)translate(0px,0px)";
            btn_menu.children[2].style.cssText = "transform: rotateZ(0deg)translate(0px,0px)";
        }
    }
    else{
        if(btn_menu.className === "btn-menu none open"){
            btn_menu.classList.remove("open");
            nav.style.cssText = "height : 0 ; opacity : 0 ; calc(100% + 10px)";
            btn_menu.children[1].style.opacity='1';
            btn_menu.children[0].style.cssText = "transform: rotateZ(0)translate(0,0)";
            btn_menu.children[2].style.cssText = "transform: rotateZ(0)translate(0,0)";
        }
    }
});

let place = [];
let group_place = [];

class place_name {
    constructor(image , name , data) {
        this.image = image ; 
        this.name = name;
        this.data = data;
    }
}
let childs = document.querySelectorAll(".child");

collecting_the_children(childs);

function collecting_the_children(childs){
    childs.forEach((child) => {
    if(child.hasAttribute("data")){
        place.push(child);
        child.children[1].href = "profile.html";
        child.children[1].addEventListener('click',function(){
            window.sessionStorage.change = "false";
            let ele_selected = new place_name(child.children[0].src , child.children[1].children[0].innerHTML , child.getAttribute("data"));
            window.sessionStorage.current = JSON.stringify(ele_selected);
            if(this.hasAttribute("change")){
                console.log("hello")
                window.sessionStorage.change = "true";
            }
        })
    }else{
        group_place.push(child);
        child.children[1].href = "profile_1.html";
        child.addEventListener('click' , function(){
            window.sessionStorage.change = "true";
            let place_select = new place_name(child.children[0].src , child.children[1].children[0].innerHTML , child.getAttribute("catogery"));
            window.sessionStorage.place_current = JSON.stringify(place_select);
            create_element(this);
        })
    }
});
}


/* ====================>>> display element in profile <<<====================== */
if(window.sessionStorage.current)display_element(JSON.parse(window.sessionStorage.current));
function display_element(ele){
    let image_tage = document.querySelector(".image_details img");
    let h2_tage = document.querySelector(".text_content h2");
    let links = document.querySelectorAll(".links_of_child li");
    let view_h1 = document.querySelector(".this h1");

    links.forEach(link => link.children[1].children[0].innerHTML = ele.data);

    if(image_tage) image_tage.src    = ele.image;
    if(h2_tage)    h2_tage.innerHTML = ele.name;
    if(view_h1)    view_h1.innerHTML = ele.name;
    console.log(ele)
}

/* ====================>>> display gard in profile_1 <<<======================= */
import {content_clothes ,content_devices,content_smokking,content_bags,content_games,content_sports,content_special,content_chopping,content_choppingOut,content_animal,content_house,content_food ,content_tools,content_indu,content_baby, content_gard , content_garden ,content_electronic , content_art ,content_cars} from "./content.js";
function create_element(ele){
    if(ele.getAttribute("catogery") === "hotel"){
        window.sessionStorage.catogery = JSON.stringify(content_devices);
    }else if(ele.getAttribute("catogery") === "closes"){
        window.sessionStorage.catogery = JSON.stringify(content_clothes);
    }else if(ele.getAttribute("catogery") === "gard"){
        window.sessionStorage.catogery = JSON.stringify(content_gard);
    }else if(ele.getAttribute("catogery") === "home"){
        window.sessionStorage.catogery = JSON.stringify(content_garden);
    }
    else{
        window.sessionStorage.catogery = "";
    }
}

if(window.sessionStorage.catogery)display_element_created(JSON.parse(window.sessionStorage.catogery))

function display_element_created(component){
    let father = document.querySelector(".container_profile .top");
    let gro = document.querySelector(".gro");
    let current = JSON.parse(window.sessionStorage.place_current);

    if(gro){
        gro.children[0].innerHTML = current.name;
        gro.children[1].children[0].innerHTML = component.length;
    }

    for (const element of component) {
            if(father)father.innerHTML += `
                <div class="child" data="${element.link}">
                    <img src="${element.image}" alt="" >
                    <a href="profile.html" class="text" change = "true">
                        ${element.name}
                    </a>
                </div>
            `
        }
    console.log(current);
    childs = document.querySelectorAll(".child");
    collecting_the_children(childs);
    if(window.sessionStorage.change === "true"){
        section_image();
    }
}

function section_image(){
    let image_tage = document.querySelector(".section .image");
    let current = JSON.parse(window.sessionStorage.place_current);
    if(image_tage) image_tage.style.cssText = `background-image : url(${current.image})`
}