<template>
  <div class="recommend">
    <div class="recommend-container">
      <div class="recommend-card">
        <header class="title">
          跟隨誰
        </header>
        <ul>
          <li class="card-container">
            <img class="avatar" src="https://picsum.photos/50" />
            <div class="user-info-container">
              <div class="user-name">Name</div>
              <div class="user-tag">@Tag</div>
            </div>
            <div class="follow-btn-container">
              <button class="btn follow-btn">跟隨</button>
            </div>
          </li>
        </ul>
        <footer class="more-footer">
          <button class="btn more-btn">顯示更多</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendSideBar'
}
</script>

<style lang="scss" scoped>
@mixin font-style {
  font-weight: 700;
  font-size: 15px;
}

$border-style: 1px solid var(--light-gary-clr);

.recommend {
  border-left: $border-style;
}
.recommend-container {
  width: 462px;

  .recommend-card {
    margin-top: 15px;
    margin-left: 30px;
    width: 350px;
    border-radius: 14px;
    background-color: var(--water-gary-clr);

    .title {
      padding: 10px 15px 8px;
      border-bottom: $border-style;
      font-weight: 700;
      font-size: 1.125rem;
    }

    .card-container {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: lightgray;
      }

      .user-info-container {
        flex-grow: 1;
        margin: 0 10px;

        .user-name {
          @include font-style;
        }

        .user-tag {
          color: var(--cement-gary-clr);

          @include font-style;
        }
      }

      .follow-btn-container {
        display: flex;
        align-items: center;
        .follow-btn {
          padding: 0;
          padding: 8px 16px;
          height: 30px;
          border: 1px solid var(--primary-clr);
          border-radius: 15px;
          color: var(--primary-clr);
          font-weight: bold;
          font-size: 15px;
          line-height: 0px;
        }
      }
    }

    .more-footer {
      padding: 10px 15px 8px;
      border-top: $border-style;

      .more-btn {
        padding: 0;
        color: var(--primary-clr);
      }
    }
  }
}
</style>
