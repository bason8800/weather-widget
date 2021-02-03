<template>
  <div class="base-loader">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseLoader',
};
</script>

<style lang="scss">
.base-loader {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 40px;
  text-align: center;

  > div {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #333;
    border-radius: 100%;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% { -webkit-transform: scale(0); }
  40% { -webkit-transform: scale(1); }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
