115 lines (101 sloc)  2.2 KB

<template>
  <div class="card">
    <img class="card-img-top" src="" alt="user cover">
    <div class="card-body">
      <!-- Avatar -->
      <div class="avatar">
        <img :src="user.avatar | emptyImage" class="avatar" alt="user avatar">
      </div>
      <!-- username and account -->
      <div class="card-body-top">
        <p class="card-title">username</p>
        <p class="text-muted text-sm">user account</p>
      </div>
      <!-- tweets and likes count -->
      <div class="card-body-mid">
        <div class="tweets">
          <font-awesome-icon
          class="icon text-muted"
          icon="comment"
          />
          <span> 20 </span>
        </div>
        <div class="likes">
          <font-awesome-icon
          class="icon text-muted"
          icon="heart"
          />
          <span> 10 </span>
        </div>
      </div>
      <!-- following and follower -->
      <div class="card-body-bot">
        <span>10 位<span class="text-muted">追蹤中</span></span>
        <span>20 位<span class="text-muted">跟隨者</span></span>
      </div>
    </div>
  </div>
</template>
