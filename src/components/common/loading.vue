<template>
<div class="load-container">
  <div class="main">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
.load-container{
   width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
     background: rgba(0, 0, 0, 0.32);
}
.main {
  width: 100px;
  height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}
.loading {
  width: 80px;
  height: 40px;
  margin: 0 auto;
}
.loading span {
  display: inline-block;
  width: 8px;
  height: 100%;
  border-radius: 4px;
  background: lightgreen;
  -webkit-animation: load 1s ease infinite;
  animation: load 1s ease infinite;
  margin: 0px 4px;
}
@keyframes load {
  0%,
  100% {
    height: 40px;
    background: lightgreen;
    margin: 0px 4px;
  }
  50% {
    height: 70px;
    margin: -15px 4px;
    background: lightblue;
  }
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
  margin: 0px 4px;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
  margin: 0px 4px;
}
.loading span:nth-child(4) {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
  margin: 0px 4px;
}
.loading span:nth-child(5) {
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
  margin: 0px 4px;
}
</style>
