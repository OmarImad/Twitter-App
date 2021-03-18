if (localStorage.getItem('username')) {
    document.querySelector('#login_form').classList.remove('d-flex');
    document.querySelector('#login_form').classList.add('d-none');
}
let tweets = [];
if (localStorage.getItem('tweets')) {
    tweets = JSON.parse(localStorage.getItem('tweets'));
}
setInterval(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}, 3000);

tweets.concat().forEach(tweet => {
    post_tweet_feed(tweet);
})

function post_tweet() {
    const tweet = {
        username: localStorage.getItem('username'),
        tweet: document.querySelector('#tweet').value.trim(),
        rt: 0,
        like: 0,
        comments: ['sample comment'],
        id: tweets.length,
        liked: false,
    };


    if (tweet.username.length > 0 && tweet.tweet.length > 0) {
        let div = document.createElement("div");
        div.innerHTML = tweet_body(tweet);
        document.querySelector('#news_feed').prepend(div);
        document.querySelector('#tweet').classList.remove('border-danger');
        tweets.push(tweet);
        document.querySelector('#tweet').value = '';

    } else {
        if (tweet.tweet.length < 1) {
            document.querySelector('#tweet').classList.add('border-danger');
        } else {
            document.querySelector('#tweet').classList.remove('border-danger');
        }

    }

}


function re_tweet(id) {
    const tweet = {
        username: tweets[id].username,
        tweet: tweets[id].tweet,
        rt: tweets[id].rt,
        like: tweets[id].like,
        comments: tweets[id].comments,
        id: tweets.length
    };


    if (tweet.username.length > 0 && tweet.tweet.length > 0) {
        let div = document.createElement("div");
        div.innerHTML = tweet_body(tweet);
        document.querySelector('#news_feed').prepend(div);
        document.querySelector('#tweet').classList.remove('border-danger');
        tweets.push(tweet);
        document.querySelector('#tweet').value = '';

    } else {
        if (tweet.tweet.length < 1) {
            document.querySelector('#tweet').classList.add('border-danger');
        } else {
            document.querySelector('#tweet').classList.remove('border-danger');
        }

    }

}


function post_tweet_feed(tweet) {
    if (tweet.username.length > 0 && tweet.tweet.length > 0) {
        let div = document.createElement("div");
        div.innerHTML = tweet_body(tweet);
        document.querySelector('#news_feed').prepend(div);
        document.querySelector('#tweet').classList.remove('border-danger');

    } else {
        if (tweet.tweet.length < 1) {
            document.querySelector('#tweet').classList.add('border-danger');
        } else {
            document.querySelector('#tweet').classList.remove('border-danger');
        }

    }

}

function tweet_body(tweet) {
    return `
      <div class="w-100 shadow p-3 mb-2 tweet_ani overflow-hidden">
            <p class="text-break w-100 px-3 text-capitalize">@${tweet.username}</p>
             <hr class="w-100 border">
            <p class="w-100 text-break">${tweet.tweet}</p>
              <hr class="w-100 border">
            <div class="w-100 d-flex justify-content-around">
                <button id="${tweet.id}" onclick="like_tweet(this.id,this)"
                 class="btn btn-link">${tweet.like} like</button>
                <button  onclick="re_tweet(${tweet.id})" class="btn btn-link">RT</button>
                <button id="cmt_cont_${tweet.id}" class="btn btn-link" onclick="show_comments(${tweet.id})">${tweet.comments.length} Comment</button>
            </div>
                <div id="id_${tweet.id}" class="d-none">
                <hr class="w-100 border">
                    <div class="w-100 d-flex justify-content-between align-items-center">
                          <input id="cmt_txt_${tweet.id}" type="text" placeholder="Comment . . ." class="form-control border w-75 my-2">
                          <button onclick="comment_tweet(${tweet.id})" class="btn-sm btn-primary form-control w-20">Send</button>
                    </div>
                            <hr class="w-100 border">
                       <div id="cmt_bx_${tweet.id}" class="w-100">
                       </div>
                </div>
        </div>`
}

/***
 *
 * @param tweet_id
 * @param ele
 */
function like_tweet(tweet_id, ele) {

    if (!tweets[tweet_id].liked) {
        tweets[tweet_id].like += 1;
        tweets[tweet_id].liked = true;
        ele.classList.add('text-success');
        ele.classList.remove('text-dark');
    } else {
        tweets[tweet_id].like -= 1;
        tweets[tweet_id].liked = false;
        ele.classList.add('text-dark');
        ele.classList.remove('text-success');
    }

    ele.innerHTML = `${tweets[tweet_id].like} like`;
    ele.classList.add('text-success');

}

/***
 *
 * @param tweet_id
 */
function comment_tweet(tweet_id) {
    let cmt = document.querySelector(`#cmt_txt_${tweets[tweet_id].id}`).value;
    tweets[tweet_id].comments.push(cmt);
    document.querySelector(`#cmt_bx_${tweet_id}`).innerHTML += `
            <p class="w-100 text-break p-2 bg-primary text-light"> ${cmt}</p>
            `;

}


/***
 *
 * @param id
 */
function show_comments(id) {
    let cmt_bx = document.querySelector(`#cmt_bx_${id}`);
    if (document.querySelector(`#id_${id}`).classList.contains('d-none')) {
        document.querySelector(`#id_${id}`).classList.remove('d-none');
        document.querySelector(`#id_${id}`).classList.add('d-block');
        // show comments
        tweets[id].comments.concat().reverse().forEach(cmt => {
            cmt_bx.innerHTML += `
            <p class="w-100 text-break p-2 bg-primary text-light"> ${cmt}</p>
            `;
        })

    } else {
        cmt_bx.innerHTML = '';
        document.querySelector(`#id_${id}`).classList.remove('d-block');
        document.querySelector(`#id_${id}`).classList.add('d-none');
    }

}

function set_username() {
    localStorage.setItem('username', document.querySelector('#username').value);
    let username = localStorage.getItem('username');
    if (username.trim().length < 1) {
        document.querySelector('#username').classList.add('border-danger');
    } else {
        document.querySelector('#login_form').classList.remove('d-flex');
        document.querySelector('#login_form').classList.add('d-none');
    }

}

let max_length = 150;
let letter_count = max_length;
function letters_count(ele, ele_count) {
    let length = ele.value.length;
    let value = ele.value;
    value = value.replace(/\s+/gmi, ' ');
    if (length <= max_length) {
        letter_count = max_length - length;
        document.querySelector('#' + ele_count).innerHTML = `Tweet (${letter_count})`;
    } else {
        value = value.slice(0, max_length)
    }
    ele.value = value;

}