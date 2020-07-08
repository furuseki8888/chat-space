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
  $('.new-message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message-holder').append(html);
      $('.message-holder').animate({scrollTop: $('.message-holder')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
});