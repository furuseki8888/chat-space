$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
        `<div class="message-items" data-message-id=${message.id}>
          <div class="Message-info">
            <div class="Message-info__user-name">
              ${message.user_name}
            </div>
            <div class="Message-info__date-time">
              ${message.created_at}
            </div>
          </div>
          <div class="message-comment">
            <p class="message-content">
              ${message.content}
            </p>
            <img class="message-image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = 
        `<div class="message-items" data-message-id=${message.id}>
          <div class="Message-info">
            <div class="Message-info__user-name">
              ${message.user_name}
            </div>
            <div class="Message-info__date-time">
              ${message.created_at}
            </div>
          </div>
          <div class="message-comment">
            <p class="message-content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  let reloadMessages = function() {
    let last_message_id = $('.message-items:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-holder').append(insertHTML);
        $('.message-holder').animate({ scrollTop: $('.message-holder')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});