<template>
  <div class="list-group-item">
    <div class="card">
      <div class="card-avartar">
        <!-- avatar -->
          <img src="" alt="">
      </div>
      <div class="card-content">
        <!-- tweetCard header -->
        <div class="card-content-header">
          <span class="user-name">Username</span>
          <span class="text-muted">@Useraccount</span>
          <span class="text-muted">time</span>
          <button
          type="button"
          class="close"
          >
            <span>&times;</span>
          </button>
        </div>
        <!-- tweet description -->
        <div class="card-content-body">
          <a v-if="true">
            <p>tweet.description</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
