$(function(){
  let search_list = $('#UserSearchResult');
  function appendUser(user) {
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    search_list.append(html);
  }
  function appendErrMsgToHTML() {
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>`;
    search_list.append(html);
  }
  $('#UserSearch__field').on("keyup", function(){
    let input = $('#UserSearch__field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      search_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendErrMsgToHTML();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });
});