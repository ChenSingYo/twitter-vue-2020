<template>
  <div class="setting">
    <Header title="帳戶設定" />
    <div class="setting-container">
      <form>
        <div class="input-wrapper">
          <label class="text">帳號</label>
          <input type="text" />
        </div>
        <div class="input-wrapper">
          <label class="text">名稱</label>
          <input type="text" />
        </div>
        <div class="input-wrapper">
          <label class="text">Email</label>
          <input type="text" />
        </div>
        <div class="input-wrapper">
          <label class="text">密碼</label>
          <input type="text" />
        </div>
        <div class="input-wrapper">
          <label class="text">密碼確認</label>
          <input type="text" />
        </div>
        <div class="btn-wrapper">
          <button class="btn">儲存</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: 'UserSettingForm',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.setting {
  flex-grow: 1;
}

.setting-container {
  margin-left: 16px;
  width: 642px;
}

.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  border-bottom: 2px solid var(--cement-gary-clr);
  border-radius: 0px 0px 4px 4px;
  border-radius: 4px;
  background-color: var(--water-gary-clr);

  label {
    margin-bottom: 0;
    padding: 5px 15px;
    color: var(--cement-gary-clr);
    font-weight: 500;
    font-size: 0.937rem;
  }

  input {
    padding: 0 15px;
    height: 24px;
    border: 0;
    background-color: transparent;
    color: var(--black-clr);
    font-weight: 500;
    font-size: 19;
    &:focus {
      outline: 0;
    }
  }
}

.btn-wrapper {
  margin-top: 30px;
  text-align: right;

  button {
    padding: 0;
    width: 122px;
    height: 50px;
    border-radius: 25px;
    background-color: var(--primary-clr);
    color: #fff;
    line-height: 0;
  }
}

.btn:focus {
  box-shadow: none;
}
</style>
