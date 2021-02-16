initGame();

function initGame() {
    loginPopup();

}

function loginPopup(){
    var lvl_buttons = document.body.getElementsByClassName('btn_lvl');
    var type_buttons = document.body.getElementsByClassName('btn_type');
    let user_name_box = document.body.querySelectorAll('input.login_box')[0];
    let play_btn = document.body.querySelectorAll('.play_btn')[0];
    let popup_login = document.body.getElementsByClassName('popup_login')[0];
    Object(play_btn).addEventListener('click', () => {
        let cookies = actual_Cookies();
        if (cookies['difficulty'].length > 0 && user_name_box.value.length > 0 && cookies['type'].length > 0){
            document.cookie = `user_name=${user_name_box.value}`;
            set_user_name()
            setTimeout(() => Object(popup_login).hidden = true, 1000);
        }
        else{
            alert('Please input/select all parameters');
        };
    });
    set_onClick_login_buttons(lvl_buttons, 'difficulty');
    set_onClick_login_buttons(type_buttons, 'type');
}


function set_onClick_login_buttons(buttons, cookie_name){
    for (let button of buttons) {
        Object(button).addEventListener('click', () => {
            if (button.style.backgroundColor != 'blue'){
                for (let old_button of buttons){
                    if (old_button != buttons){
                        old_button.style.backgroundColor = 'white';
                        old_button.style.color = 'black';
                    }
                }
                button.style.backgroundColor = 'blue';
                button.style.color = 'white';
                document.cookie = `${cookie_name}=${Object(button).childNodes[1].innerHTML}`;
            }
            else{
                button.style.backgroundColor = 'white';
                button.style.color = 'black';
            }
        });
    }
}


function actual_Cookies(){
    let cookies = {

    }
    for (let cookie of document.cookie.split('; ')){
        cookies[cookie.split('=')[0]] = cookie.split('=')[1];
    }
    return cookies;

}
function set_user_name(){
    user_name_node = document.querySelector('.get_username');
    user_name_node.innerHTML = actual_Cookies()['user_name'];
}

function get_user_name(){
    return  actual_Cookies()['user_name'];
}