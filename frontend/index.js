var articles = [];

$(document).on("click", "button.sign-in", (e) => {
  $.ajax({
    url: "/sign-in",
    type: 'POST',
    data: {
      username: $('[name="sign-in-username"]').val(),
      password: $('[name="sign-in-password"]').val()
    },
    success: (result) => {
      console.log(result);
      saveToken(result.token);
      render();
    },
    error: (result) => {
      console.log(result);
      removeToken();
      render();
    }
  });
});

$(document).on("click", "button.sign-up", (e) => {
  $.ajax({
    url: "/sign-up",
    type: 'POST',
    data: {
      username: $('[name="sign-up-username"]').val(),
      password: $('[name="sign-up-password"]').val()
    },
    success: (result) => {
      console.log(result);
      saveToken(result.token);
      render();
    },
    error: (result) => {
      console.log(result);
      removeToken();
      render();
    }
  });
});

$(document).on("click", "button.sign-out", (e) => {
  removeToken();
  render();
});

var getArticles = (cb) => {
  $.ajax({
    url: "/api/articles",
    type: 'GET',
    headers: {
      Authorization: 'Bearer '+ getToken()
    },
    success: (result) => {
      console.log(result);
      articles = result;
      cb(null, result);
    },
    error: (result) => {
      console.log(result);
      cb(result, null);
    }
  });
};

var getToken = () => {
  return window.sessionStorage.token;
};

var saveToken = (token) => {
  window.sessionStorage.token = token;
};

var removeToken = () => {
  delete window.sessionStorage.token;
};

var isLoggedIn = () => {
  var token = getToken();
  var payload;

  if(token){
    payload = token.split('.')[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

var currentUser = () => {
  if(isLoggedIn()){
    var token = getToken();
    var payload = token.split('.')[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);
    return {
      username : payload.username
    };
  }
};

var render = () => {
  if(isLoggedIn()) {
    $(".authentication").hide();
    $(".authenticated-area").show();
    $(".authenticated-username").html(currentUser().username);
    $(".articles").html("");
    getArticles((error, resp) => {
      articles.map((article) => {
        $(".articles").append('<span>'+article.title+'</span>');
        $(".articles").append('<hr/>');
      });
    });
  } else {
    $(".authentication").show();
    $(".authenticated-area").hide();
  }  
};

render();